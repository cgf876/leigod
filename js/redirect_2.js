var g_domain2='user.leigod.com';
var g_domain1='user2.leigod.com';
var g_noregdomain1='www.leigod.cn';
var g_noregdomain2='leigod.cn';
var g_noregdomain3='www.leigod.com';

var g_init= 0;
var g_filename=location.href;
var g_file=g_filename.substr(g_filename.lastIndexOf('/')+1);  
var g_domain = window.location.host;

if(g_domain==g_noregdomain1 || g_domain==g_noregdomain2 || g_domain==g_noregdomain3)
{
	var file=g_filename.substr(g_filename.lastIndexOf('/')+1);  
	if(file=="reg.html" || file=="jfcj.html" || file=="catbuy.html"  || file=="forget.html"  || file=="shownews.html"  || file=="loginbox.html" )
	{
		gotourl(file);
	}
}

function callback(data)
{
	g_init=1;
};

//跳转到指定文件
function gotourl(fname)
{
	g_file=fname;
	//alert(g_file);
	//当前域名已经是用户域名，直接跳转
	if(g_noregdomain1!=g_domain && g_noregdomain2!=g_domain && g_noregdomain3!=g_domain)
	{
		location.href=fname;
		return;
	}
	
  var url="http://" + g_domain1 + '/jsonp.html';
  var url1="http://" + g_domain1 + '/' + g_file;
  var url2="http://" + g_domain2 + '/' + g_file;
  
   $.ajax({
     url:url,
	timeout:500,
     dataType:'jsonp',
     processData: false, 
     type:'get',
 	error: function (XMLHttpRequest, textStatus){},
     complete:function(XMLHttpRequest, textStatus) {
        if(g_init==1)
	location.href=url1;
	else
	location.href=url2;
	
     }});
  

	setTimeout("location.href=" + url1, 3000);	

}
 
