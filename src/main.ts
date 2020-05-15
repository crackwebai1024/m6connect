import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'vue-ionicons/ionicons.scss'

import AllIosIcon from 'vue-ionicons/dist/ionicons.js'
Vue.use(AllIosIcon)

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  name: 'M6FrontEnd',
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
