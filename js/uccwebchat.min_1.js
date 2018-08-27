function withjQuery(t) {
    if (window.jQuery) t();
    else {
        var e = document.createElement("script");
        e.setAttribute("src", "http://apps.bdimg.com/libs/jquery/1.11.3/jquery.min.js"),
        e.setAttribute("type", "text/javascript"),
        document.getElementsByTagName("head")[0].appendChild(e);
        var i = !1;
        e.onreadystatechange = function() {
            i = !0,
            this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (t && "function" == typeof t && t(), e.onload = e.onreadystatechange = null)
        },
        i || (e.onload = function() {
            this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (t && "function" == typeof t && t(), e.onload = e.onreadystatechange = null)
        })
    }
}
function getBtn() {
    $("#imcc-iframe");
    var t = "";
    t += '<div style="position: fixed;',
    t += "right: 20px;",
    t += "bottom: 100px;",
    t += "width: 20px;",
    t += "padding: 10px;z-index:9999;",
    t += "border: 1px solid #ddd;",
    t += "cursor: pointer;",
    t += "text-align:center;",
    t += "color:#fff;",
    t += "background-color: #107df5;",
    t += 'border-radius: 1px;"',
    t += 'onclick="' + $("#imcc-iframe").data("function") + '">',
    t += "在线客服",
    t += "</div>",
    $("body").append(t)
}
function getMsg() {
    var t = "";
    t += '<div style="position: fixed;',
    t += "height: 550px;width: 360px;overflow: hidden;",
    t += "z-index: 9999;border-radius: 1px;",
    t += "-webkit-transform-origin: center bottom;",
    t += "transform-origin: center bottom;",
    t += "background:#fff;",
    t += "bottom:5px;right:75px;",
    t += "border:1px solid #ddd;",
    t += "display:none;",
    t += 'padding-top:30px;"',
    t += 'id="interject">',
    t += 34455,
    t += "</div>",
    $("body").append(t)
}
function getWebchat(t, e) {
    $("#interject").html("").slideDown();
    var params = $("#params").val();
    var i = "";
    i += '<div style="height:33px;',
    i += "background-color: #107df5;",
    i += "position: absolute;",
    i += "right: 0;",
    i += "top: 0;",
    i += "width:100%;",
    i += "box-sizing: border-box;",
    i += "text-align: center;",
    i += "color:#fff;",
    i += "line-height:30px;",
    i += "white-space: nowrap;",
    i += "overflow:hidden;",
    i += "text-overflow: ellipsis;",
    i += 'padding:0 30px;"',
    i += 'title="' + e + '">',
    i += e,
    i += '<span style="font-size:45px;',
    i += "position: absolute;",
    i += "right: 7px;",
    i += "top: 15px;",
    i += 'cursor: pointer;"',
    i += 'onclick="slideWebchat();">',
    i += "ˇ",
    i += "</span>",
    i += "</div>",
    i += '<div style="height:100%;overflow:hidden;">',
    i += '<iframe src="' + $("#imcc-iframe").data("url") + "&ht=" + t + "&params=" + params + '" width="100%" height="100%"></iframe>',
    i += "</div>",
    $("#interject").html(i)
}
function slideWebchat() {
    $("#interject").slideUp().html("")
}
withjQuery(function() {
    getMsg(),
    $("#imcc-iframe").data("btn") || getBtn()
});