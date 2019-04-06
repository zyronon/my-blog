import http from '../utils/http'
import {CONSTANT} from '../utils/const_var'

export default {

    index(data, params) {
        return http('category/index', data, params, CONSTANT.GET)
    },
    create(data, params) {
        return http('category/create', data, params, CONSTANT.POST)
    },
    edit(data, params) {
        return http('category/edit', data, params, CONSTANT.POST)
    },
    del(data, params) {
        return http('category/del', data, params, CONSTANT.GET)
    },
}
