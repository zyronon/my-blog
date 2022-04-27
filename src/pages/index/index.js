// import './article.html' //导入html，不然不会热更新
require('html-loader!./index.html')//导入html，不然不会热更新。注释掉上面的语法是因为，去掉了webpack.config.js里面的html-loader的配置。
// 只能用require了
import './index.less'
import '../../components/header/header'
import config from '../../config'

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
        url: config.apiUrl + 'v1/article/select?limit=100000&offset=1',
        success(res) {
          if (res.code === 200) {
            that.articles = res.data.list
            console.log(that.articles);
          }
        }
      })
    }
  }
})
