   function checkSearch ( form2 )
{
	if ( form2.keyword.value == 'Search...' )
	{
		alert ("Please enter a keyword search!");
		form2.keyword.focus ();
		return false;
	}	
	if ( form2.keyword.value == '' )
	{
		alert ("Please enter a keyword search!");
		form2.keyword.focus ();
		return false;
	}	
}

document.writeln("<form method=\"post\" id=\"searchform\" name=\"form2\" class=\"search_input\"action=\"/en/search/\" onSubmit='return checkSearch(this)'>");
document.writeln("<input type=\"text\" value=\"Search...\" name=\"keyword\" class=\"myinput\" onclick=\"this.value='';\" onFocus=\"this.value=''\" onBlur=\"if (value ==''){value='Search...'}\" />");
document.writeln("<input type=\"image\" name=\"submit\" src=\"./images/search.gif\" align=\"absmiddle\" title=\"Search\" style=\"border-width:0px;float:left\"/>");
document.writeln("</form>");

