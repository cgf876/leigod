$(function () {


    $(".top_nav ul li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");

    })


   
    $(".btn_tap ul li").click(function () {

        $(this).addClass("active").siblings().removeClass("active");

        var index = $(".btn_tap ul li").index(this);
        $(".banner_list_one").eq(index).show().siblings().hide();


    })


  


})