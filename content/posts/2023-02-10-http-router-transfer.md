---
title: "HTTP协议路由转发小结"
date: 2022-11-20T09:03:20-08:00
draft: true
description: "工作中经常会遇到cpu的各种问题。。。"
---

## hosts指向里约网关IP，但最终访问到应用了

问题介绍：个人电脑 hosts 文件配置如下：

> xx.xx.xx.243 xxx.domain.com

其中 xx.xx.xx.243 是里约网关的服务器ip，而应用部署在 xx.xx.xx.93 上，但最终请求为何会转发到93这台服务器上呢？

原因是里约网关配置了转发规则，当网关接收到的请求host是 xxx.domain.com 时，就将请求转发到 93 这台服务器上。这种就是典型的HTTP(7层)转发规则，对应的有TCP(4层)转发，感兴趣的可以了解对比下。那网关是如何转发请求的呢？

## 先从HTTP协议说起

就以我们政务开放平台系统为例说明，上述条件依旧成立即：里约部署在243服务器上，开放平台部署在93上，我本地开发机配置hosts:
> xx.xx.xx.243 xxx.domain.com

浏览器访问  http://xxx1.domain.com/api/corp/personal/user_info，我们先用Wireshark抓包看下http请求(注意抓包时，选择wifi网卡，设置条件 http && ip.addr == xx.xx.xx.243过滤）。下面是我的抓包内容。

``` 
GET /api/corp/personal/user_info HTTP/1.1 #请求方法 PATH路径 http版本号
Host: xxx.domain.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate
Accept-Language: en,zh-CN;q=0.9,zh;q=0.8,zh-TW;q=0.7,und;q=0.6

HTTP/1.1 200 OK # 版本号 返回状态码 对应信息
x-proxy-by: Tif-accessgate
Date: Fri, 04 Dec 2020 11:56:17 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 357
Connection: keep-alive
Reqid: UMMIoNR7NfTQfCBeqY9E
x-forwarded-for: 9.134.243.93,127.0.0.1
set-cookie: x_host_key=xxxxx-0a17a7b28b3787e551b18xxxa4f96a3fa47ca6ae72e; path=/; domain=.woa.com; HttpOnly

{"code":0,"message":"success","data":{"user_id":1,"account":"admin","name":"admin","phone":"","email":"admin@kfpt.com","corp_name":"............","uuid":"1d985beb-b975-4abe-923e-8cac2c53a3a2","groups":[{"corp_type":4,"rio_group_name":"...............","rio_group_code":"admin_admin","rio_group_id":"40ced61f-2b59-4f5a-8c08-de8140838a38","description":""}]}}
```
可以看到http 协议请求的组成：首部、请求头、请求体，响应的组成：首部、响应头、响应体。
>第1行：方法、请求路径、协议版本   
第2～9行：请求头
如果是Post 请求后面还会有请求体。
第11行：版本号 返回状态码 对应状态码说明
第12～19行：响应头
第21行: 响应体。

HTTP的协议和网关的转发到底有什么关系呢？前面我们提到里约支持HTTP 7层转发和4层转发，这里的7和4都是指OSI参考模型，如下图：![enter image description here](/img/image-1607080640998.png)
7层表示最上层应用层，4表示传输出层，如果是7层的话一般就是指应用层协议转发，最常用的就是HTTP协议转发啦，应用层转规则可以更丰富，可以用的条件很多。例如上面的http包格式，可以根据应用层的首部路径，请求头内容、请求体内容、还有请求的来源ip&端口，目的ip、端口等众多条件进行转发。那最开始的host问题就是这么来的，浏览器请求 http://xxx.domain.com/api/corp/personal/user_info 时，有如下步骤：
1. 先查询域名对应的IP地址，正常来说是请求DNS服务器返回域名对应的ip地址，但是我们配置了域名hosts对应的ip，会查到网关的ip地址；
2. 建立远程ip的连接，即与网关建立连接，http协议是建立在tcp协议之上的；
3. 发送http包数据，发送的数据格式就是前面的抓包内容。

网关这边收数据之后知道是HTTP协议 ，命中到了里约网关的RouteRule规则（专门处理HTTP协议），由于我们之前在网关配置了一条类似这样的规则：
```
[
  {
    "appName":"openplatform-web",
    "path":"^/api", # 匹配首部path，即：/api/corp/personal/user_info
    "targetPath":"/", # path替换的目标path后：/corp/personal/user_info
    "host":"^xxx.domain.com$", # 匹配请求头：Host: xxx.domain.com
    "targetHost": "9.134.243.93:15000" # 目标ip和端口
  }
]
```
上面的规则会命中我们抓包的请求，然后将请求转发到开发平台的ip 和 nginx 监听的端口上,nginx 的配置如下：
```
upstream backendcrop {
        server xx.xx.xx.xx.93:15240;
    } 
server {
    listen       15000 default_server;
    listen       [::]:15000 default_server;
    server_name  xxx.domain.com;
    root         /usr/share/nginx/html;

    location / {
        return 404;
    }
    location /crop { ##命中目录/corp/personal/user_info，负载到backendcrop
        proxy_pass http://backendcrop;
    }
    ... 省略
```
上面命中了 nginx location规则 /crop 后负载到backendcrop，转发到最终的服务IP和端口，到此我相信差不多说清楚 hosts 域名配置到网关和最终服务的网络链路了。还有一个问题是 nginx 配置的server_name  xxx.domain.com; 是干嘛用的？这个可以其实就类似我们前面说得匹配请求头host 的能力。
```
server {
    listen      80;
    server_name example.org www.example.org;
    ...
}

server {
    listen      80;
    server_name example.net www.example.net;
    ...
}

server {
    listen      80;
    server_name example.com www.example.com;
    ...
}
```
如果我们nginx配置了3个server，那么就会根据server_name 配置的域名来匹配host来命中server， 那为什么我们开放平台 server_name 去掉也可以命中呢？ 是因为我们有这么配置：
> listen       [::]:15000 default_server;
上面就是说如果没有server_name命中，就默认命中该server。

最后在说一下我上面抓的HTTP包里面没有目标IP+端口，源IP+端口，那是客户端是怎么找到服务器ip端口建立连接的呢？那是因为上面的包是在建立连接之后的HTTP协议包，我给一下我抓到TCP包，红框的部分就是网络其他层协议的数据，TCP协议是有源ip目的ip源端口目的端口的。感兴趣的可以自己抓包看下。
![enter image description here](/img/image-1607084776819.png)
## 总结
到此我相信大家对开放平台的转发规则不会有大多疑问了，如果有欢迎和我交流讨论。下面我盗了一张经典的网络层图。
![enter image description here](/img/image-1607080895179.png)