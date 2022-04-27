import './index.html' //导入html，不然不会热更新
import './index.less'
import '../../components/header/header'
import {dateFormat, http} from "../../utils/common";
import config from "../../config";

Vue.createApp({
  data() {
    return {
      articles: [],
    }
  },
  created() {
    console.log(1)
    this.getData()
  },
  methods: {
    date(v) {
      return dateFormat(v * 1000, 'yyyy-MM-dd')
    },
    async getData() {
      let [ok, res] = await http(config.apiUrl + 'v1/article/select?limit=100000&offset=1')
      if (ok) {
        this.articles = res.data.list
      }
    }
  }
}).mount('#app')