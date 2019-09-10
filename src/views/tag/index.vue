<template>
    <div class="all-list" v-loading="loading">
        <el-card class="mt20p">
            <div class="d-flex justify-content-between align-items-center">
                <span>共有{{tableData.count}}条数据</span>
                <div>
                    <el-button type="info" icon="el-icon-refresh" @click="getData()"></el-button>
                    <el-button
                            type="primary"
                            icon="el-icon-circle-plus-outline"
                            @click="$router.push('create')"
                    >新建
                    </el-button>
                    <el-button type="primary" :disabled="!multipleSelection.length" icon="el-icon-delete" @click="delMore()">删除</el-button>
                </div>
            </div>
            <el-table :data="tableData.list" border stripe class="mt20p" @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="名称" min-width="100"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" min-width="100">
                    <template v-slot="scope">{{scope.row.createTime|dateDay}}</template>
                </el-table-column>
                <el-table-column prop label="操作" align="center" fixed="right" min-width="200">
                    <template v-slot="scope">
                        <el-button
                                @click="$router.push({path:'create',query:{id:scope.row.id}})"
                                type="primary"
                                icon="el-icon-edit"
                                size="small"
                        >编辑
                        </el-button>
                        <el-button type="primary" icon="el-icon-delete" size="small" @click="del(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="table-bottom mt20p" v-if="tableData.count !== 0">
                <el-pagination
                        class="pull-right"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="offset"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData.count"
                ></el-pagination>
            </el-row>
        </el-card>
    </div>
</template>
<script>
    export default {
        name: 'index',
        data() {
            return {
                loading: false,
                multipleSelection: [],
                searchData: {},
                tableData: {
                    list: [],
                    count: 0
                },
                offset: 1,
                limit: 10,
                isSearch: false
            }
        },
        created() {
            this.getData()
        },
        methods: {
            // 搜索
            search() {
                this.isSearch = true
                this.searchData.limit = this.limit = 10
                this.searchData.offset = this.offset = 1
                this.getData()
            },
            // 重置
            reset() {
                this.isSearch = false
                this.searchData = {}
                this.searchDate = []
                this.limit = 10
                this.offset = 1
                this.getData()
            },
            async getData() {
                this.loading = true
                let params = {}
                if (!this.isSearch) {
                    params.limit = this.limit
                    params.offset = this.offset
                } else {
                    this.searchData.limit = this.limit
                    this.searchData.offset = this.offset
                    params = this.searchData
                }
                let res = await this.$api.tag.select({}, params)
                if (res.code === '000000') {
                    this.tableData.list = res.data.list
                    this.tableData.count  = res.data.count
                    // console.log(res.data.list)
                }
                setTimeout(() => {
                    this.loading = false
                }, this.CONSTANT.DELAYTIME)
            },
            // 页条目改变事件
            handleSizeChange(val) {
                this.limit = val
                this.getData()
            },
            // 页码改变事件
            handleCurrentChange(val) {
                this.offset = val
                this.getData()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            del(row) {
                this.$mConfirm('', '此操作将永久删除该文件, 是否继续?',async () => {
                    let res = await this.$api.tag.del({},{id:row.id})
                    if (res.code === '000000') {
                        this.$success(res.msg)
                        this.getData()
                    }else{
                        this.$error(res.msg)
                    }
                })
            },
            delMore(row) {
                this.$mConfirm('', '此操作将永久删除该文件, 是否继续?',async () => {
                    let res = await this.$api.tag.delMore(this.multipleSelection);
                    if (res.code === '000000') {
                        this.$success(res.msg)
                        this.getData()
                    }else{
                        this.$error(res.msg)
                    }
                })
            }
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
