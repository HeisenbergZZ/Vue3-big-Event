import axios from 'axios'
import { useUserStore } from '../stores/index'
// 定义后端接口的基础URL
const baseURL = 'http://big-event-vue-api-t.itheima.net'
import { ElMessage } from 'element-plus'
import router from '../router'

// 创建axios实例
const instance = axios.create({
  // 配置基础URL和超时时间
  baseURL,
  timeout: 5000, // 请求超时时间为5秒
})

// 配置请求拦截器
instance.interceptors.request.use((config) => {
  // 获取用户的store实例
  const userStore = useUserStore()
  // 如果有token，将其添加到请求头的Authorization字段中
  if (userStore.token) {
    config.headers.Authorization = userStore.token
  }
  return config
})

// 配置响应拦截器
instance.interceptors.response.use(
  // 响应成功的回调
  (response) => {
    // 如果响应码为0，说明请求成功，直接返回响应数据
    if (response.data.code === 0) {
      return response
    }
    // 请求失败，显示错误提示信息
    ElMessage.error(response.data.message || '服务异常')
    return Promise.reject(response.data)
  },
  // 响应失败的回调
  (err) => {
    // 如果响应状态码是401，说明token过期或未登录，跳转到登录页
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // 显示错误提示信息
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  },
)

// 导出axios实例和基础URL
export default instance
export { baseURL }
