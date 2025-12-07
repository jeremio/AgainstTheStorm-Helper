import { createApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App)
  .use(vaporInteropPlugin)
  .mount('#app')
