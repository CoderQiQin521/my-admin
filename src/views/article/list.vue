<template>
  <div class="app-container">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="_id" label="id" width="240" />
      <el-table-column prop="title" label="文章名称" />
      <el-table-column prop="parent" label="所属分类">
        <template slot-scope="scope">
          <el-tag
            type="info"
            style="margin-right:4px"
            size="mini"
            v-for="tag in scope.row.parent"
            :key="tag._id"
          >{{tag.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="200">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              plain
              @click="$router.push(`/article/edit/${scope.row._id}`)"
            >编辑</el-button>
            <el-button type="danger" plain @click="remove(scope.row)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, deleteArticle } from '@/api/article'
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      let res = await fetchList()
      this.tableData = res
    },
    remove(row) {
      console.log('row: ', row)
      this.$confirm(`是否确定删除文章 "${row.title}"`, '提示', {}).then(
        async () => {
          await deleteArticle(row._id)
          // let index = this.list.findIndex(item => item._id === row._id);
          // this.list.splice(index, 1)
          // this.$delete(this.list, index);
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.fetch()
        }
      )
    }
  }
}
</script>

<style>
</style>