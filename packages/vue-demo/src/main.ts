import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@oicl/openbridge-webcomponents/dist/openbridge.css'
import { installPointerModalityTracker } from '@oicl/openbridge-webcomponents'
import './main.css'

installPointerModalityTracker()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
