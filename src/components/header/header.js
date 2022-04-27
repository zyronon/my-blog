import './header.less'
require('html-loader!./header.html')//导入html，不然不会热更新。

if (document.readyState !== 'loading') {
    onload()
} else {
    document.addEventListener('DOMContentLoaded', onload)
}
function onload() {
    let spans = document.querySelectorAll('.animated')
    spans.forEach(v => {
        v.addEventListener('mouseenter', function () {
            v.classList.add('bounce')
            v.addEventListener('animationend', function () {
                v.classList.remove('bounce')
            })
        })
    })
}



Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
