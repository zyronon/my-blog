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
        <el-row class="mb0p">
            <el-table :data="tableData.rows" border stripe>
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="title" label="标题" sortable></el-table-column>
                <el-table-column prop="summary" label="摘要" sortable></el-table-column>
                <el-table-column prop="status" label="状态" sortable>
                    <template v-slot="scope">
                        {{scope.row.status|status}}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" sortable>
                    <template v-slot="scope">
                        {{scope.row.createTime|date}}
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" fixed="right" width="250">
                    <template v-slot="scope">
                        <el-button @click="look(scope.row)" type="primary" size="small">查看</el-button>
                        <el-button type="warning" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
    </div>
</template>

<script>
    import Article from '@/api/article'

    export default {
        name: "index",
        data() {
            return {
                searchDate: '',
                loading: false,
                query: {
                    offset: 0,
                    limit: 10,
                    searchData: {},
                    isSearch: false
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
            edit(row){
                this.$router.push({path: 'edit', query: {id: row.id}})
            },
            del(row) {
                this.$mConfirm(null, '是否要放入回收站?', async () => {
                    let res = await Article.trash({},{id: row.id})
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