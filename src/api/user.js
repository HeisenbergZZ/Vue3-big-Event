// 在 Vue 项目中，api 文件夹是用于集中管理所有与后端接口交互的代码的核心目录
import request from '@/utils/request'
//注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
//获取用户的基本信息
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}
//更新用户的基本信息
export const userUpdateService = ({ id, nickname, email }) => {
  return request.put(`/my/userinfo`, { id, nickname, email })
}
//更新用户头像
export const userUpdateAvatarService = ({ avatar }) => {
  return request.patch(`/my/update/avatar`, { avatar })
}
//更新用户密码
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) => {
  return request.patch(`/my/updatepwd`, { old_pwd, new_pwd, re_pwd })
}
