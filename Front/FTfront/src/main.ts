import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // Добавь эту строку

const app = createApp(App)
app.use(router)                // Инициализация роутера
app.mount('#app')
