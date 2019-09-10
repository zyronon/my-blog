<template>
    <div class="article-detail" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>文章详情</span>
            </div>
            <el-row>
                <el-col :span="24" class>
                    <label for>标题：</label>
                    <span>{{form.title}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" class="mt20p">
                    <label for>作者：</label>
                    <span>{{form.author}}</span>
                </el-col>
                <el-col :span="8" class="mt20p">
                    <label for>分类：</label>
                    <span>{{form.categoryName}}</span>
                </el-col>
                <el-col :span="8" class="mt20p">
                    <label for>标签：</label>
                    <span>{{form.tags|tags}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8" class="mt20p">
                    <label for>是否可评论：</label>
                    <span>{{form.isCanComment|bool}}</span>
                </el-col>
                <el-col :span="8" class="mt20p">
                    <label for>是否置顶：</label>
                    <span>{{form.isTop|bool}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="mt20p">
                    <label for>简介：</label>
                    <span>{{form.summary}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="mt20p">
                    <label for>状态：</label>
                    <span>{{form.status|articleStatus}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="mt20p">
                    <label for>内容：</label>
                    <p v-if="form.isMarkdownEditor" v-html="form.mdContent"></p>
                    <p v-else v-html="form.htmlContent"></p>
                </el-col>
            </el-row>
            <el-row class="tac mt20p" style="border-top: 1px solid gainsboro;padding-top: 20px;">
                <el-col :span="24">
                    <el-button
                            type="primary"
                            icon="el-icon-arrow-left"
                            style="margin-bottom: 10px;"
                            @click="$router.go(-1)"
                    >返回
                    </el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'ArticleDetail',
        data() {
            return {
                loading:false,
                form:{}
            }
        },
        created() {
            if (this.$route.query.id) {
                this.form.id = this.$route.query.id
                this.getData()
            }
        },
        methods: {
            async getData() {
                this.loading = false
                let article = await this.$api.article.previewDetail({},{id:this.form.id})
                if (article.code === this.CONSTANT.SUCCESS) {
                    this.form = article.data
                }
                setTimeout(() => {
                    this.loading = false
                }, this.CONSTANT.DELAYTIME)
            },
        },
        mounted() {
        }
    }
</script>

<style scoped>
</style>
