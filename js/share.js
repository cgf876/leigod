(function ($) {
     $.fn.share = function (options) {
        var settings = {
            text: '',
            url:''
        };
        if (options) {
            $.extend(settings, options);
        }
     window._bd_share_config = {
        common : {
            bdText:settings.text,
            bdUrl:setting.url
        },
        share : [{
            "bdSize" : 16
        }],
    }
}
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='https://static.leigod.cn/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
})(jQuery)