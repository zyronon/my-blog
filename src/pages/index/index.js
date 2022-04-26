import './index.html' //导入html，不然不会热更新
import './index.less'
import '../../components/header/header'
import config from '../../config'
import {createApp} from 'vue/dist/vue.esm-bundler'
import {dateFormat, http} from '../../utils/common'

createApp({
  data() {
    return {
      articles: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    date(v) {
      return dateFormat(v * 1000, 'yyyy-MM-dd')
    },
    async getData() {
      let that = this
      let [ok, res] = await http(config.apiUrl + 'v1/article/select?limit=100000&offset=1')
      if (ok) {
        that.articles = res.data.list
      }
    }
  }
}).mount('#app')
