import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/main.scss'

// 创建应用实例
const app = createApp(App)

// 创建 Pinia 实例
const pinia = createPinia()

// 按照顺序挂载插件
app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')
