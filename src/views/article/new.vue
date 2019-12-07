<template>
  <div class="app-container">
    <el-form>
      <el-form-item label-width="120px" label="文章分类:" class="postInfo-container-item">
        <el-select v-model="article.parent" multiple placeholder="请选择文章分类">
          <el-option v-for="item in category" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="120px" label="文章标题:" class="postInfo-container-item">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
    </el-form>
    <Tinymce ref="editor" v-model="article.content"></Tinymce>
    <el-button type="primary" @click="postForm">发布</el-button>
    <br />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { category } from '@/api/category'
import { createArticle, fetchArticle, updateArticle } from '@/api/article'
export default {
  data() {
    return {
      category: [],
      article: {
        parent: '',
        title: '',
        content: ''
      }
    }
  },
  components: {
    Tinymce
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      let res = await category()
      this.category = res

      if (this.$route.params.id) {
        fetchArticle(this.$route.params.id).then(res => {
          this.article = res
        })
      }
    },
    postForm() {
      if (this.$route.params.id) {
        updateArticle(this.$route.params.id, this.article).then(res => {
          this.$router.push('/article/list')
          this.$notify({
            title: '成功',
            message: '修改文章成功',
            type: 'success',
            duration: 2000
          })
        })
      } else {
        createArticle(this.article).then(res => {
          this.$router.push('/article/list')
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    }
  }
}
</script>

<style>
</style>
