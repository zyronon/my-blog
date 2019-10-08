<template>
    <div class="add-article" v-loading="loading">
        <el-row>
            <el-button type="primary"
                       icon="el-icon-arrow-left"
                       style="margin-bottom: 10px;"
                       @click="back()">
                返回
            </el-button>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{form.id?'编辑':'添加'}}文章</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="submit()">提交</el-button>
            </div>
            <el-form ref="form" :model="form" label-width="130px" label-position="left">
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
                            <el-select v-model="form.categoryId" placeholder="请选择">
                                <el-option
                                        v-for="item in categoryList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="标签:">
                            <el-select v-model="form.tags" multiple placeholder="请选择">
                                <el-option
                                        v-for="item in tagList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="是否可评论:">
                            <el-checkbox v-model="form.isCanComment"></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否置顶:">
                            <el-checkbox v-model="form.isTop"></el-checkbox>
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
                        <el-form-item label="Markdown编辑器:">
                            <el-switch v-model="form.isMarkdownEditor"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-show="form.isMarkdownEditor">
                    <el-col :span="24">
                        <mavon-editor ref='md'
                                      codeStyle="atom-one-dark"
                                      @imgAdd="$imgAdd"
                                      v-model="form.mdContent"
                                      style="max-height: 1200px;"/>
                    </el-col>
                </el-row>
                <el-row v-show="!form.isMarkdownEditor">
                    <el-col :span="24">
                        <div ref="editor" class="htmlEditor" style="text-align:left"></div>
                    </el-col>
                </el-row>
            </el-form>
            <el-row style="border-top: 1px solid gainsboro;padding-top: 20px;">
                <el-col :span="24">
                    <el-button
                            @click="submit()"
                            type="primary"
                            icon="el-icon-check"
                            style="margin-bottom: 10px;">提交
                    </el-button>
                    <el-button @click="preview()"
                               type="success"
                               icon="el-icon-check"
                               style="margin-bottom: 10px;">预览
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
    const E = window.wangEditor

    export default {
        name: 'CreateArticle',
        data() {
            return {
                loading: false,
                form: {
                    summary: '',
                    isCanComment: true,
                    isMarkdownEditor: true,
                },
                tagList: [],
                categoryList: [],
                editor: null,
            }
        },
        created() {
            if (this.$route.query.id) {
                this.form.id = this.$route.query.id
            }
            this.getData()
        },
        methods: {
            // 绑定@imgAdd event
            $imgAdd(pos, $file) {

                // 第一步.将图片上传到服务器.
                let formdata = new FormData();
                formdata.append('file', $file);
                this.$upload(formdata).then(r => {
                    // this.$refs.md.$img2Url(pos,r.data);
                    this.$refs.md.$img2Url(pos, this.$displayImg(r.data));
                })
            },
            back() {
                this.$router.go(-1)
            },
            async getData() {
                this.loading = false

                let res = await this.$api.article.tagAndCategoryList()
                if (res.code === this.CONSTANT.SUCCESS) {
                    this.tagList = res.data.tags
                    this.categoryList = res.data.categories
                }
                if (this.form.id) {
                    let article = await this.$api.article.editDetail({}, {id: this.form.id})
                    if (article.code === this.CONSTANT.SUCCESS) {
                        this.form = article.data
                        if (!this.form.isMarkdownEditor) {
                            this.editor.txt.html(this.form.htmlContent)
                        }
                    }
                }
                setTimeout(() => {
                    this.loading = false
                }, this.CONSTANT.DELAYTIME)
            },
            async submit() {
                if (this.form.isMarkdownEditor) {
                    this.form.htmlContent = this.$refs.md.d_render
                    if (!this.form.summary) {
                        if (this.form.mdContent.length > 150) {
                            this.form.summary = this.form.mdContent.substr(0, 150) + '...'
                        } else {
                            this.form.summary = this.form.mdContent
                        }
                    }
                } else {
                    this.form.htmlContent = this.editor.txt.html()
                    if (!this.form.summary) {
                        let text = this.editor.txt.text()
                        if (text.length > 150) {
                            this.form.summary = text.substr(0, 150) + '...'
                        } else {
                            this.form.summary = text
                        }
                    }
                }
                this.loading = false
                let res
                if (this.form.id) {
                    res = await this.$api.article.edit(this.form)
                } else {
                    res = await this.$api.article.create(this.form)
                }
                if (res.code === this.CONSTANT.SUCCESS) {
                    this.$success(res.msg)
                    setTimeout(() => {
                        this.back()
                    }, this.CONSTANT.DELAYTIME)
                } else {
                    this.$error(res.msg)
                }
                setTimeout(() => {
                    this.loading = false
                }, this.CONSTANT.DELAYTIME)
            },
            preview() {
                let printHtml = this.editor.txt.html()
                printHtml = `<div style = "font-family: 宋体,SimSun;line-height: 30px;margin-bottom: 0;">
                                ${printHtml}
                            </div>`
                const wind = window.open('', 'newwindow',
                    `height=1000, width=1000, toolbar=no, menubar=no, scrollbars=no,
                    resizable=no,location=no, status=no`)
                wind.document.body.innerHTML = printHtml
                wind.print()
            },
        },
        mounted() {
            let that = this
            this.editor = new E(this.$refs.editor)
            this.editor.customConfig.onchange = (html) => {
                this.editorContent = html
            }
            this.editor.customConfig.customUploadImg = function (files, insert) {
                console.log(files)
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法

                // 上传代码返回结果之后，将图片插入到编辑器中
                let formdata = new FormData();
                formdata.append('file', files[0]);
                that.$upload(formdata).then(r => {
                    // this.$refs.md.$img2Url(pos,r.data);
                    insert(that.$displayImg(r.data))
                })
            }
            this.editor.create()

            let edit = document.querySelector('.w-e-text-container')
            edit.style = 'border:1px solid #ccc; border-top:none; z-index:10000;min-height: 500px ;'
        },
    }
</script>

<style scoped lang="scss">
</style>
