import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PiniaPluginPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './permission'

// 实例化vue
const app = createApp(App)
// 实例化store
const pinia = createPinia()
// 添加本地持久化存储插件
pinia.use(PiniaPluginPersist)
app.use(pinia)
app.use(router)

app.mount('#app')
