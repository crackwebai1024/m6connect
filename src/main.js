import InfiniteLoading from 'vue-infinite-loading'
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import Vue from "vue";
import lineClamp from "vue-line-clamp";

Vue.config.productionTip = false;

Vue.use(InfiniteLoading);

Vue.use(lineClamp);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
