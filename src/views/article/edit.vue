<template>
    <div class="add-article">
        <el-row>
            <el-button type="primary" icon="el-icon-arrow-left" style="margin-bottom: 10px;" @click="$router.go(-1)">
                返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改文章</span>
                <el-button style="float: right; padding: 3px 0" type="text">提交</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="120px" label-position="left">
                <el-form-item label="标题:">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="作者:">
                            <el-input v-model="form.author"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="分类:">
                            <el-input v-model="form.categoryId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="标签:">
                            <el-input v-model="form.tagId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="是否显示:">
                            <el-checkbox v-model="form.status">隐藏</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="摘要:">
                            <el-input
                                    type="textarea"
                                    autosize
                                    placeholder="请输入内容"
                                    v-model="form.summary">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div ref="editor" style="text-align:left"></div>
                    </el-col>
                </el-row>
            </el-form>
            <el-row style="border-top: 1px solid gainsboro;padding-top: 20px;">
                <el-col :span="24">
                    <el-button type="primary" icon="el-icon-check" style="margin-bottom: 10px;" @click="submit()">提交
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" style="margin-bottom: 10px;" @click="reset()">重置
                    </el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import E from 'wangeditor'
    import Article from '@/api/article'


    export default {
        name: "CreateArticle",
        data() {
            return {
                form: {},
                editor: null,
            }
        },
        mounted() {
            this.editor = new E(this.$refs.editor)
            this.editor.create()
        },
        created(){
              this.getData()
        },
        methods: {
            async getData(){
                console.log()
                let res = await Article.one({},{id:this.$route.query.id})
                if (res.status === 1) {
                    this.form = res.data.list
                    this.editor.txt.html(this.form.content)
                    if (this.form.status === 2) {
                        this.form.status = true
                    }else {
                        this.form.status = false
                    }
                }else {
                    this.$error(res.msg)
                }
            },
            async submit() {
                if (this.form.status) {
                    this.form.status = 2
                } else {
                    this.form.status = 0
                }
                if (this.editor.txt.text() === '') return this.$warning('内容不能为空')
                this.form.content = this.editor.txt.html()
                let res = await Article.edit(this.form)
                if (res.status === 1) {
                    this.$success(res.msg)
                }else {
                    this.$error(res.msg)
                }
            },
            reset() {
                this.form = {}
            }
        }
    }
</script>

<style scoped>

</style>