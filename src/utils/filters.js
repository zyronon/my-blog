import dayjs from 'dayjs'
import {isEmpty} from "element-ui/src/utils/util"

export default {
    // 时间转换器
    date(v) {
        if (!v) return ''
        if (typeof v === 'number') {
            const temp = `${v}`
            if (temp.length === 10) {
                return dayjs.unix(v).format('YYYY-MM-DD HH:mm:ss')
            }
            return dayjs(v).format('YYYY-MM-DD HH:mm:ss')
        }
        if (typeof v === 'string') {
            if (v.length === 10) {
                return dayjs.unix(parseInt(v, 10)).format('YYYY-MM-DD HH:mm:ss')
            }
            return dayjs(parseInt(v, 10)).format('YYYY-MM-DD HH:mm:ss')
        }
        return dayjs(v).format('YYYY-MM-DD HH:mm:ss')
    },
    dateDay(v) {
        if (!v) return ''
        if (typeof v === 'number') {
            let temp = v + ''
            if (temp.length === 10) {
                return dayjs.unix(v).format('YYYY-MM-DD')
            } else {
                return dayjs(v).format('YYYY-MM-DD')
            }
        }
        if (typeof v === 'string') {
            if (v.length === 10) {
                return dayjs.unix(parseInt(v)).format('YYYY-MM-DD')
            } else {
                return dayjs(parseInt(v)).format('YYYY-MM-DD')
            }
        }
        return dayjs(v).format('YYYY-MM-DD')
    },
    dateClock(v) {
        if (!v) return ''
        if (typeof v === 'number') {
            let temp = v + ''
            if (temp.length === 10) {
                return dayjs.unix(v).format('HH:mm:ss')
            } else {
                return dayjs(v).format('HH:mm:ss')
            }
        }
        if (typeof v === 'string') {
            if (v.length === 10) {
                return dayjs.unix(parseInt(v)).format('HH:mm:ss')
            } else {
                return dayjs(parseInt(v)).format('HH:mm:ss')
            }
        }
        return dayjs(v).format('HH:mm:ss')
    },
    // 为空判断
    $(v) {
        if (!v) return ''
        if (v === null) return ''
        if (v === undefined) return ''
        return ''
    },
    tags(v) {
        if (isEmpty(v)) return ''
        return  v.map(r=>r.name).join(',')
    },
    bool(v){
       return v?'是':'否'
    },
    articleStatus(v){
        switch (v) {
            case 0:return '正常'
            case 1:return '删除'
        }
    },
    // 处理身份证信息，中间隐藏掉
    processIdNumber(v) {
        if (!v) return ''
        const start = v.substr(0, 6)
        const end = v.substr(14, 4)
        return `${start} **** **** ${end}`
    },
}
