var rate=new Array();
function getSendMethod(Cid,Tp,Tw){
	  var obj=document.getElementById("SendList");
      var ajax=new AjaxObject();
	  obj.innerHTML="正在载入..."
	  ajax.url="/en/shoppingcart/getsendmethod.asp?Cid="+Cid+"&Tp="+Tp+"&Tw="+Tw+"&Rnd="+Math.random();
	  ajax.precssRequest=function(){
		  if(obj){
			 obj.innerHTML=this.responseText;  
		  }
	  }
	  ajax.sendRequest();
}
function AddProToCar(pid,tobj){
	  var isbadpro=document.getElementById(pid);
	 
	if(isbadpro==null || isbadpro.innerHTML!="*")
	{
	  //不存在，错误处理
	  var ajax=new AjaxObject();
	  var obj=document.getElementById("TmpDiv");
	  var p=getPosition(tobj);
	  var cw;
	  var i=0,n=0;
	  var paraString="",psobj,pnobj,potherid;
	  cw=document.body.clientWidth!=0?document.body.clientWidth:document.documentElement.clientWidth;
	  if(!obj){
		   obj=document.createElement("DIV");
		   obj.id="TmpDiv";
		   document.body.appendChild(obj);
	  }cw
	  obj.style.display="none"
	  obj.style.position="absolute";
	  if(p.left+320<=cw){
	     obj.style.left=p.left+"px";
	  }
	  else{
         obj.style.left=p.left-320+tobj.offsetWidth+"px"; 
	  }
	  obj.style.top=p.top+"px";
	  obj.style.border="#ccc solid 1px";
	  obj.style.backgroundColor="#fff";
	  obj.style.width="320px"
	  obj.style.padding="8px"
	  obj.innerHTML="正在处理...";
	  obj.style.display="block";
	  
	  ajax.url="/AddProToCar.asp?Rnd="+Math.random();
	  while(psobj=document.getElementById("Psize"+i)){
		  pnobj=document.getElementById("Pnum"+i);
		  potherid= document.getElementById("Pid"+i);
		  pid=potherid.value;
	      if(!isNaN(pnobj.value) && parseInt(pnobj.value,10)>0){
			  if(paraString==""){
				  paraString="Pid"+n+"="+pid+"&Psize"+n+"="+encodeURI(psobj.value)+"&Pnum"+n+"="+pnobj.value;
			  }
			  else{
				  paraString=paraString + "&Pid"+n+"="+pid+"&Psize"+n+"="+encodeURI(psobj.value)+"&Pnum"+n+"="+pnobj.value;
			  }
			  n++;
		  }
		  i++;
	  }
	  if(i>0 && paraString=="")
	  {
	  obj.style.display="none";
	  alert("Please choose the size and quantity you need !");
	  return;
	  }
	  if(paraString==""){
	     paraString="Pid0=" + pid;
	  }
	  //alert(paraString)
	  if(document.getElementById("IsBox"))
	  {
	  var box =document.getElementById("IsBox");
	  if(box.checked){
	  //box.value 1小盒子 2大盒子
		paraString = paraString+"&IsBox="+box.value;
		}
	  }
	  ajax.paraString=paraString;
	  ajax.method="post";
	  ajax.precssRequest=function(){
			var ProMoney=0.00,ProQuantity=0,DisMoney=0.00;
			var r;
			if(this.responseText!=""){
			   //alert(this.responseText)
				try{
					r=eval("(" + this.responseText + ")")
					if(r.Status!="OK"){
						obj.style.display="none"
						alert("You have ordered the products may have been removed.");
					}
					else{
						obj.innerHTML="<p style='font-size:14px;font-weight:bold;text-align:right'>"+
							"<a href='javascript:void(0)' onclick=\"this.parentElement.parentElement.style.display='none'\">"+
							"Close</a></p>"+
							"<p style='font-size:14px;font-weight:bold;padding:0px;margin:0px;line-height:0px;'>Successfully added to cart!<p>"+
							"<p style='font-size:12px;line-height:22px;'>There are <font color='red'>" + 
							r.ProQuantity + "</font > pieces in the cart , "+
							"Sub total: US$ <font color='red'>" + r.ProMoney + "</font> , "+
							"Actual costs: <font color='red'>"+ r.DisMoney+"</font></p>"+
							"<p style='font-size:14px;font-weight:bold;padding:0px 0 5px 0;margin:0px;line-height:0px;'><a href='/en/shoppingcart/index.asp' "+
							"target='_blank'>Go cart Settle accounts</a></p>";
							
					}
				}
				catch(e){
					obj.innerHTML=this.responseText;
				}
				//setTimeout("alert('5 seconds!')",5000)
				setTimeout("document.getElementById(\"TmpDiv\").style=\"dispaly:none\"",5000);
			}
	  }
	  ajax.sendRequest();
	}else{
//存在，正常处理


	  if(confirm("Attention please! The product has a slight stained problem. \r\nChoose Yes means you accept it and will add to Shopping Cart; \r\nChoose No, will not add to Shopping Cart."))
	  {
//添加

	  var ajax=new AjaxObject();
	  var obj=document.getElementById("TmpDiv");
	  var p=getPosition(tobj);
	  var cw;
	  var i=0,n=0;
	  var paraString="",psobj,pnobj,potherid;
	  cw=document.body.clientWidth!=0?document.body.clientWidth:document.documentElement.clientWidth;
	  if(!obj){
		   obj=document.createElement("DIV");
		   obj.id="TmpDiv";
		   document.body.appendChild(obj);
	  }cw
	  obj.style.display="none"
	  obj.style.position="absolute";
	  if(p.left+320<=cw){
	     obj.style.left=p.left+"px";
	  }
	  else{
         obj.style.left=p.left-320+tobj.offsetWidth+"px"; 
	  }
	  obj.style.top=p.top+"px";
	  obj.style.border="#ccc solid 1px";
	  obj.style.backgroundColor="#fff";
	  obj.style.width="320px"
	  obj.style.padding="8px"
	  obj.innerHTML="正在处理...";
	  obj.style.display="block";
	  
	  ajax.url="/AddProToCar.asp?Rnd="+Math.random();
	  while(psobj=document.getElementById("Psize"+i)){
		  pnobj=document.getElementById("Pnum"+i);
		  potherid= document.getElementById("Pid"+i);
		  pid=potherid.value;
	      if(!isNaN(pnobj.value) && parseInt(pnobj.value,10)>0){
			  if(paraString==""){
				  paraString="Pid"+n+"="+pid+"&Psize"+n+"="+encodeURI(psobj.value)+"&Pnum"+n+"="+pnobj.value;
			  }
			  else{
				  paraString=paraString + "&Pid"+n+"="+pid+"&Psize"+n+"="+encodeURI(psobj.value)+"&Pnum"+n+"="+pnobj.value;
			  }
			  n++;
		  }
		  i++;
	  }
	  if(i>0 && paraString=="")
	  {
	  obj.style.display="none";
	  alert("Please choose the size and quantity you need !");
	  return;
	  }
	  if(paraString==""){
	     paraString="Pid0=" + pid;
	  }
	  //alert(paraString)
	  ajax.paraString=paraString;
	  ajax.method="post";
	  ajax.precssRequest=function(){
			var ProMoney=0.00,ProQuantity=0,DisMoney=0.00;
			var r;
			if(this.responseText!=""){
			   //alert(this.responseText)
				try{
					r=eval("(" + this.responseText + ")")
					if(r.Status!="OK"){
						obj.style.display="none"
						alert("You have ordered the products may have been removed.");
					}
					else{
						obj.innerHTML="<p style='font-size:14px;font-weight:bold;text-align:right'>"+
							"<a href='javascript:void(0)' onclick=\"this.parentElement.parentElement.style.display='none'\">"+
							"Close</a></p>"+
							"<p style='font-size:14px;font-weight:bold;padding:0px;margin:0px;line-height:0px;'>Successfully added to cart!<p>"+
							"<p style='font-size:12px;line-height:22px;'>There are <font color='red'>" + 
							r.ProQuantity + "</font > pieces in the cart , "+
							"Sub total: US$ <font color='red'>" + r.ProMoney + "</font> , "+
							"Actual costs: <font color='red'>"+ r.DisMoney+"</font></p>"+
							"<p style='font-size:14px;font-weight:bold;padding:0px 0 5px 0;margin:0px;line-height:0px;'><a href='/en/shoppingcart/index.asp' "+
							"target='_blank'>Go cart Settle accounts</a></p>";
					}
				}
				catch(e){
					obj.innerHTML=this.responseText;
				}
				//setTimeout("obj.style=\"display:none\"",3000);
				setTimeout("document.getElementById(\"TmpDiv\").style=\"dispaly:none\"",5000);
			}
	  }
	  ajax.sendRequest();
	  }
	  }
}


