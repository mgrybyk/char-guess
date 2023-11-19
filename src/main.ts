import { ViteSSG } from 'vite-ssg/single-page'
import '@unocss/reset/normalize.css'
import 'virtual:uno.css'
import App from './App.vue'

// `export const createApp` is required instead of the original `createApp(App).mount('#app')`
export const createApp = ViteSSG(App)
