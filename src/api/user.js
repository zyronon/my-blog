import http from '../utils/http'
import {CONSTANT} from '../utils/const_var'

export default {

    login(data, params) {
        return http('user/login', data, params, CONSTANT.POST)
    },
}
