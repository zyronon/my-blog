<template>
    <div class="profile-container">
        <el-row class="header">
            <el-col :sm="24" :lg="12" class="header-left">
                <div class="header-avatar">
                    <img class="h60p" :src="$api + 'static/image/' + user.avatar"/>
                </div>
                <div class="header-content">
                    <div class="title">
                        早上好 {{user.account}}
                    </div>
                    <p>描述：{{user.description}}</p>
                    <p>手机号：{{user.phone}}</p>
                    <p>性别：{{user.sex}}</p>
                    <p>邮箱：{{user.email}}</p>
                    <p>创建时间：{{user.createTime|date}}</p>
                    <p>登陆时间：{{user.loginTime|date}}</p>
                    <p>最后登陆时间：{{user.lastLoginTime|date}}</p>
                </div>
            </el-col>
            <el-col :sm="24" :lg="12">
                <div style="display: flex;align-items: center;">
                    <img class="h60p" :src="$api + 'static/image/' +config.avatar" alt="">
                    <div style="position: relative;margin-left: 20px;">
                        <el-button size="small" type="primary">修改头像</el-button>
                        <input @change="uploadFile($event)" type="file" style="position: absolute;left: 0;opacity: 0;">
                    </div>
                </div>
                <p>网站名称：
                    <span @click="edit.webSiteName=true" v-if="!edit.webSiteName">{{config.webSiteName}}</span>
                    <el-input @blur="submitConfig(edit.webSiteName = false)"
                              @keyup.enter.native="submitConfig(edit.webSiteName = false)"
                              v-else class="w150p" size="mini" v-model="config.webSiteName"
                              :placeholder="config.webSiteName"></el-input>
                </p>
                <p>博客名称：
                    <span @click="edit.blogName=true" v-if="!edit.blogName">{{config.blogName}}</span>
                    <el-input @blur="submitConfig(edit.blogName = false)"
                              @keyup.enter.native="submitConfig(edit.blogName = false)"
                              v-else class="w150p" size="mini" v-model="config.blogName"
                              :placeholder="config.webSiteName"></el-input>
                </p>
                <p>博客签名：
                    <span @click="edit.blogSignature=true" v-if="!edit.blogSignature">{{config.blogSignature}}</span>
                    <el-input @blur="submitConfig(edit.blogSignature = false)"
                              @keyup.enter.native="submitConfig(edit.blogSignature = false)"
                              v-else class="w150p" size="mini" v-model="config.blogSignature"
                              :placeholder="config.blogSignature"></el-input>
                </p>
                <p>博客描述：
                    <span @click="edit.blogDescription=true"
                          v-if="!edit.blogDescription">{{config. blogDescription}}</span>
                    <el-input @blur="submitConfig(edit.blogDescription = false)"
                              @keyup.enter.native="submitConfig(edit.blogDescription = false)"
                              v-else class="w150p" size="mini" v-model="config.blogDescription"
                              :placeholder="config.blogDescription"></el-input>
                </p>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import User from "../../api/user"

    export default {
        name: 'profile',
        data() {
            return {
                edit: {
                    webSiteName: false,
                    blogName: false,
                    blogSignature: false,
                    blogDescription: false,
                },
                config: {},
                user: this.$store.state.userInfo,
            }
        },
        created() {
            console.log('userInfo', this.$store.state.userInfo)
            this.getConfig()
        },
        methods: {
            async uploadFile(resop) {
                // return console.log(resop);
                let formData = new FormData()
                formData.append('file', resop.target.files[0])
                let res = await this.$upload(formData).catch(() => {
                    this.$warning('服务器异常')
                })
                if (res.status === 1) {
                    this.$success('文件上传成功')
                    this.config.avatar = res.data
                    this.submitConfig()
                } else {
                    this.$warning('文件上传失败')
                }
            },
            async submitConfig() {
                let result = await User.editConfig(this.config)
                if (result.status === 1) {
                    this.config = result.data
                } else {
                    this.$warning('修改失败')
                    this.getConfig()
                }
            },
            async getConfig() {
                let result = await User.config()
                if (result.status === 1) {
                    this.config = result.data
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .profile-container {
        background: #ffffff;
        padding: 20px;
    }
</style>
