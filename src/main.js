import InfiniteLoading from 'vue-infinite-loading'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import App from './App.vue'
import Vue from 'vue'
import lineClamp from 'vue-line-clamp'
import Helpers from './utils/helpers'
import { i18n } from './plugins/i18n'
import './plugins'
import './modules/cpm/plugins'
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib'
import VueKonva from 'vue-konva'
Vue.use(Helpers)

Vue.config.productionTip = false

Vue.use(InfiniteLoading)

Vue.use(lineClamp)

Vue.use(VueTelInputVuetify, {
  vuetify
})

Vue.use(VueKonva)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GMAPS_KEY,
    libraries: 'places'
  },
  installComponents: false
})

Vue.component('google-info-window', VueGoogleMaps.InfoWindow)
Vue.component('google-map', VueGoogleMaps.Map)
Vue.component('google-marker', VueGoogleMaps.Marker)
Vue.component('google-autocomplete', VueGoogleMaps.Autocomplete)

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
