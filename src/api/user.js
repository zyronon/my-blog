import http from '../utils/http'
import {CONSTANT} from '../utils/const_var'

export default {

    login(data, params) {
        return http('user/login', data, params, CONSTANT.POST)
    },
    messages(data, params) {
        return http('message/index', data, params, CONSTANT.GET)
    },
    delMsg(data, params) {
        return http('message/del', data || {}, params || {}, CONSTANT.GET)
    }
}
