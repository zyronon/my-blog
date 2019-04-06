export default {
    //时间转换器
    date(v) {
        if (!v) return ''
        return new Date(v * 1000).toLocaleString()
    },
    //为空判断
    $(v) {
        if (!v) return ''
        if (v === null) return ''
        if (v === undefined) return ''
    },

    //处理身份证信息，中间隐藏掉
    processIdNumber(v) {
        if (!v) return ''
        let start = v.substr(0, 6)
        let end = v.substr(14, 4)
        return start + ' **** **** ' + end
    },
    status(v) {
        switch (v) {
            case '0':
                return '正常'
            case '1':
                return '删除'
            case '2':
                return '隐藏'
            case 0:
                return '正常'
            case 1:
                return '删除'
            case 2:
                return '隐藏'
            default:
                return '未知'
        }
    },

}

