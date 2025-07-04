import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
// import { useUserStore } from './user'
// export { useUserStore }
export * from './modules/user' //store统一管理
export * from './modules/counter'

const pinia = createPinia()
pinia.use(persist) //使用持久化工具

export default pinia
