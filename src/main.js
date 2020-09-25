import InfiniteLoading from 'vue-infinite-loading'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import App from './App.vue'
import Vue from 'vue'
import lineClamp from 'vue-line-clamp'
import Helpers from './utils/helpers'
import { i18n } from './plugins/i18n'
import './plugins/m6'

Vue.use(Helpers)

Vue.config.productionTip = false

Vue.use(InfiniteLoading)

Vue.use(lineClamp)

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
