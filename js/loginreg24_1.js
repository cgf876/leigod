//关闭注册框
$(".new_close").click(function() {
	$(".new_loginbox").hide()
})

//切换登录注册
$(".new_login_tit li").click(function() {
	var n = $(this).index();
	$(this).addClass('on').siblings().removeClass('on');
	$(".new_login_con li").eq(n).show().siblings().hide();
})

//修改密码
//点击忘记密码
$("#forget").click(function() {
	$("#new_registBox").hide();
	$("#new_xiugai_mima").show()
	$(".xiugai_firstStep").show()
	$(".xiugai_secondStep").hide()
	$(".xiugai_step_tit li").eq(0).addClass('active').siblings().removeClass('active')
})
//点击返回登录
$("#back_login").click(function() {
	$("#new_registBox").show();
	$("#new_xiugai_mima").hide()
})

//去登录
$("#gotologin").click(function() {
	$(".new_login_con li").eq(0).show().siblings().hide();
	$(".new_login_tit li").eq(0).addClass("on").siblings().removeClass("on")
})
//顶部登录注册
$(".topLogin").click(function() {
	var nowUrl = window.location.href;
	var mainUrl1 = "www.leigod";
	var mainUrl2 = "http://leigod.cn/";
	if(nowUrl.indexOf(mainUrl1) != -1 || nowUrl.indexOf(mainUrl2) != -1) {
		gotourl('index_login.html')
	} else {
		$(".new_loginbox").show()
		$(".new_login_tit li").eq(0).addClass("on").siblings().removeClass("on")
		$(".new_login_con li").eq(0).show().siblings().hide()
		$("#new_xiugai_mima").hide()
		$("#new_registBox").show()
	}
})
$(".topReg").click(function() {
	var nowUrl = window.location.href;
	var mainUrl1 = "www.leigod";
	var mainUrl2 = "http://leigod.cn/";
	if(nowUrl.indexOf(mainUrl1) != -1 || nowUrl.indexOf(mainUrl2) != -1) {
		gotourl('index_reg.html')
	} else {
		$(".new_loginbox").show();
		$(".new_login_tit li").eq(1).addClass("on").siblings().removeClass("on")
		$(".new_login_con li").eq(1).show().siblings().hide()
		$("#new_xiugai_mima").hide()
		$("#new_registBox").show()
	}
})

