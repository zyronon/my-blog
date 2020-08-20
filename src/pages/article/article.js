// import './article.html' //导入html，不然不会热更新
require('html-loader!./article.html')//导入html，不然不会热更新。注释掉上面的语法是因为，去掉了webpack.config.js里面的html-loader的配置。
// 只能用require了
import './article.scss'
import '../../components/header/header'


new Vue({
    el: '#article',
    data: {
        article: {}
    },
    created() {
        this.getData()
    },
    filters: {
        date(v) {
            return new Date(v * 1000).format("yyyy-MM-dd")
        }
    },
    methods: {
        getData() {
            let that = this
            $.ajax({
                // url: 'http://www.testblog.com/index.php/v1/article/previewDetail'+location.search,
                url: 'http://blogapi.ttentau.top/v1/article/previewDetail'+location.search,
                success(res) {
                    if (res.code === 0) {
                        that.article = res.data
                        console.log(that.article);
                    }
                }
            })
        }
    }
})
