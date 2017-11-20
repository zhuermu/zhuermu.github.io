var Jack;
if(!Jack) Jack={};
Jack.DivFrame=function(url,objid,width,height,left,top){
	var SELF=this;
	var divobj,fobjs,fobj;
	var Statu=0;
	SELF.Url=url;
	SELF.UpdateValue=new Function();
	function Init(){
		width=width==null?200:width;
		height=height==null?220:height;
		divobj=document.getElementById(objid);
		if(!divobj){
			divobj=document.createElement("DIV");
			divobj.id=objid;
			document.body.appendChild(divobj);
		}
		divobj.style.visibility="hidden";
		divobj.style.position="absolute";
		divobj.style.border="#D8DDE5 solid 1px";
		divobj.style.width=width+"px";
		divobj.style.height=height+"px";
		divobj.style.cursor="default";
		divobj.style.background="#fff";
		divobj.style.margin="0";
		divobj.style.padding="0";
		divobj.innerHTML='<dl style="display:block; margin:0px; padding:0px;" >'+
			'<dt style=" height:23px; background:#D8DDE5" id="'+objid+'_Title">'+
			'<span style="text-align: center; display:block; border:#0D58A5 solid 1px; cursor:pointer; width:12px; height:15px;'+
			'line-height:15px; float:right; margin:2px 2px;" id="'+objid+'_CloseButton">×</span></dt>'+
			'<dd style="display:block; margin:0px; padding:0px;"><iframe width="'+width+'" height="'+(height-23)+'" frameborder="0"></iframe></dd>'+
			'</dl>'
		divobj.style.display="none";
		fobjs=divobj.getElementsByTagName("IFRAME");
		if(fobjs.length>0){
			fobj=fobjs[0];
		}
		document.getElementById(objid+"_CloseButton").onclick=SELF.Close;
		divobj.onclick=StopPropagation;
	}
	function StopPropagation(e){
		if(window.event){
			window.event.cancelBubble=true;
		}
		else{
			e.stopPropagation();
		}
	}
	SELF.Open=function(url){
		var scrollTop,scrollLeft,L,T;
		scrollTop=document.body.scrollTop;
		scrollTop=scrollTop!=0?scrollTop:document.documentElement.scrollTop;
		scrollLeft=document.body.scrollLeft;
		scrollLeft=scrollLeft!=0?scrollLeft:document.documentElement.scrollLeft;
		L=left==null?((document.documentElement.clientWidth-width)/2+scrollLeft):left;
		T=top==null?(document.documentElement.clientHeight-height)/2+scrollTop:top;
		L=L<0?0:L;
		T=T<0?0:T;
		if(divobj){
			divobj.style.left=L+"px";
		    divobj.style.top=T+"px";
			divobj.style.display="block";
			divobj.style.visibility="visible";
			if(fobj){
				if(url!==null){
					SELF.Url=url;
				}
			    fobj.src=SELF.Url;
			}
			Statu=1;
		}
	}
	SELF.Close=function(e){
		if(divobj){
			divobj.style.display="none";
			divobj.style.visibility="hidden";
			if(fobj){
			    fobj.src="";
			}
			Statu=0;
		}
	}
	Init()
}