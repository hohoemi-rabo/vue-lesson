import './assets/tailwind.css'
import './assets/main.css'
import './assets/responsive.css'
import './assets/animations.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
