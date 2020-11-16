import axios from "axios";
import generalListModule from "../../GeneralListModule";
const convertApps = require("@/store/models/m6apps");

export default {
  namespaced: true,
  state: {
    appsList : [],
  },
  getters: {
    getApps: state => state.appsList
  },
  mutations: {
    SET_APPS:  (state, payload) => state.appsList = payload,
  },
  actions: {
    async set_apps({ commit }){
      let apps = await axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/apps/selects`);
      commit('SET_APPS', apps['data']);
    },
    async post_app({}, data) {
        return await axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/dynamic_apps`, data);
    },
    async get_all_apps_by_id({}, appId){
      let apps = await axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/dynamic_apps/${appId}`)
      generalListModule.state.general_list = convertApps.toM6Apps(apps['data']);
    }
  }
};
