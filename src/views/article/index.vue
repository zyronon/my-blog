<template>
  <div class="all-list" v-loading="loading">
    <el-card :body-style="{ 'padding-top': '6px' }">
      <div slot="header">文章列表</div>
      <div class="d-flex flex-wrap-wrap">
        <div>
          <label>文章名称</label>
          <el-input
              v-model="searchData.title"
              placeholder="文章名称"
              class="mt14p ml10p mr20p w200p"
          ></el-input>
        </div>
        <!--                <div>-->
        <!--                    <label>日期</label>-->
        <!--                    <el-date-picker-->
        <!--                            class="w300p mt14p ml10p mr20p"-->
        <!--                            v-model="searchDate"-->
        <!--                            type="daterange"-->
        <!--                            size="medium"-->
        <!--                            align="right"-->
        <!--                            format="yyyy-MM-dd"-->
        <!--                            value-format="timestamp"-->
        <!--                            range-separator="至"-->
        <!--                            start-placeholder="开始日期"-->
        <!--                            end-placeholder="结束日期"-->
        <!--                            :picker-options="CONSTANT.PICKEROPTIONS"-->
        <!--                    ></el-date-picker>-->
        <!--                </div>-->
        <el-button type="primary" icon="el-icon-search" class="ml10p mt14p" @click="search()">搜索</el-button>
        <el-button type="info" icon="el-icon-refresh" class="ml10p mt14p" @click="reset">重置</el-button>
      </div>
    </el-card>
    <el-card class="mt20p">
      <div class="d-flex justify-content-between align-items-center">
        <span>共有{{ tableData.count }}条数据</span>
        <div>
          <el-button type="info" icon="el-icon-refresh" @click="getData()"></el-button>
          <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="$router.push('create')"
          >新建
          </el-button>
          <el-button type="primary" :disabled="!multipleSelection.length" icon="el-icon-delete"
                     @click="delMore()">删除
          </el-button>
        </div>
      </div>
      <el-table :data="tableData.list" border stripe class="mt20p" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column fixed prop="title" label="标题" min-width="300"></el-table-column>
        <el-table-column prop="categoryName" label="分类名" min-width="100"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" min-width="100">
          <template v-slot="scope">{{ scope.row.updateTime|dateDay }}</template>
        </el-table-column>
        <el-table-column prop="clickCount" label="点击量" min-width="50"></el-table-column>
        <el-table-column prop="sort" label="排序" min-width="50"></el-table-column>
        <el-table-column prop="isCanComment" label="是否可评论" min-width="50">
          <template v-slot="scope">{{ scope.row.isCanComment|bool }}</template>
        </el-table-column>
        <el-table-column prop="isTop" label="是否置顶" min-width="50">
          <template v-slot="scope">{{ scope.row.isTop|bool }}</template>
        </el-table-column>
        <el-table-column prop label="操作" align="center" fixed="right" min-width="200">
          <template v-slot="scope">
            <el-button
                @click="$router.push({path:'detail',query:{id:scope.row.id}})"
                icon="el-icon-reading"
                type="primary"
                size="small"
            >查看
            </el-button>
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
            :page-sizes="[10, 20, 30, 40]"
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
      searchDate: [],
      searchData: {},
      multipleSelection: [],
      tableData: {
        list: [],
        count: 0
      },
      offset: 1,
      limit: 10,
      isSearch: false
    }
  },
  watch: {
    // 检测到这个值有变动，设置到searchData里面
    searchDate(newValue) {
      if (newValue && newValue.length > 0) {
        this.searchData.minCreateTime = newValue[0]
        this.searchData.maxCreateTime = newValue[1]
      }
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
      let res = await this.$api.article.select({}, params)
      if (res.code === 0) {
        this.tableData.list = res.data.list
        this.tableData.count = res.data.count
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
      this.$mConfirm('', '此操作将永久删除该文件, 是否继续?', async () => {
        let res = await this.$api.article.del({}, {id: row.id})
        if (res.code === 0) {
          this.$success(res.msg)
          this.getData()
        } else {
          this.$error(res.msg)
        }
      })
    },
    delMore(row) {
      this.$mConfirm('', '此操作将永久删除该文件, 是否继续?', async () => {
        let res = await this.$api.article.delMore(this.multipleSelection);
        if (res.code === 0) {
          this.$success(res.msg)
          this.getData()
        } else {
          this.$error(res.msg)
        }
      })
    }
  }
}
</script>


<style scoped lang="less">
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