function changeNum(n,id){
	var obj=document.getElementById(id)
	var oldvalue;
	if(obj){
		oldvalue=obj.value;
		if(isNaN(oldvalue)){
			oldvalue="0";
		}
		oldvalue=parseInt(oldvalue,10)+n;
		oldvalue=oldvalue<0?0:oldvalue;
		obj.value=oldvalue;
	}
}

function getPosition(ob){
    if(!ob){return null;}
    var mendingOb = ob;
    var mendingLeft = mendingOb.offsetLeft;
	var mendingTop = mendingOb.offsetTop;
    while(mendingOb != null && mendingOb .offsetParent != null && mendingOb .offsetParent.tagName != "BODY" ){
		mendingLeft += mendingOb .offsetParent.offsetLeft;
		mendingTop += mendingOb .offsetParent.offsetTop;
		mendingOb = mendingOb .offsetParent;
    }
    return {"left":mendingLeft,"top":mendingTop} ;
}

function ChangeLogistics(){
    var objTp,objSp,objTA,objL;
	var sp,i;
	objTp=document.getElementById("TotalPrice");
	objTA=document.getElementById("TotalAmount");
	i=0;
	sp="请与管理员联系运费";
	while(objL=document.getElementById("LogisticsId"+i)){
			if(objL.checked){
			  objSp=document.getElementById("SendPriceText"+i)
			  sp=objSp.innerHTML.replace(/\$/gi,"");
			  break;
			}
			i++;
	}
	objSp=document.getElementById("SendPrice")
	if(isNaN(sp)){
		objSp.value=""
		objTA.innerHTML=sp
	}
	else{
		objSp.value=sp
		objTA.innerHTML="$" + formatNumber(parseFloat(objTp.innerHTML.replace(/\$/gi,""))+parseFloat(sp),2)
	}
}

