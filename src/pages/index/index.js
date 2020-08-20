// import './article.html' //导入html，不然不会热更新
require('html-loader!./index.html')//导入html，不然不会热更新。注释掉上面的语法是因为，去掉了webpack.config.js里面的html-loader的配置。
// 只能用require了
import './index.scss'
import '../../components/header/header'

new Vue({
    el: '#app',
    data: {
        articles: []
    },
    created() {
        this.getData()
    },
    filters: {
        date(v) {
            return new Date(v * 1000).format("yyyy-MM-dd")
            // return new Date(v * 1000).format("yyyy-MM-dd hh:mm:ss")
        }
    },
    methods: {
        getData() {
            let that = this
            $.ajax({
                // url: 'http://www.testblog.com/index.php/v1/article/select?limit=10&offset=1',
                url: 'http://blogapi.ttentau.top/v1/article/select?limit=10&offset=1',
                success(res) {
                    if (res.code === 0) {
                        that.articles = res.data.list
                        console.log(that.articles);
                    }
                }
            })
        }
    }
})
