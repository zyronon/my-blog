// import './article.html' //导入html，不然不会热更新
require('html-loader!./archive.html')//导入html，不然不会热更新。注释掉上面的语法是因为，去掉了webpack.config.js里面的html-loader的配置。
// 只能用require了
import './archive.less'
import '../../components/header/header'
import config from '../../config'


new Vue({
  el: '#archive',
  data: {
    list: {}
  },
  created() {
    this.getData()
  },
  filters: {
    date(v, arg) {
      return new Date(v * 1000).format(arg ? arg : "yyyy-MM-dd")
    }
  },
  methods: {
    getData() {
      let that = this
      $.ajax({
        url: config.apiUrl + 'v1/article/archive',
        success(res) {
          if (res.code === 200) {
            that.list = res.data
          }
        }
      })
    }
  }
})
