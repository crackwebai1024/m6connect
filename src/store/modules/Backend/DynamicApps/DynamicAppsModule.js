import axios from "axios";

export default {
  namespaced: true,
  state: {
  },
  getters: {  
  },
  mutations: {
  },
  actions: {
    post_app({}, data) {
        axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/dynamic_apps`, data);
    }
  }
};
