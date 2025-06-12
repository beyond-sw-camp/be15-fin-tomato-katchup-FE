import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/styles/tailwind.css'

async function bootstrap() {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(Toast)

  // if(import.meta.env.NODE_ENV === 'deployment'){
    console.log("!!!!!");
    const { worker } = await import('@/mocks/api/browser.js')
    await worker.start()

  // }

  app.mount('#app')
}

;(async () => {
  await bootstrap()
})()