function ChangeQuantity(id,Q){
   	 var ajax=new AjaxObject();
	 ajax.url="/en/shoppingcart/index.asp?Action=AjaxModi&Rnd="+Math.random();
	 ajax.method="post";
	 ajax.paraString="Unid0="+id+"&Quantity0="+Q
	 RefreshOrder();
	 ajax.sendRequest();
}

function RefreshOrder(){
    var objQ,objRP,objP,objW
	var objTW,objTQ,objTP
	var R=1.00;
	var i=0;
	var TW=0.000,TQ=0,TP=0.00,DP=0.00
	var NextR=null
	while(objQ=document.getElementById("Quantity"+i)){
			objP=document.getElementById("Price"+i);
			objRP=document.getElementById("RowPrice"+i);
			objW=document.getElementById("Weight"+i);
			objRP.innerHTML=formatNumber(parseInt(objQ.value,10)*parseFloat(objP.innerHTML),2);
			TW=TW+parseInt(objQ.value,10)*parseFloat(objW.innerHTML);
			TQ=TQ+parseInt(objQ.value,10);
			TP=TP+parseInt(objQ.value,10)*parseFloat(objP.innerHTML);
			i=i+1;
	}
	for(i=0;i<rate.length;i++){
		if(TP>=rate[i].price){
			R=rate[i].discount;
			break;	
		}
		else{
		   NextR=rate[i];
		}	
	}
	DP=TP*(1-R)
	objTW=document.getElementById("TotalWeight");
	objTQ=document.getElementById("TotalQuantity");
	objTP=document.getElementById("TotalPrice");
	objPPS=document.getElementById("ProductPriceSpan");
	objDPS=document.getElementById("DiscountPriceSpan");
	//objDPS2=document.getElementById("DiscountPriceSpan2");
	objTPS=document.getElementById("TotalPriceSpan");
	objRS=document.getElementById("RateSpan");
	objRTS=document.getElementById("RateTextSpan");
	
	objTW.innerHTML=formatNumber(TW,3);
	objTQ.innerHTML=TQ;
	objTP.innerHTML=formatNumber(TP,2);
	objPPS.innerHTML=formatNumber(TP,2);
	if(DP>0){
		objDPS.innerHTML="- "+formatNumber(DP,2)
	}
	else if(DP<0)
	{
		objDPS.innerHTML="+ "+formatNumber(-DP,2)
	}
	else{
		objDPS.innerHTML="0.00"
	}
	
	objTPS.innerHTML=formatNumber(TP*R,2)
	if(R<=1){
	objRS.innerHTML="Discount ("+formatNumber((1-R)*100,0)+"%"
	}
	else
	{
	objRS.innerHTML="Add Fee ("+formatNumber(Math.abs(1-R)*100,0)+"%"
	}
	//if(TP>200)
	//{
	//objDPS2.innerHTML="- 20";
	//}else
	//{
	//objDPS2.innerHTML="0.00";
	//}
	if(NextR!=null){
	if(TP<100){
		objRTS.innerHTML="More than US$ 100 for each order is requested.<br />The price will increase by 20% if order amount is less than $100. ";
		}
	else{
		objRTS.innerHTML="If more than $"+formatNumber(NextR.price,2)+",have "+formatNumber((1-NextR.discount)*100,0)+"% discounts ";
		}	
	}
	
}

function formatNumber(value,dnum)
{
	//formatNumber(value,dnum)返回保留num位小数以后的字符串
    //value,字符或数字,需要格式化的数字
    //num,字符或数字,保留小数的位数
    var newValue=getNumber(value,dnum);
    var strValue=newValue.toString();
				var p,i;
				
				p=strValue.indexOf(".");
				if(p<0){
							strValue+=".";
							p=strValue.indexOf(".");
				}
				dnum=isNaN(dnum)?0:dnum;
				for(i=0;i<dnum;i++){
							strValue+="0";
				}
				if(dnum==0){
							strValue=strValue.substring(0,p);
				}
				else{
							strValue=strValue.substring(0,p+dnum+1);
				}
				return strValue;
}
function getNumber(value,dnum){
				//getNumber(value,dnum)返回保留num位小数以后的数字
    //value,字符或数字,需要保留小数的数字
    //num,字符或数字,保留小数的位数
				var p;
				value=isNaN(value)?0:value;
				dnum=isNaN(dnum)?0:dnum;
				p=Math.pow(10,dnum);
				return Math.round(value*p)/p;
}

