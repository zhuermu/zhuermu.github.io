
<!-- saved from url=(0047)http://www.ohyeahlady.com/en/member/mylogin.asp -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><style type="text/css">
<!--
body{margin:0;padding:0; overflow:hidden;font-family:Arial, Helvetica, sans-serif;font-size:14px;color:#333;background:transparent}
a{color:#333;text-decoration:none}
a:hover{color: #00f;}
a.reg:link,a.reg:visited,a.reg:active{color:#333}
a.reg:hover{ color:#090}
.my_menu_top{color:#c00}
.logininput1{width:170px;height:20px; background:url(./user.gif) no-repeat 2px center; border:1px #769 solid;padding-left:20px;}
.logininput2{width:170px;height:20px; background:url(./pass.gif) no-repeat 2px center; border:1px #769 solid;padding-left:20px;}
.login{text-align:right;height:26px;line-height:26px}

.mylogin{width:194px;overflow: hidden;background-color:#fffffc;margin:0;padding:0 0 0 7px}
.mylogin ul{margin:0;padding:0 0 0 7px}
.mylogin li{list-style:none; margin:5px 0 0 0;line-height:30px}
.mylogin li dl{width:50px; margin:0; line-height:20px}
.mylogin a{text-decoration: none;color: #494949;}
.mylogin a:hover, .mylogin a:active{color:#909;text-decoration: underline;}

.myinfo{width:194px;overflow:hidden;background-color:#fffffc;margin:0;padding:5px 0 0 7px}
.myinfo ul{width:190px;margin:0;padding:0}
.myinfo ul li{list-style:none;margin:0;padding:0;line-height:30px;}
.order{background:url(./order.gif) no-repeat 2px center;text-indent:2em}
.editpass{background:url(./editpass.gif) no-repeat 2px center;text-indent:2em}
.signout{background:url(./signout.gif) no-repeat 2px center;text-indent:2em}
.info{background:url(./info.gif) no-repeat 4px center;text-indent:2em}
.addr{background:url(./address.png) no-repeat 4px center;text-indent:2em}
.msg{background:url(./mail.png) no-repeat 4px center;text-indent:2em}
.news{background:url(./newspaper.png) no-repeat 4px center;text-indent:2em}
.welcome{font-size:14px; font-weight:bold;text-indent:0.5em; width:190px; overflow:hidden; height:32px;word-break:keep-all;white-space:nowrap}
.cart{background:url(./cart.png) no-repeat 4px center;text-indent:2em}

-->

</style>
<style type="text/css">#shownewred {
    width:20px;
    height:20px;
    line-height:20px;
    font-size:10px;
    color:#fff;
    text-align:center;
    background-color:#f00;
    border-radius:50%;

}
</style>

<script language="javascript">
	function CheckForm()
	{
		if(document.UserLogin.username.value=="")
		{
			alert("Email is Null!");
			document.UserLogin.username.focus();
			return false;
		}
		if(document.UserLogin.password.value == "")
		{
			alert("Password is Null!");
			document.UserLogin.password.focus();
			return false;
		}
	}
</script>
</head><body><div class="mylogin">
<ul><form action="http://www.ohyeahlady.com/en/member/Userlogin.asp" method="post" name="UserLogin" id="UserLogin" onsubmit="return CheckForm();" target="_top">
<li><dl>
  Username/Email:</dl><input id="mod_login_username" type="text" name="username" size="10" value="" class="logininput1"></li>
<li><dl>Password:</dl> <input id="mod_login_password" type="password" name="password" alt="password" size="10" value="" class="logininput2"></li>
<li><input type="image" name="Submit" class="button" src="./login.jpg"> <a href="http://www.ohyeahlady.com/login.asp" target="_top" class="reg"><img class="button" src="./reg.jpg" border="0"></a></li>
<li style="text-align:center;line-height:20px"><a href="http://www.ohyeahlady.com/en/member/GetPassword.asp" target="_top">Forget Password?</a></li>
</form></ul></div>
<script src="./jquery-1.7.2.min.js"></script>
<script>
dh=$(document).height();
//window.parent.document.getElementById("callframe").height=dh;
</script></body></html>