<template>
    <div class="add-article">
        <el-row>
            <el-button type="primary" icon="el-icon-arrow-left" style="margin-bottom: 10px;" @click="$router.go(-1)">
                返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加文章</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="submit()">提交</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="120px" label-position="left">
                <el-form-item label="标题:">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-row :gutter="40">
                    <el-col :span="8">
                        <el-form-item label="作者:">
                            <el-input v-model="form.author"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" >
                        <el-form-item label="分类:">
                            <el-select class="w100" v-model="form.categoryId" placeholder="请选择">
                                <el-option
                                        v-for="item in categories"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8"  >
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
    import Category from '@/api/category'

    export default {
        name: "CreateArticle",
        data() {
            return {
                form: {},
                editor: null,
                categories:[]
            }
        },
        mounted() {
            this.editor = new E(this.$refs.editor)
            this.editor.create()
        },
        created(){
            this.getCategory()
        },
        methods: {
            async getCategory() {
                let res = await Category.index({}, {})
                if (res.status === 1) {
                    this.categories = res.data.list
                } else {
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
                this.form.summary =  this.editor.txt.text().substr(0,150)+'...'
                console.log(this.form)
                let res = await Article.create(this.form)
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