//Ajax对象Start
var RD;
function AjaxObject() {
    var Self = this;
    var msgObjId = null;
    this.httpRequest = null;
    this.url = null;
    this.paraString = null;
    this.contentType = 'application/x-www-form-urlencoded';
    this.async = true;
    this.xmlDoc = null;
    this.responseText = '';
    this.method = 'get';
    this.form = null;
    this.defaultButton = null;
    this.timer = null;
	this.curObject = null
    this.precssRequest = new Function();
    this.requestSucceed = function() {
        if (Self.httpRequest.readyState == 4) {
            if (Self.httpRequest.status == 200) {
                Self.xmlDoc = Self.httpRequest.responseXML
                Self.responseText = Self.httpRequest.responseText
                Self.precssRequest()
            }
            else {
				Self.closeAjaxMessage();
                alert("异常错误:" + Self.httpRequest.status)
            }
        }
    }
    this.sendRequest = function() {
        var args = this.sendRequest.arguments
        if (args.length > 0) {
            this.url = args[0]
        }
        if (!this.url) {
            alert("请设置对象url属性")
            return false;
        }
        //创建XMLHttp对象
        if (window.XMLHttpRequest) {  //其它浏览器
            this.httpRequest = new XMLHttpRequest();
            if (this.httpRequest.overrideMimeType) {
				//请在服务器文档中写好xml头，这里注释掉了为接收Josn数据时不报错
                //this.httpRequest.overrideMimeType("text/xml")
            }
        }
        else if (window.ActiveXObject) {  //IE
            try {
                this.httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (c) {
                try {
                    this.httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (c) { }
            }
        }
        if (!this.httpRequest) {
            alert("不能创建XmxHttpRequest对象");
            return false;
        }

        //发送请求
        if (Self.async) {
            //异步
            this.httpRequest.onreadystatechange = this.requestSucceed;
            this.httpRequest.open(Self.method, this.url, this.async);
            if (Self.contentType != '') {
                this.httpRequest.setRequestHeader('Content-type', Self.contentType)
            }
            this.httpRequest.send(Self.paraString);
        }
        else {
            //同步
            this.httpRequest.open(Self.method, this.url, this.async);
            if (Self.contentType != '') {
                this.httpRequest.setRequestHeader('Content-type', Self.contentType)
            }
            this.httpRequest.send(Self.paraString);
            this.requestSucceed();
        }
        return true;
    }
    this.closeAjaxMessage = function(msgobjid) {
        var msgobj = null
        if (msgobjid != null) {
            msgobj = document.getElementById(msgobjid);
        }
        if (!msgobj) {
            msgobj = document.getElementById("_ajaxMessage")
        }
        if (msgobj) {
            msgobj.innerHTML = ""
            msgobj.style.visibility = "hidden";
            msgobj.style.display = "none";
        }
    }
    this.showAjaxMessage = function(msg, msgobjid, showtime) {
        var msgobj = null;
        var msgtxtobj = null;
        var msgcloseobj = null;
        var scrollTop = 0, scrollLeft = 0;
        if (msgobjid != null) {
            msgobj = document.getElementById(msgobjid);
            msgtxtobj = document.getElementById(msgobjid + "_Txt");
            msgcloseobj = document.getElementById(msgobjid + "_Close")
        }
        if (!msgobj) {
            msgobj = document.getElementById("_ajaxMessage")
            if (msgobj) {
                document.body.removeChild(msgobj);
            }
            msgobj = document.createElement("DIV");
            msgobj.id = "_ajaxMessage";
            msgobj.style.position = "absolute";
            msgobj.style.border = "#CCC solid 5px";
            msgobj.style.backgroundColor = "#fff"
            msgobj.style.padding = "20px"
            msgobj.style.cursor = "pointer";
            document.body.appendChild(msgobj);
            msgtxtobj = document.createElement("SPAN");
            msgtxtobj.id = "_ajaxMessage_Txt";
            msgobj.appendChild(msgtxtobj);
        }
        msgobj.style.display = "none";
        msgobj.style.visibility = "hidden";
        msgObjId = msgobj.id;
        if (msgtxtobj) {
            msgtxtobj.innerHTML = msg;
        }
        else {
            msgobj.innerHTML = msg;
        }
        msgobj.style.display = "block";
        scrollTop = document.body.scrollTop;
        scrollTop = scrollTop != 0 ? scrollTop : document.documentElement.scrollTop;
        scrollLeft = document.body.scrollLeft;
        scrollLeft = scrollLeft != 0 ? scrollLeft : document.documentElement.scrollLeft;
        msgobj.style.left = ((document.documentElement.clientWidth - msgobj.offsetWidth) / 2 + scrollLeft) + "px"
        msgobj.style.top = ((document.documentElement.clientHeight - msgobj.offsetHeight) / 2 + scrollTop) + "px"
        msgobj.style.visibility = "visible";
        if (msgcloseobj) {
            msgcloseobj.onclick = function() { Self.closeAjaxMessage(msgobj.id) }
        }
        else {
            msgobj.onclick = function() { Self.closeAjaxMessage(this.id) }
        }
        if (!isNaN(showtime)) {
            clearTimeout(Self.timer);
            Self.timer = setTimeout(this.closeAjaxMessage, showtime);
        }
    }
    this.submitAjaxForm = function() {
        var spchar = "";
        var i;
        var obj;
        if (Self.form && Self.form.action != null && Self.form.action != "") {
            Self.showAjaxMessage('正在处理,请稍候...');
            if (Self.url == null) {
                Self.url = Self.form.action;
            }
            Self.paraString = "";
            for (i = 0; i < Self.form.elements.length; i++) {
                obj = Self.form.elements[i];
                if (obj.name != null && obj.name != "") {
                    if (obj.type == "checkbox" || obj.type == "radio") {
                        if (obj.checked) {
                            Self.paraString += spchar + obj.name + "=" + escape(obj.value);
                        }
                    }
                    else {
                        Self.paraString += spchar + obj.name + "=" + escape(obj.value);
                    }
                    spchar = "&";
                }
            }
            if (Self.paraString == "") { Self.paraString = null }
            Self.contentType = Self.form.enctype;
            Self.sendRequest();
        }
        return false;
    }

    this.getForm = function(fromid) {
        var i;
        if (fromid != null) {
            Self.form = document.getElementById(fromid);
            if (Self.form && Self.form.tagName == "FORM") {
                Self.method = Self.form.method;
            }
        }
        if (Self.form) {
            AddEvent("Self.form.onsubmit", "return Self.submitAjaxForm()");
            //Self.form.onsubmit = Self.submitAjaxForm
        }
    }
    function AddEvent(strEnt, strFun) {
        //为事件追加函数
        if (eval(strEnt) != null) {
			var strFunction = "var oldEnt=" + strEnt + ";";
            strFunction += strEnt + "=function(){var r=oldEnt();if(r || r==null){" + strFun + "}else{ return false}}";
            eval(strFunction);
        }
        else {
            var strFunction = "";
            strFunction = strEnt + "=function(){" + strFun + "}";
            eval(strFunction);
        }
    }
}
//Ajax对象End
function InitAjaxForm(formid) {
    var ajaxForm1 = new AjaxObject();
    ajaxForm1.getForm(formid);
    ajaxForm1.precssRequest = FormProcess;
}
function FormProcess() {
    var r = { "Status": "OK", "Message": "", "ClientId": "","FocusObject": "", "GoToUrl": "" };
	var objCheckImg,objErrInfo,Cobj,Fobj;
	var ErrImgUrl=RD+"/images/_Wrong.jpg" //错误时显示的图片地址
	var OKImgUrl=RD+"/images/_Right.jpg" //正确时显示的图片地址
	var ErrColor="#ff0000"; //错误提示颜色
	var OkColor="#00ff00"; //正确时的颜色
    this.closeAjaxMessage();
    try {
        eval("r = " + this.responseText);
    }
    catch (e) {
        r.Status = "ERROR";
        r.Message = this.responseText;
    }
	if (r.ClientId != ""){
	    Cobj=document.getElementById(r.ClientId);
	}
	if (r.focusObject != ""){
	    Fobj=document.getElementById(r.FocusObject);
	}
	else{
		Fobj=Cobj
	}
	if (Cobj){
	    objCheckImg=document.getElementById(Cobj.id+"_CheckImg");
		objErrInfo=document.getElementById(Cobj.id+"_ErrInfo");
		if((!objErrInfo) && (Cobj.name!="")){
			objErrInfo=document.getElementById(Cobj.name+"_ErrInfo");
		}
		if((!objErrInfo) && (Cobj.name!="")){
			objErrInfo=document.getElementById(Cobj.name+"_ErrInfo");
		}
		if(Fobj && Fobj!=Cobj){
			if((!objErrInfo) && (Fobj.id!="")){
				objErrInfo=document.getElementById(Fobj.id+"_ErrInfo");
			}
			if((!objCheckImg) && (Fobj.id!="")){
				objCheckImg=document.getElementById(Fobj.id+"_CheckImg");
			}
			if((!objErrInfo) && (Fobj.name!="")){
				objErrInfo=document.getElementById(Fobj.name+"_ErrInfo");
			}
			if((!objCheckImg) && (Fobj.name!="")){
				objCheckImg=document.getElementById(Fobj.name+"_CheckImg");
			}
		}
	}
	if (r.Status!="OK"){
		if(objCheckImg){objCheckImg.src=ErrImgUrl;}
		if(objErrInfo){objErrInfo.style.color=ErrColor;}
	}
	else{
		if(objCheckImg){objCheckImg.src=OKImgUrl;}
		if(objErrInfo){objErrInfo.style.color=OkColor;}
    }
    if (r.Message != "") { 
	    if (objErrInfo){
			objErrInfo.innerHTML=r.Message;
		}
		else{
			alert(r.Message); 
		}
    }
	else if(objErrInfo){ 
		if(objErrInfo.getAttribute("initHTML")){
			objErrInfo.innerHTML=objErrInfo.getAttribute("initHTML")
		}
		else{
			objErrInfo.innerHTML="";
		}
	}
    if (Fobj) { 
	    try{
		    Fobj.focus(); 
		}
		catch(e){
		}
	}
    if (r.GoToUrl == "reload") {
        location.reload();
    }
    else if (!isNaN(r.GoToUrl)) {
        history.go(parseInt(r.GoToUrl,10))
    }
    else if (r.GoToUrl != "") {
        location.href = r.GoToUrl
    }
}