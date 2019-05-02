<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
        <el-button type="primary" class="w100  mt10p " @click="delAll()" v-if="messages.length">清空</el-button>
        <transition-group name="list" tag="div">
            <div class="message list-item" v-for="(item,index) in messages" :key="item.id">
                <i class="el-notification__icon el-icon-success" style="color: #67c23a;"></i>
                <div class="el-notification__group">
                    <h2 class="el-notification__title">{{item.title}}</h2>
                    <div class="el-notification__content">{{item.content}}</div>
                    <div class="el-notification__closeBtn el-icon-close" @click="remove(item.id)"></div>
                </div>
            </div>
        </transition-group>
    </el-scrollbar>
</template>

<script>

    import User from "../../api/user"

    export default {
        name: 'SidebarRight',
        created() {
            this.getMessages()
            this.initWebSocket()
        },
        computed: {
            messages() {
                return this.$store.state.messages
            }
        },
        methods: {
            initWebSocket() {
                let ws = new WebSocket( process.env.NODE_ENV === 'production'?this.$config.PRODUCT_WS_URL:this.$config.WS_URL)
                ws.onopen = function () {
                    ws.send('init')
                }
                ws.onmessage = (e) => {
                    this.getMessages()
                }
            },
            async getMessages() {
                let result = await User.messages({}, {})
                if (result.status === 1) {
                    this.$store.dispatch('addMessages', result.data)
                }
            },
            async remove(id) {
                let result = await User.delMsg({}, {id})
                if (result.status === 1) {
                    this.getMessages()
                }
            },
            async delAll() {
                let result = await User.delAll({}, {})
                if (result.status === 1) {
                    this.getMessages()
                }
            }
        },
        components: {},
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    .message {
        display: flex;
        position: relative;
        background: #fff;
        /*color: #000;*/
        margin: 10px 20px 10px 10px;
        padding: 14px 26px 14px 13px;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

        .el-icon-info {
            color: #909399;
        }
    }

    ul, span {
        color: #000;
    }

    .list-item {
        transition: all .3s;
    }

    .list-enter-active, .list-leave-active {
        transition: all .3s;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateX(230px);
    }

    .list-leave-active {
        position: absolute;
    }
</style>