//登录注册弹窗
$(function() {
	//同意会员服务条款
	$("#chaoji_agreeItems").change(function() {
		if($(this).is(':checked')) {
			$("#zhucenow").addClass("regBtnable")
		} else {
			$("#zhucenow").removeClass("regBtnable")
		}
	})

	$("#haiwai_agreeItems").change(function() {
		if($(this).is(':checked')) {
			$("#haiwai_zhucenow").addClass("regBtnable")
		} else {
			$("#haiwai_zhucenow").removeClass("regBtnable")
		}
	})

	//ajax验证超级会员手机号码
	$("#iphone").blur(function() {
		var iphone = $(this).val();
		var reg = /^1[3|5|4|6|7|8|9][0-9]\d{4,8}$/
		if(!(reg.test($(this).val()))) {
			$("#sendsmsbtn").attr("disabled", true)
			$("#iphoneMes").removeClass("red_cao").show().html("手机格式错误");
			return false;
		}

		$.ajax({
			type: "get",
			url: "default.aspx?op=docheckusername&username=" + document.getElementById("iphone").value,
			success: function(data) {
				if(data == "1") {
					$("#sendsmsbtn").attr("disabled", false)
					$("#iphoneMes").addClass("red_cao").html("账户可以使用").show()
				} else if(data == "0") {
					$("#iphoneMes").show().removeClass("red_cao").html("账户已注册");
					$("#sendsmsbtn").attr("disabled", true)
				} else {
					$("#sendsmsbtn").attr("disabled", true)
					$("#iphoneMes").removeClass("red_cao").show().html("手机格式错误");
				}
			}
		});

	})

	// ajax 提交超级会员注册表单
	$("#zhucenow").click(function() {
		if(!$(this).hasClass("regBtnable")) {
			return false
		}
		var groupid = $("#groupid").val(),
			nettype = $("#nettype").val(),
			return_url = $("#return_url").val(),
			password = $("#password").val(),
			checkcode = $("#checkcode").val(),
			smscode = $("#yzm").val(),
			title = $("#nicheng").val(),
			tel = $("#iphone").val(),
			ajax = $("#ajax").val(),
			username = $("#iphone").val();
		var reg = /^[a-zA-Z\d]+$/
		if(password == "") {
			alert("密码不能为空");
			return false;
		} else if(!reg.test(password)) {
			alert("密码包含非法字符");
			return false;
		} else if(password.length < 6 || password.length > 20) {
			alert("请输入6～20位字母数字组合的密码");
			return false;
		}

		$.ajax({
			type: "POST",
			url: "default.aspx?op=doreg",

			data: {
				groupid: groupid,
				nettype: nettype,
				ajax: ajax,
				password: password,
				checkcode: checkcode,
				smscode: smscode,
				title: title,
				tel: tel,
				username: username
			},

			success: function(data) {
				console.log(data)
				if(data.indexOf("IP拒绝访问") != -1) {
					alert("IP拒绝访问")
				} else if(data.indexOf("请选择要注册的产品类型") != -1) {
					alert("请选择要注册的产品类型")
				} else if(data.indexOf("您输入的验证码有误") != -1) {
					$("#txyzm").html("验证码不正确")
				} else if(data.indexOf("您输入的短信验证码有误") != -1) {
					$("#myTimesms").html("短信验证码错误")
				} else if(data.indexOf("您选择的用户组不存在") != -1) {
					alert("您选择的用户组不存在")
				} else if(data.indexOf("账号已经存在") != -1) {
					alert("账号已经存在")
				} else if(data.indexOf("6~20位英文数字组合") != -1) {
					alert("6~20位英文数字组合")
				} else if(data.indexOf("账号只能用6~20个英文字母或者数字") != -1) {
					alert("账号只能用6~20个英文字母或者数字")
				} else if(data.indexOf("您输入的手机号已经存在") != -1) {
					alert("您输入的手机号已经存在")
				} else if(data.indexOf("注册成功") != -1) {
					location.href="reg_success.html"
				}

			}
		});
	})

	// ajax 提交修改密码表单
	$("#xiugai-btn").click(function() {
		var tel = $("#xiugai_iphone").val(),
			checkcode = $("#xiugai_checkcode").val(),
			smscode = $("#xiugai_yzm").val(),
			username = $("#xiugai_iphone").val(),
			newpassword = $("#newpassword").val();
		var reg = /^[a-zA-Z\d]+$/
		if(newpassword == "") {
			alert("密码不能为空");
			return false;
		} else if(!reg.test(newpassword)) {
			alert("密码包含非法字符");
			return false;
		} else if(newpassword.length < 6 || newpassword.length > 20) {
			alert("请输入6～20位字母数字组合的密码");
			return false;
		}

		$.ajax({
			type: "POST",
			url: "default.aspx?op=dochangepasswordsms",
			data: {
				checkcode: checkcode,
				smscode: smscode,
				tel: tel,
				username: username,
				newpassword: newpassword
			},

			success: function(data) {
				if(data.indexOf("您输入的手机号不正确") != -1) {
					alert("您输入的手机号不正确")
				} else if(data.indexOf("请输入的短信验证码无效") != -1) {
					alert("请输入的短信验证码无效")
				} else if(data.indexOf("请输入6～20位字母数字组合的密码") != -1) {
					alert("请输入6～20位字母数字组合的密码")
				} else if(data.indexOf("您的密码已经成功修改") != -1) {
					$("#new_registBox").show();
					$("#new_xiugai_mima").hide();
					$(".new_xiugai_mima").find("input").attr("value", "")
					alert("您的密码已经成功修改")

				}
			}
		});
	})

	//登录
	$("#denglu").click(function() {
		var iphone5 = $("#iphone5").val();
		var password5 = $("#password5").val();
		if(iphone5 == "" || password5 == "") {
			alert("请填写账号和密码");
			return false;
		} else {
			submit()
		}
	})

	/*
	 * 分割线----------------------------------------------------------------------------
	 * 
	 * */
	//海外会员
	//账号限制

	//注册账号
	//  $("#haiwai_username").blur(function(){
	//   reglimit('#haiwai_username',1,20,'#haiwai_usernameMes',"账号")
	// })
	//注册密码
	$("#haiwai_password").blur(function() {
		reglimit('#haiwai_password', 6, 20, '#haiwai_passwordMes', "密码")
	})
	//邮箱限制 
	$("#haiwai_mail").blur(function() {
		mailLimit("#haiwai_mail", "#haiwai_mailMes")
	})

	//提示
	$(".forget_mail_tipslogo,.forget_mail_tips").hover(function() {
		$(".infomessage").show()
	}, function() {
		$(".infomessage").hide()
	})

	//注册会员海外和超级切换
	$(".huiyuan_type").on('click', 'li', function() {
		$(this).addClass('active').siblings().removeClass('active');
		var n = $(this).index();
		$(".huiyuan_fenbu").children('li').eq(n).show().siblings().hide();
		$(".regbtnBox").children('a').eq(n).show().siblings().hide();
	})

	//点击下一步
	$("#xiugai-next").click(function() {
		var username = $("#xiugai_firstStep_username").val();
		$("#xiugai_iphone").val(username)
		$.ajax({
			type: "post",
			url: "default.aspx?op=dogetusergroup",
			async: true,
			data: {
				username: username,
			},
			success: function(data) {
				console.log(data)
				console.log(Isoverseas(parseInt(data)))
				if(data == 0) {
					alert("账户不存在");
				} else if(Isoverseas(parseInt(data))) {
					$(".xiugai_firstStep").hide()
					$(".xiugai_secondStep").show()
					$(".xiugai_step_tit li").eq(1).addClass('active').siblings().removeClass('active')
					$(".xiugai_secondStep li").eq(1).show().siblings().hide()
				} else {
					$(".xiugai_firstStep").hide()
					$(".xiugai_secondStep").show()
					$(".xiugai_step_tit li").eq(1).addClass('active').siblings().removeClass('active')
					$(".xiugai_secondStep li").eq(0).show().siblings().hide()
				}
			}
		});
	})

	//注册发送邮件
	$(".sendsmail").click(function() {
		var mail = $("#haiwai_mail").val(),
			regcode = $("#haiwai_checkcode").val();
		$("#haiwai_mail").blur();
		if($("#haiwai_mail").val() == "") {
			$("#haiwai_mailMes").html("不能为空")
			return false;
		} else if($.trim($("#haiwai_mailMes").text()) != "") {
			// $("#haiwai_mailMes").html("请填写有效邮箱")
			return false;
		} else {
			$("#haiwai_mailMes").html("发送中...")
			$.ajax({
				type: "post",
				url: "default.aspx?op=dosendregmail",
				async: true,
				data: {
					mail: mail,
					regcode: regcode
				},
				success: function(data) {
					console.log(data)
					if(data == 9) {
						$("#haiwai_mailMes").html("图形验证码错误")
						var d = new Date();
						$("#haiwai_checkcodeimg").attr("src", "authcode.ashx?" + d.getTime());
					} else if(data == 10) {
						$("#haiwai_mailMes").html("邮箱不存在")
						var d = new Date();
						$("#haiwai_checkcodeimg").attr("src", "authcode.ashx?" + d.getTime());
					} else {
						$("#haiwai_mailMes").html("已发送")
					}
				}
			});
		}
	})

	//注册海外会员 

	// ajax 提交海外会员注册表单
	$("#haiwai_zhucenow").click(function() {
		if(!$(this).hasClass("regBtnable")) {
			return false
		}
		var title = $("#haiwai_nicheng").val(),
			ajax = 1,
			mailcode = $("#haiwai_reg_mailCode").val(),
			mail = $("#haiwai_mail").val(),
			password = $("#haiwai_password").val(),
			username = $("#haiwai_username").val(),
			groupid = 61684;
		if(password == "") {
			alert("密码不能为空");
			return false;
		}
		// reglimit('#haiwai_username',1,30,'#haiwai_usernameMes',"账号")
		reglimit('#haiwai_password', 6, 20, '#haiwai_passwordMes', "密码")
		// haiwai_usernameMes=$("#haiwai_usernameMes").text(),
		var haiwai_passwordMes = $("#haiwai_passwordMes").text();
		if(haiwai_passwordMes != "") {
			return false;
		}

		$.ajax({
			type: "POST",
			url: "default.aspx?op=doreg",
			data: {
				groupid: groupid,
				ajax: ajax,
				password: password,
				title: title,
				username: username,
				mail: mail,
				mailcode: mailcode
			},

			success: function(data) {
				console.log(data)
				if(data.indexOf("邮箱验证码有误") != -1) {
					alert("您输入的邮箱验证码有误")
				} else if(data.indexOf("您输入的邮箱已经存在") != -1) {
					alert("您输入的邮箱已经存在")
				} else if(data.indexOf("账号已经存在") != -1) {
					alert("账号已经存在")
				} else if(data.indexOf("您输入的验证码有误") != -1) {
					alert("您输入的验证码有误")
				} else if(data.indexOf("英文字母或者数字") != -1) {
					alert("账号只能用6~20个英文字母或者数字")
				} else if(data.indexOf("注册成功") != -1) {
					$("#new_succeed").show();
					$("#form_reg").hide();
				}
			}
		});
	})

	//海外会员修改密码

	//修改密码发送邮件
	$(".xiugai_sendsmail").click(function() {
		var mail = $("#haiwai_xiugai_mail1").val(),
			regcode = $("#haiwai_xiugai_checkcode1").val();
		if($("#haiwai_xiugai_mail1").val() == "") {
			$("#haiwai_xiugai_mailMes").html("不能为空")
			return false;
		} else {
			$("#haiwai_xiugai_mailMes").html("发送中...")
			$.ajax({
				type: "post",
				url: "default.aspx?op=dosendpwdmail",
				async: true,
				data: {
					mail: mail,
					regcode: regcode
				},
				success: function(data) {
					console.log(data)
					if(data == 9) {
						$("#haiwai_xiugai_mailMes").html("图形验证码错误")
						var d = new Date();
						$("#haiwai_xiugai_checkcodeimg").attr("src", "authcode.ashx?" + d.getTime());
					} else if(data == 10) {
						$("#haiwai_xiugai_mailMes").html("邮箱不存在")
						var d = new Date();
						$("#haiwai_xiugai_checkcodeimg").attr("src", "authcode.ashx?" + d.getTime());
					} else {
						$("#haiwai_xiugai_mailMes").html("已发送")
					}
				}
			});
		}

	})

	//提交按钮检查
	$("#haiwai_xiugai_btn").click(function() {
		var shortname = $("#xiugai_firstStep_username").val();
		$("#xiugai_haiwai_username").val(shortname);
		var passwordMes = $.trim($("#haiwai_newpasswordMes").text()),
			username = $("#xiugai_haiwai_username").val(),
			mail = $("#haiwai_xiugai_mail1").val(),
			mailcode = $("#haiwai_xiugai_mailcheckcode1").val(),
			ajax = 1,
			newpassword = $("#haiwai_newpassword1").val();
		console.log(username)
		if(username == "" || newpassword == "") {
			alert("请完善信息")
			return false;
		}
		$.ajax({
			type: "post",
			url: "default.aspx?op=dochangepasswordmail",
			async: true,
			data: {
				username: username,
				mail: mail,
				mailcode: mailcode,
				newpassword: newpassword,
				ajax: ajax
			},
			success: function(data) {
				if(data.indexOf("成功") != -1) {
					$(".new_xiugai_mima").find("input").attr("value", "")
					$("#new_registBox").show();
					$("#new_xiugai_mima").hide()
					alert(data);
				} else {
					alert(data)
				}

			}
		});

	})

	//刷新图形码
	$(".refreshcao").click(function() {
		var d = new Date();
		$("#xiugai_checkcodeimg").attr("src", "authcode.ashx?" + d.getTime());
		$("#checkcodeimg").attr("src", "authcode.ashx?" + d.getTime());
		$("#haiwai_xiugai_checkcodeimg").attr("src", "authcode.ashx?" + d.getTime());
		$("#haiwai_checkcodeimg").attr("src", "authcode.ashx?" + d.getTime());
	})

})