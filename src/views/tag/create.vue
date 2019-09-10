<template>
    <div class="add-tag" v-loading="loading">
        <el-row>
            <el-button type="primary"
                       icon="el-icon-arrow-left"
                       style="margin-bottom: 10px;"
                       @click="$router.go(-1)">
                返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{form.id?'编辑':'添加'}}标签</span>
                <el-button style="float: right; padding: 3px 0" type="text">提交</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="120px" label-position="left">
                <el-form-item label="名字:">
                    <el-input v-model="form.name" 　placeholder="请输入名字"></el-input>
                </el-form-item>
            </el-form>
            <el-row style="border-top: 1px solid gainsboro;padding-top: 20px;">
                <el-col :span="24">
                    <el-button
                            @click="submit()"
                            type="primary"
                            icon="el-icon-check"
                            style="margin-bottom: 10px;">提交
                    </el-button>
                    　
                    <el-button type="danger"
                               icon="el-icon-delete"
                               style="margin-bottom: 10px;">重置
                    </el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'CreateArticle',
        data() {
            return {
                loading: false,
                form: {},
            }
        },
        created() {
            if (this.$route.query.id) {
                this.form.id = this.$route.query.id
                this.getData()
            }
        },
        methods: {
            back() {
                this.$router.back()
            },
            async getData() {
                this.loading = true
                let res = await this.$api.tag.detail({}, {id: this.form.id})
                if (res.code === '000000') {
                    this.form = res.data
                } else {
                    this.$warning(res.msg)
                }
                setTimeout(() => {
                    this.loading = false
                }, this.CONSTANT.DELAYTIME)
            },
            async submit() {
                this.loading = true
                let res
                if (this.form.id){
                     res = await this.$api.tag.edit(this.form)
                }else {
                     res = await this.$api.tag.create(this.form)
                }
                if (res.code === '000000') {
                    this.$success(res.msg)
                    this.back()
                } else {
                    this.$warning(res.msg)
                }
                setTimeout(() => {
                    this.loading = false
                }, this.CONSTANT.DELAYTIME)
            },
        }
    }
</script>

<style scoped>

</style>