function isDate(datestr,fchar)
         //判断控件值是否为YYYY/MM/DD格式的日期型
{
				var lthdatestr;
				lthdatestr= datestr.length;
				var tmpy="";
				var tmpm="";
				var tmpd="";
				var status;
				status=0;
			
				for (i=0;i<lthdatestr;i++){
								if (datestr.charAt(i)== fchar){
												status++;
								}
								if (status>2){
											return false;
								}
								if ((status==0) && (datestr.charAt(i)!=fchar)){
											tmpy=tmpy+datestr.charAt(i)
								}
								if ((status==1) && (datestr.charAt(i)!=fchar)){
											tmpm=tmpm+datestr.charAt(i)
								}
								if ((status==2) && (datestr.charAt(i)!=fchar)){
											tmpd=tmpd+datestr.charAt(i)
								}
				}
			
				year=new String (tmpy);
				month=new String (tmpm);
				day=new String (tmpd)
				if ((tmpy.length!=4) || (tmpm.length>2) || (tmpd.length>2))
				{
							return false;
				}
				if (!((1<=month) && (12>=month) && (31>=day) && (1<=day)) )
				{
							return false;
				}
				if (!((year % 4)==0) && (month==2) && (day==29))
				{
							return false;
				}
				if ((month<=7) && ((month % 2)==0) && (day>=31))
				{
							return false;
				}
				if ((month>=8) && ((month % 2)==1) && (day>=31))
				{
							return false;
				}
				if ((month==2) && (day==30))
				{
							return false;
				}
				
				if(month<10){
							month="0" + eval(tmpm);
				}
				if(day<10){
							day="0" + eval(tmpd);
				}
				
				return true;
}

function isTime(datestr)
         //判断控件值是否为hh:mm:ss格式的时间型
{
				var lthdatestr;
				lthdatestr= datestr.length;
				var tmpy="";
				var tmpm="";
				var tmpd="";
				var status;
				status=0;
			
				for (i=0;i<lthdatestr;i++){
									if (datestr.charAt(i)== ':'){
												status++;
									}
									if (status>2){
												return false;
									}
									if ((status==0) && (datestr.charAt(i)!=':')){
												tmpy=tmpy+datestr.charAt(i)
									}
									if ((status==1) && (datestr.charAt(i)!=':')){
												tmpm=tmpm+datestr.charAt(i)
									}
									if ((status==2) && (datestr.charAt(i)!=':')){
												tmpd=tmpd+datestr.charAt(i)
									}
				}
			
				year=new String (tmpy);
				month=new String (tmpm);
				day=new String (tmpd)
				if ((tmpy.length>2) || (tmpm.length>2) || (tmpd.length>2))
				{
							return false;
				}
				if (!(0<=year && year<=23))
				{
							return false;
				}
				
				if (!((0<=month) && (59>=month) && (59>=day) && (0<=day)) )
				{
							return false;
				}
				if(year<10){
							year="0" + eval(tmpy);
				}
				if(month<10){
							month="0" + eval(tmpm);
				}
				if(day<10){
							day="0" + eval(tmpd);
				}
				
				return true;
}

function Trim(TRIM_VALUE){
	//去左右空格
	if(TRIM_VALUE.length < 1){
		return"";
	}
	TRIM_VALUE = RTrim(TRIM_VALUE);
	TRIM_VALUE = LTrim(TRIM_VALUE);
	if(TRIM_VALUE==""){
		return "";
	}
	else{
			return TRIM_VALUE;
	}
}

function RTrim(VALUE){
	//去右边空格
	var w_space = String.fromCharCode(32);
	var v_length = VALUE.length;
	var strTemp = "";
	
	if(v_length < 0){
		return"";
	}
	var iTemp = v_length -1;
	
	while(iTemp > -1){
		if(VALUE.charAt(iTemp) == w_space){}
    	else{
    		strTemp = VALUE.substring(0,iTemp +1);
    		break;
    	}
    	iTemp = iTemp-1;
    }
    return strTemp;
}


function LTrim(VALUE){
	//去左边空格
	var w_space = String.fromCharCode(32);

	if(v_length < 1){
		return"";
	}
	var v_length = VALUE.length;
	var strTemp = "";
	var iTemp = 0;

	while(iTemp < v_length){
		if(VALUE.charAt(iTemp) == w_space){}
		else{
			strTemp = VALUE.substring(iTemp,v_length);
			break;
		}
    	iTemp = iTemp + 1;
    }
    return strTemp;
}
function getLength(s){
   //得到字符串长度,汉字为2
   var L=0;
   var i;
   var code;
   for(i=0;i<s.length;i++){
       code=s.substr(i,1).charCodeAt();
       if(code>=0 && code<=254){
	      L++;
	   }
	   else{
	      L+=2;
	   }
   }
   return(L);
}
function IsInString(sString,sText){
	//判断sText是否仅包含于sString内
	var ValidChars=sString
	var IsChars=true;
	var Char;
	
	for(i=0;i<sText.length && IsChars==true;i++){
		Char=sText.charAt(i);
		if (ValidChars.indexOf(Char)==-1){
			IsChars=false;
		}
	}
	return IsChars;
}

