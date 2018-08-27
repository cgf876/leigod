//判断是不是海外会员
function Isoverseas(num){
	var overseasId=[61684];
    if ($.inArray(num,overseasId)!=-1) {
    	return true;
    }else{
    	return false
    }
}

  //限定注册的函数
  function reglimit(id,minlength,maxlength,tipsId,tipType){
  	var reg1=new RegExp("(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{"+minlength+","+maxlength+"}");
  	var reg2=new RegExp("[@#\$%\^&\*\!\(\)]+","g");
  	if(reg2.test($(id).val())){
  		$(tipsId).html('不能包含非法字符');
  	}else if (!reg1.test($(id).val())) {
	    $(tipsId).html('请输入'+minlength+'-'+maxlength+'位字母+数字组合'+tipType);
	}else{
		 $(tipsId).html('');
	}
  }
  function mailLimit(id,tipsId){
	var mail=$(id).val();
	var re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.)[a-z0-9]+$/;
	if(!re.test(mail)){
		$(tipsId).html("请填写有效邮箱");
	}else{
		$(tipsId).html(" ")
	}
  }