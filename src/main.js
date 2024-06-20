import { createApp } from 'vue'
import App from './App.vue'
import ellipsisHoverDirective from './directive/ellipsisHoverDirective.js'

createApp(App)
  .directive('ellipsis-hover', ellipsisHoverDirective)
  .mount('#app')

