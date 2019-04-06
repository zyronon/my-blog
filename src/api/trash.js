import http from '../utils/http'
import {CONSTANT} from '../utils/const_var'

export default {

    index(data, params) {
        return http('trash/index', data, params, CONSTANT.GET)
    },
    restore(data, params) {
        return http('trash/restore', data, params, CONSTANT.GET)
    },
    del(data, params) {
        return http('trash/del', data, params, CONSTANT.GET)
    },
}
