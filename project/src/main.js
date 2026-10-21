import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入剛剛建立的 router 設定

const app = createApp(App)

app.use(router) // 讓 Vue 專案套用路由
app.mount('#app')
