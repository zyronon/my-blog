import CONSTANT from '../utils/const_var'
import request from '../utils/http'

export default {
    select(data,params){
        return request('article/select', data, params, CONSTANT.GET)
    },
}
