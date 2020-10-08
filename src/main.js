import InfiniteLoading from 'vue-infinite-loading';
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import App from './App.vue'
import Vue from 'vue'
import lineClamp from 'vue-line-clamp'
import Helpers from './utils/helpers'
import { i18n } from './plugins/i18n'
import './plugins'
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';

Vue.use(Helpers)

Vue.config.productionTip = false

Vue.use(InfiniteLoading)

Vue.use(lineClamp)

Vue.use(VueTelInputVuetify, {
  vuetify,
});

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA9g-w4eq0314Vz43V-cKu585Fi03NgiIo',
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