function GetTopLogin(){
	var tlogin=document.getElementById("toplogin");
	/*if(tlogin){
		var ajax=new AjaxObject();
		ajax.url="./src/SysEvents.asp?Action=GetTopLogin&Rnd=" + Math.random();
		ajax.precssRequest=function(){
			var r;
			try{
			   r=eval("("+this.responseText+")");
			}
			catch(e){
			   r={"States":"ERROR","Message":this.responseText};
			}
			if(r.States=="ERROR"){
			   alert(r.Message);
			}
			else{
			   tlogin.innerHTML=r.Message;
			}
		}
		ajax.sendRequest()
	}*/
}

function ShowMenu(menuid){
	var obj,i;
	i=0;
	while(obj=document.getElementById("SubMenu_"+menuid+"_"+i)){
		if(obj.style.display=='none'){
		    obj.style.display="";
		}
		else{
			obj.style.display="none";
		}
	    i++; 	
	}
}
function GetRTime(){
    var BeginTime= new Date('2017/11/08 12:00:00');
    var EndTime= new Date('2017/11/11 11:59:59');    
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var tmd =BeginTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
if(tmd<=0){
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
 if(t>=0){
 	
    document.getElementById("day_show").innerHTML = d + " Days ";
    document.getElementById("hour_show").innerHTML = h + ":"+m + ":"+s;
	document.getElementById("mytimesdis").style.display='block';
  }
  else
  {
  
 document.getElementById("mytimesdis").style.display='none';
  
}
}
else
{
 document.getElementById("mytimesdis").style.display='none';
}
  }

function showRtime(){
//var issb = document.getElementById("daleiid").innerHTML;
//if(issb=="Super Deals"){
var a=1;
if (a==1){
setInterval(GetRTime,100);
}
//}
  }
function GetRTimews(){
    var BeginTime= new Date('2016/7/25 12:00:00');
    var EndTime= new Date('2016/8/15 12:00:00');    
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var tmd =BeginTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
if(tmd<=0){
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
 if(t>=0){
 	
    document.getElementById("day_show").innerHTML = d + " Days ";
    document.getElementById("hour_show").innerHTML = h + ":"+m + ":"+s;
	document.getElementById("mytimesdis").style.display='block';
  }
  else
  {
  
 document.getElementById("mytimesdis").style.display='none';
  
}
}
else
{
 document.getElementById("mytimesdis").style.display='none';
}
  }

function showRtimews(){
//var issb = document.getElementById("daleiid").innerHTML;
//if(issb=="Super Deals"){
var a=1;
if (a==1){
setInterval(GetRTimews,100);
}
//}
  }
  function showRtimeindex(){
var b=1;
if (b==1){
setInterval(Get1to5Timeindex,500);
}
  }
function showRtimeinside(){
var c=1;
if (c==1){
setInterval(Get1to5Timeinside,500);
}
  }
function showshippingfee(){

if(document.getElementById('fshippingfee').style.display=='none')
{
	if(document.getElementById('fshippingfee').style.width=="300px")
{
document.getElementById('fshippingfee').style.display='block';
}else{
  document.getElementById('fshippingfee').style.position="fixed";
  document.getElementById('fshippingfee').style.right="5px";
  document.getElementById('fshippingfee').style.bottom="150px";
  document.getElementById('fshippingfee').style.height="290px";
  document.getElementById('fshippingfee').style.width="300px";
  document.getElementById('fshippingfeen').innerHTML = "<iframe src='/en/shoppingcart/shippingfee.asp' width='300' height='310' frameborder='no' border='1' marginwidth='0' marginheight='0' scrolling='auto' allowtransparency='yes'></iframe>";
  document.getElementById('fshippingfee').style.display='block';
}
}
else
{  
noshippingfee();  
}
}
function noshippingfee()
{
document.getElementById('fshippingfee').style.display='none';  
}
function Get1to5Timeinside()
{

var BeginTime= new Date('2015/07/20 12:00:00');
var NowTime = new Date();
var to1time=NowTime.getTime()-BeginTime.getTime();
var beg1time=to1time%604800000;
var t=432000000-beg1time;
if(t>=0 && 1==2)
{
var d=0;
var h=0;
var m=0;
var s=0;
d=Math.floor(t/1000/60/60/24);
h=Math.floor(t/1000/60/60%24);
m=Math.floor(t/1000/60%60);
s=Math.floor(t/1000%60);
var strtimes="<img src='/images/nlock.png'>"+d+"Day "+h + ":"+m + ":"+s+"<br>";
document.getElementById("day_show").innerHTML = d+" Day";
document.getElementById("hour_show").innerHTML = h + ":"+m + ":"+s;
displaymunewtime();
}
else
{
displaymunewtime();
}

}
function Get1to5Timeindex()
{

var BeginTime= new Date('2015/07/20 12:00:00');
var NowTime = new Date();
var to1time=NowTime.getTime()-BeginTime.getTime();
var beg1time=to1time%604800000;
var t=432000000-beg1time;
if(t>=0 && 1==2)
{
var d=0;
var h=0;
var m=0;
var s=0;
d=Math.floor(t/1000/60/60/24);
h=Math.floor(t/1000/60/60%24);
m=Math.floor(t/1000/60%60);
s=Math.floor(t/1000%60);
var strtimes="<img src='/images/wlock.png'>"+d+"Day "+h + ":"+m + ":"+s+"<br>";
for(var axxx=0;axxx<9;axxx++)
{
	if(axxx==8)
	{
	document.getElementById("indexgogogo"+axxx).innerHTML ="Weekly Special"+strtimes;
	}
	else
	{
	document.getElementById("indexgogogo"+axxx).innerHTML =strtimes;
	}

}

//显示12个
for(var axxx2=0;axxx2<9;axxx2++)
{
document.getElementById('indexgogogo'+axxx2).style.display='block';
}
}
else
{
//隐藏12个
for(var axxx3=0;axxx3<9;axxx3++)
{
document.getElementById('indexgogogo'+axxx3).style.display='none';

}
}

}
function displaymunewtime()
{
document.getElementById("mytimesdisnew").style.display='block';
}
function setdesccookie()
{
document.cookie="desc=1";  
window.location.href=window.location.href;

}
//movejisuanqi
var amingdrag_=false
var amingDmove=new Function('obj','return document.getElementById(obj);')
var amingoevent=new Function('e','if (!e) e = window.event;return e')
function amingMove_obj(obj){
 var x,y;
 amingDmove(obj).onmousedown=function(e){
  amingdrag_=true;
  with(this){
   style.position="absolute";var temp1=offsetLeft;var temp2=offsetTop;
   x=amingoevent(e).clientX;y=amingoevent(e).clientY;
   document.onmousemove=function(e){
    if(!amingdrag_)return false;
    with(this){
     style.left=temp1+amingoevent(e).clientX-x+"px";
     style.top=temp2+amingoevent(e).clientY-y+"px";
    }
   }
  }
  document.onmouseup=new Function("amingdrag_=false");
 }
}

