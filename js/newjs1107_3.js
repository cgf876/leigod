//切换
	$(function(){
		var count=$(".slides li").length;
		var $ul=$(".tab_box ul");
		var $ul_W=$(".slides li").outerWidth(true)*count;
		var $slide_w=$(".slides li").outerWidth(true);
		var $W=document.body.clientWidth;
		var n=1;
		$ul.width($ul_W);
		$ul.css('margin-left',($W-$slide_w)/2-$slide_w)
		
        //上一页
        $(".pre").click(function(){
        	$ul.find("li:last").prependTo($ul);
        	$ul.css({"margin-left":($W-$slide_w)/2-2*$slide_w})
            $ul.animate({'margin-left':($W-$slide_w)/2-$slide_w})
            if (n<=0) {
            	n=count-1;
            } else{
            	n--;
            }
            slideBtn()
        })
        
        //下一页
        $(".next").click(function(){
        	$ul.animate({'margin-left':($W-$slide_w)/2-2*$slide_w},function(){
			  	 $ul.find("li:first").appendTo($ul);
			     $ul.css({"margin-left":($W-$slide_w)/2-$slide_w})
			  })
        	if (n>=count-1) {
        		n=0
        	} else{
        		n++
        	}
        	slideBtn()
        })
         
         //热点
         function slideBtn(){
         	$(".tab_btn li").eq(n).addClass("active").siblings().removeClass("active");
         }
         
		//自动滑动
		var s=setInterval(function(){
			$(".next").click()
		},3000)
		

		// 悬停停止滑动
       $("#tab_box").hover(function(){
          clearInterval(s)
       },function(){
          s=setInterval(function(){
			$(".next").click()
		},3000)
       })

		//自适应屏幕
		window.onresize=function(){
			$("#tab_box ul").width($ul_W);
		    $W=$(window).width();
		    var $slide_w=$(".slides li").outerWidth(true);
			$ul.css('margin-left',($W-$slide_w)/2-$slide_w)
		}
	})