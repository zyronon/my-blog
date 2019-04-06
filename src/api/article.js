import http from '../utils/http'
import {CONSTANT} from '../utils/const_var'

export default {

    index(data, params) {
        return http('article/index', data, params, CONSTANT.GET)
    },
    show(data, params) {
        return http('article/show', data, params, CONSTANT.GET)
    },
    create(data, params) {
        return http('article/create', data, params, CONSTANT.POST)
    },
    one(data, params) {
        return http('article/one', data, params, CONSTANT.GET)
    },
    edit(data, params) {
        return http('article/edit', data, params, CONSTANT.POST)
    },
    trash(data, params) {
        return http('article/trash', data, params, CONSTANT.GET)
    },
}