var get = {
	byId: function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};
var dragMinWidth = 730;
var dragMinHeight = 400;
/*-------------------------- +
  拖拽函数
 +-------------------------- */
function drag(oDrag, handle)
{
	var disX = dixY = 0;
	var oMin = get.byClass("min", oDrag)[0];
	var oMax = get.byClass("max", oDrag)[0];
	var oRevert = get.byClass("revert", oDrag)[0];
	var oClose = get.byClass("close", oDrag)[0];
	handle = handle || oDrag;
	handle.style.cursor = "move";
	handle.onmousedown = function (event)
	{
		var event = event || window.event;
		disX = event.clientX - oDrag.offsetLeft;
		disY = event.clientY - oDrag.offsetTop;
		
		document.onmousemove = function (event)
		{
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
			var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
			
			iL <= 0 && (iL = 0);
			iT <= 0 && (iT = 0);
			iL >= maxL && (iL = maxL);
			iT >= maxT && (iT = maxT);
			
			oDrag.style.left = iL + "px";
			oDrag.style.top = iT + "px";
			
			return false
		};
		
		document.onmouseup = function ()
		{
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
		};
		this.setCapture && this.setCapture();
		return false
	};	
	//最大化按钮
	oMax.onclick = function ()
	{
		oDrag.style.top = oDrag.style.left = 0;
		oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
		oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
		this.style.display = "none";
		oRevert.style.display = "block";
	};
	//还原按钮
	oRevert.onclick = function ()
	{		
		oDrag.style.width = dragMinWidth + "px";
		oDrag.style.height = dragMinHeight + "px";
		oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
		oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
		this.style.display = "none";
		oMax.style.display = "block";
	};
	//最小化按钮
	oMin.onclick = oClose.onclick = function ()
	{
		oDrag.style.display = "none";

	};
	//阻止冒泡
	oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event)
	{
		this.onfocus = function () {this.blur()};
		(event || window.event).cancelBubble = true	
	};
}
/*-------------------------- +
  改变大小函数
 +-------------------------- */
