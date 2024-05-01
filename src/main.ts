import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createYmaps } from 'vue-yandex-maps'
import ToastService from 'primevue/toastservice'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(
  createYmaps({
    apikey: '86486306-b1ef-4e16-a992-564887f3d3ef'
  })
)
app.use(ToastService)
app.mount('#app')
