<template>
  <div class="app-container">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="_id" label="id" width="240" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column prop="updatedAt" label="修改时间" />
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              plain
              @click="$router.push(`/categories/edit/${scope.row._id}`)"
            >编辑</el-button>
            <el-button type="danger" plain @click="remove(scope.row)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { category } from '@/api/category'
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
      const res = await category()
      this.tableData = res
    },
    remove(row) {
      this.$confirm(`是否确定删除分类 "${row.name}"`, '提示', {}).then(
        async() => {
          await this.$http.delete(`/rest/categories/${row._id}`, row)
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