function resize(oParent, handle, isLeft, isTop, lockX, lockY)
{
	handle.onmousedown = function (event)
	{
		var event = event || window.event;
		var disX = event.clientX - handle.offsetLeft;
		var disY = event.clientY - handle.offsetTop;	
		var iParentTop = oParent.offsetTop;
		var iParentLeft = oParent.offsetLeft;
		var iParentWidth = oParent.offsetWidth;
		var iParentHeight = oParent.offsetHeight;
		
		document.onmousemove = function (event)
		{
			var event = event || window.event;
			
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
			var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;			
			var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
			var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
			
			isLeft && (oParent.style.left = iParentLeft + iL + "px");
			isTop && (oParent.style.top = iParentTop + iT + "px");
			
			iW < dragMinWidth && (iW = dragMinWidth);
			iW > maxW && (iW = maxW);
			lockX || (oParent.style.width = iW + "px");
			
			iH < dragMinHeight && (iH = dragMinHeight);
			iH > maxH && (iH = maxH);
			lockY || (oParent.style.height = iH + "px");
			
			if((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;
			
			return false;	
		};
		document.onmouseup = function ()
		{
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	}
};
//window.onload = window.onresize = function ()
function showjisuanqi()
{
	if(document.getElementById('drag').style.display=="none" && document.getElementById('mycontent').innerHTML!="" && document.getElementById('dragname').innerHTML == "Shipping Fee Calculation")
	{document.getElementById('drag').style.display="block";}
	else if(document.getElementById('drag').style.display=="block"){document.getElementById('drag').style.display="none";}
	else{
	//var myurl="/en/shoppingcart/getsendmethod.asp?Cid="+Cid+"&Tp="+Tp+"&Tw="+Tw+"&Rnd="+Math.random();
	 document.getElementById('mycontent').innerHTML = "<iframe width='99%' height='100%' src='/en/shoppingcart/shippingfee.asp' frameborder='no' border='1' marginwidth='0' marginheight='0' scrolling='auto' allowtransparency='yes'></iframe>";
	var oDrag = document.getElementById("drag");
	var oTitle = get.byClass("title", oDrag)[0];
	var oL = get.byClass("resizeL", oDrag)[0];
	var oT = get.byClass("resizeT", oDrag)[0];
	var oR = get.byClass("resizeR", oDrag)[0];
	var oB = get.byClass("resizeB", oDrag)[0];
	var oLT = get.byClass("resizeLT", oDrag)[0];
	var oTR = get.byClass("resizeTR", oDrag)[0];
	var oBR = get.byClass("resizeBR", oDrag)[0];
	var oLB = get.byClass("resizeLB", oDrag)[0];
	
	drag(oDrag, oTitle);
	//四角
	resize(oDrag, oLT, true, true, false, false);
	resize(oDrag, oTR, false, true, false, false);
	resize(oDrag, oBR, false, false, false, false);
	resize(oDrag, oLB, true, false, false, false);
	//四边
	resize(oDrag, oL, true, false, false, true);
	resize(oDrag, oT, false, true, true, false);
	resize(oDrag, oR, false, false, false, true);
	resize(oDrag, oB, false, false, true, false);
	oDrag.style.display="block";
	
	oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
	oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
	}
}
function showchart(sizeofchart)
{	
	if(document.getElementById('drag').style.display=="none" && document.getElementById('mycontent').innerHTML!="" && document.getElementById('dragname').innerHTML == "Ohyeah Size Chart")
	{document.getElementById('drag').style.display="block";}
	else if(document.getElementById('drag').style.display=="block"){document.getElementById('drag').style.display="none";}
	else{
	//var myurl="/en/shoppingcart/getsendmethod.asp?Cid="+Cid+"&Tp="+Tp+"&Tw="+Tw+"&Rnd="+Math.random();
	 document.getElementById('mycontent').innerHTML = "<iframe width='99%' height='100%' src='http://www.ohyeahlady.com/size_chart.html#"+sizeofchart+"' frameborder='no' border='1' marginwidth='0' marginheight='0' scrolling='auto' allowtransparency='yes'></iframe>";
	var oDrag = document.getElementById("drag");
	
	//$("div#title h2").innerHTML="Size Chart";
	var oTitle = get.byClass("title", oDrag)[0];
	var oL = get.byClass("resizeL", oDrag)[0];
	var oT = get.byClass("resizeT", oDrag)[0];
	var oR = get.byClass("resizeR", oDrag)[0];
	var oB = get.byClass("resizeB", oDrag)[0];
	var oLT = get.byClass("resizeLT", oDrag)[0];
	var oTR = get.byClass("resizeTR", oDrag)[0];
	var oBR = get.byClass("resizeBR", oDrag)[0];
	var oLB = get.byClass("resizeLB", oDrag)[0];
	
	drag(oDrag, oTitle);
	//四角
	resize(oDrag, oLT, true, true, false, false);
	resize(oDrag, oTR, false, true, false, false);
	resize(oDrag, oBR, false, false, false, false);
	resize(oDrag, oLB, true, false, false, false);
	//四边
	resize(oDrag, oL, true, false, false, true);
	resize(oDrag, oT, false, true, true, false);
	resize(oDrag, oR, false, false, false, true);
	resize(oDrag, oB, false, false, true, false);
	oDrag.style.display="block";
	
	oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
	oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
	document.getElementById('dragname').innerHTML = "Ohyeah Size Chart";

	}
	
}
function showchange(){
var axxx=1;
if (axxx==1){
setInterval(changeOS,1000);
}
}
function changeOS()
{
var IsShowvar=0;
IsShowvar=getCookie("IsShow");
if(IsShowvar=="")
{

document.getElementById('serviceListTitle').innerHTML="Online service<a style=\'float: right;cursor:pointer;font-size:12px;padding-left: 0px;margin: 0px;font-size: 23px;\' onclick=\'changeosoff()\'><span style=\'color: #000000;\'><img style=\"margin:6px\"  height=16 src=\'/images/53kfclose.png\'/></span></a>";
if(!document.getElementById('SHOWFKLOGO')){
document.getElementById('iconDivMain1').innerHTML+="<div style=\"float: right;position:relative;background: url(\'/images/list_39.png\') 0 0 no-repeat;width: 72px;height:31px\" id=\'SHOWFKLOGO\' onclick=\'changeoson()\'></div>";
}
document.getElementById('KFLOGO').style.display="block";
document.getElementById('SHOWFKLOGO').style.display="none";
}
else if(IsShowvar=="0")
{

document.getElementById('serviceListTitle').innerHTML="Online service<a style=\'float: right;cursor:pointer;font-size:12px;padding-left: 0px;margin: 0px;font-size: 23px;\' onclick=\'changeosoff()\'><span style=\'color: #000000;\'><img style=\"margin:6px\"  height=16 src=\'/images/53kfclose.png\'/></span></a>";
if(!document.getElementById('SHOWFKLOGO')){
document.getElementById('iconDivMain1').innerHTML+="<div style=\"float: right;position:relative;background: url(\'/images/list_39.png\') 0 0 no-repeat;width: 72px;height:31px\" id=\'SHOWFKLOGO\' onclick=\'changeoson()\'></div>";
}
document.getElementById('KFLOGO').style.display="block";
document.getElementById('SHOWFKLOGO').style.display="none";
}
else{

document.getElementById('serviceListTitle').innerHTML="Online service<a style=\'float: right;cursor:pointer;font-size:12px;padding-left: 0px;margin: 0px;font-size: 23px;\' onclick=\'changeosoff()\'><span style=\'color: #000000;\'><img style=\"margin:6px\" height=16 src=\'/images/53kfclose.png\'/></span></a>";
if(!document.getElementById('SHOWFKLOGO')){
document.getElementById('iconDivMain1').innerHTML+="<div style=\"float: right;position:relative;background: url(\'/images/list_39.png\') 0 0 no-repeat;width: 72px;height:31px\" id=\'SHOWFKLOGO\' onclick=\'changeoson()\'></div>";
}
document.getElementById('KFLOGO').style.display="none";
document.getElementById('SHOWFKLOGO').style.display="block";
}
}
function changeoson()
{
setCookie("IsShow","0",30);
document.getElementById('KFLOGO').style.display="block";
document.getElementById('SHOWFKLOGO').style.display="none";
}
function changeosoff()
{
setCookie("IsShow","1",30);
document.getElementById('KFLOGO').style.display="none";
document.getElementById('SHOWFKLOGO').style.display="block";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//清除cookie  
function clearCookie(name) {  
    setCookie(name, "", -1);  
} 
function setdesccookieno()
{
document.cookie="desc=0"; 
window.location.href=window.location.href;
}
function changeURLPar(destiny, par, par_value) 
{ 
var pattern = par+'=([^&]*)'; 
var replaceText = par+'='+par_value; 
if (destiny.match(pattern)) 
{ 
var tmp = '/'+par+'=[^&]*/'; 
tmp = destiny.replace(eval(tmp), replaceText); 
return (tmp); 
} 
else 
{ 
if (destiny.match('[\?]')) 
{ 
return destiny+'&'+ replaceText; 
} 
else 
{ 
return destiny+'?'+replaceText; 
} 
} 
return destiny+'\n'+par+'\n'+par_value; 
} 
function bigImgs(x)
{x.style.height=document.getElementById('Maxheight').value;}

function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
} 
function changesize(x)
{
if($(x).hasClass("showfales")){
$(x).removeClass("showfales");
$(x).addClass("showture");
}
else{
$(x).removeClass("showture");
$(x).addClass("showfales");
}
var div=x.parentNode.getElementsByClassName("showture");
var sel=document.getElementById('selected');
sel.innerHTML="";
for(var i=0;i<div.length;i++)
{
if(sel.innerHTML==""){sel.innerHTML+=div[i].innerHTML;}
else{sel.innerHTML+= ","+div[i].innerHTML;}
}
}
function findbyprice()
{
if(document.getElementById('beginprice').value=="Mix$" ||document.getElementById('endprice').value=="Max$")
{
}else
{ 
var gourl="";
if (getQueryString("dalei") == null)
{
var thisclass=document.getElementById('thisclassname').innerHTML.replace("&amp;","_").replace("&","_");
gourl=changeURLPar("/en/search/class.asp?by=&dalei="+thisclass,"pb",document.getElementById('beginprice').value);
gourl=changeURLPar(gourl,"pe",document.getElementById('endprice').value);
window.location.href=gourl;
}
else
{
gourl=window.location.href;
gourl=changeURLPar(gourl,"pb",document.getElementById('beginprice').value);
gourl=changeURLPar(gourl,"pe",document.getElementById('endprice').value);
window.location.href=gourl;
}
}
}
function seachsize()
{
var gourl="";
if (getQueryString("dalei") == null)
{
var thisclass=document.getElementById('thisclassname').innerHTML.replace("&amp;","_").replace("&","_");
gourl=changeURLPar("/en/search/class.asp?by=&dalei="+thisclass,"chima",document.getElementById('selected').innerHTML);
window.location.href=gourl;
}
else
{
gourl=window.location.href;
gourl=changeURLPar(gourl,"chima",document.getElementById('selected').innerHTML);
window.location.href=gourl;
}
}
function normalImg(x)
{
x.style.height="20px";
   // x.delay(6000).height="20px";
}




(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-68172354-1', 'auto');
  ga('send', 'pageview');
