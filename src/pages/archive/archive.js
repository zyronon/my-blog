import './archive.html' //导入html，不然不会热更新
import './archive.less'
import '../../components/header/header'
import config from "../../config";
import {dateFormat, http} from "../../utils/common";


Vue.createApp({
  data() {
    return {
      list: []
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
      let [ok, res] = await http(config.apiUrl + 'v1/article/archive')
      if (ok) {
        this.list = res.data
      }
    }
  }
}).mount('#archive')
