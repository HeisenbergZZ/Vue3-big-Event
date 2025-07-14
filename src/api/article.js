import request from '@/utils/request'

//获取文章分类列表
export const getArticleListService = () => {
  return request.get('/my/cate/list')
}
//添加文章分类
export const addArticleCateService = (data) => {
  return request.post('/my/cate/add', data)
}
//编辑文章分类
export const editArticleCateService = (data) => {
  return request.put('/my/cate/info', data)
}
//删除文章分类
export const deleteArticleCateService = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      //params是请求参数
      id,
    },
  })
}
// **************文章管理**************
//获取文章列表
export const artGetListService = (params) => {
  return request.get('/my/article/list', {
    params,
  })
}
//data是formdata对象
export const artAddService = (data) => {
  return request.post('/my/article/add', data)
}
//获取文章详情
export const artGetInfoService = (id) => {
  return request.get('/my/article/info', {
    params: {
      id,
    },
  })
}
export const artEditService = (data) => {
  return request.put('/my/article/info', data)
}
