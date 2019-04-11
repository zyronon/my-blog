<template>
    <div class="all-list" v-loading="loading">
        <el-row type="flex" justify="space-between">
            <div>
                <el-button type="info" icon="el-icon-refresh" @click="getData()"></el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline"
                           @click="$router.push('create')">新建
                </el-button>
                <el-button type="danger" icon="el-icon-delete" @click="del(rows)">删除</el-button>
                <el-input v-model="query.searchData.title" placeholder="标题" class="w200p ml10p"></el-input>
                <el-date-picker class="w300p ml10p"
                                v-model="searchDate"
                                type="daterange"
                                align="right"
                                format="yyyy-MM-dd"
                                value-format="timestamp"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search" class="ml10p" @click="search()">搜索</el-button>
                <el-button type="primary" icon="el-icon-refresh"
                           @click="reset()">重置
                </el-button>
            </div>
            <div>
                <!--                <el-select v-model="value4" clearable placeholder="请选择" style="margin-left: 10px;">-->
                <!--                    <el-option-->
                <!--                            v-for="item in options"-->
                <!--                            :key="item.value"-->
                <!--                            :label="item.label"-->
                <!--                            :value="item.value">-->
                <!--                    </el-option>-->
                <!--                </el-select>-->
            </div>
        </el-row>
        <el-row class="mb0p" :gutter="20">
            <el-col :span="4">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>分类</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible=true">添加
                        </el-button>
                    </div>
                    <el-table :data="categorys.rows" border stripe @cell-click="chooseCate">
                        <el-table-column prop="name" label="名称"></el-table-column>
                        <el-table-column prop=""  label="操作" fixed="right" >
                            <template v-slot="scope">
                                <el-button type="warning" size="small" @click="editCate(scope.row)">编辑</el-button>
                                <el-button type="danger" size="small" @click="delCate(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="20">
                <el-table :data="tableData.rows" border stripe>
                    <el-table-column prop="title" label="标题" min-width="200 "></el-table-column>
                    <el-table-column prop="summary" label="摘要" min-width="350"></el-table-column>
                    <el-table-column prop="clickCount" label="点击数" ></el-table-column>
                    <el-table-column prop="categoryName" label="分类">
                        <template v-slot="scope">
                            {{scope.row.category.name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template v-slot="scope">
                            {{scope.row.status|status}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" sortable>
                        <template v-slot="scope">
                            {{scope.row.createTime|date}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" sortable>
                        <template v-slot="scope">
                            {{scope.row.updateTime|date}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" align="center"  fixed="right" width="250">
                        <template v-slot="scope">
                            <el-button @click="look(scope.row)" type="primary" size="small">查看</el-button>
                            <el-button type="warning" size="small" @click="edit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="table-bottom mt10p" v-if="tableData.count !== 0">
            <el-pagination class="pull-right"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="query.offset"
                           :page-sizes="[10, 20, 30, 40]"
                           :page-size="query.limit"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="tableData.count">
            </el-pagination>
        </el-row>


        <el-dialog title="添加分类" :visible.sync="dialogVisible" width="25%">
            <el-form ref="form" :model="form" label-width="120px" label-position="left">
                <el-form-item label="标题:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitCate()">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    import Article from '@/api/article'
    import Category from '@/api/category'

    export default {
        name: "index",
        data() {
            return {
                dialogVisible: false,
                searchDate: '',
                loading: false,
                query: {
                    offset: 0,
                    limit: 10,
                    searchData: {},
                    isSearch: false
                },
                form: {},
                categorys: {
                    count: 0,
                    rows: []
                },
                tableData: {
                    count: 0,
                    rows: []
                },
                pickerOptions: this.$CONSTANT.PICKEROPTIONS
            }
        },
        created() {
            this.getData()
            this.getCategory()
        },
        watch: {
            'searchDate': function (newValue) {
                if (newValue && newValue.length > 0) {
                    this.query.searchData.minCreateTime = newValue[0]
                    this.query.searchData.maxCreateTime = newValue[1]
                }
            }
        },
        methods: {
            //历史查询条件、页码
            historyQuery(start = true) {
                if (start) {
                    if (this.$store.state.historyQuery.has(this.$route.path)) {
                        this.query = this.$store.state.historyQuery.get(this.$route.path)
                    }
                } else {
                    this.$store.dispatch('addHistoryQuery', {path: this.$route.path, params: this.query})
                }
            },
            look(row) {
                this.$router.push({path: 'edit', query: {id: row.id}})
            },
            edit(row) {
                this.$router.push({path: 'edit', query: {id: row.id}})
            },
            del(row) {
                this.$mConfirm(null, '是否要放入回收站?', async () => {
                    let res = await Article.trash({}, {id: row.id})
                    if (res.status === 1) {
                        this.$success(res.msg)
                        this.getData()
                    } else {
                        this.$error(res.msg)
                    }
                })
            },
            search() {
                this.query.isSearch = true
                this.query.searchData.limit = this.query.limit = 10
                this.query.searchData.offset = this.query.offset = 0
                this.getData()
            },
            reset() {
                this.searchDate = ''
                this.query.isSearch = false
                this.query.searchData = {}
                this.query.limit = 10
                this.query.offset = 0
                this.getData()
            },
            async getData() {
                this.historyQuery(false)
                this.loading = true
                let params = {}
                if (!this.query.isSearch) {
                    params.limit = this.query.limit
                    params.offset = this.query.offset
                } else {
                    this.query.searchData.limit = this.query.limit
                    this.query.searchData.offset = this.query.offset
                    params = this.query.searchData
                }
                let res = await Article.index({}, params)
                if (res.status === 1) {
                    this.tableData.rows = res.data.list
                    this.tableData.count = res.data.count
                    // console.log(res)
                } else {
                    this.$error(res.msg)
                }
                setTimeout(() => {
                    this.loading = false
                }, this.$CONSTANT.DELAYTIME)
            },
            async getCategory() {
                let res = await Category.index({}, {})
                if (res.status === 1) {
                    this.categorys.rows = res.data.list
                } else {
                    this.$error(res.msg)
                }
            },
            async submitCate() {
                let res
                if (this.form.id === undefined) {
                    res = await Category.create(this.form, {})
                }else {
                    res = await Category.edit(this.form, {})
                }
                if (res.status === 1) {
                    this.$success(res.msg)
                    this.getCategory()
                } else {
                    this.$error(res.msg)
                }
                this.dialogVisible = false
            },
            editCate(row){
                this.form = row
                this.dialogVisible = true
            },
            delCate(row){
                this.$mConfirm(null, '是否删除这条数据?', async () => {
                    let res = await Category.del({}, {id: row.id})
                    if (res.status === 1) {
                        this.$success(res.msg)
                        this.getCategory()
                    } else {
                        this.$error(res.msg)
                    }
                })
            },
            //选中分类
            chooseCate(row){
                console.log(row)
                this.query.searchData.categoryId = row.id
                this.search()
            },
            //页条目改变事件
            handleSizeChange(val) {
                this.query.offset = val
                this.getData()
            },
            //页码改变事件
            handleCurrentChange(val) {
                this.query.offset = val
                this.getData()
            },
        }
    }
</script>


<style scoped lang="scss">
    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
