import request from '@/utils/request'

export const category = (data) => request.get('/rest/categories', data)
