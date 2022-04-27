import './article.html' //导入html，不然不会热更新
import './article.less'
import '../../components/header/header'
import config from "../../config";
import {dateFormat, http} from "../../utils/common";

Vue.createApp({
  data() {
    return {
      article: {}
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
      let [ok, res] = await http(config.apiUrl + '/v1/article/previewDetail' + location.search)
      if (ok) {
        this.article = res.data
      }
    }
  }
}).mount('#article')

