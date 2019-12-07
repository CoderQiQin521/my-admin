import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/rest/articles',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: `/rest/articles/${id}`,
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/rest/articles',
    method: 'post',
    data
  })
}

export function updateArticle(id, data) {
  return request({
    url: `/rest/articles/${id}`,
    method: 'put',
    data
  })
}

export function deleteArticle(id) {
  return request({
    url: `/rest/articles/${id}`,
    method: 'delete'
  })
}