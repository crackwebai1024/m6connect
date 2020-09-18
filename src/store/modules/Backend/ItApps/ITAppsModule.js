import axios from "axios";
import generalListModule from "../../GeneralListModule";
const Convert = require("../../../models/itapps");

export default {
  namespaced: true,
  state: {
      backendUrl: 'http://www.localhost:8080/',
      itappsRecords: []
  },
  getters: {
      
  },
  mutations: {
  },
  actions: {
      // GET ITApps
        async get_it_apps(context){
          let response = await axios.get(context.state.backendUrl+'api/itapps');
          response['data'].forEach(e => {
            let a = Convert.toItapps(e);
            context.state.itappsRecords.push(a);
          });
          generalListModule.state.general_list = context.state.itappsRecords;
        },
      // POST ITApp
        async post_it_apps(context, data) {
          return await axios.post(context.state.backendUrl+'api/itapps', Convert.itappsToJson(data));
        },
        async post_it_app_image(context, data) {
          return await axios.post(context.state.backendUrl+'api/app_image', data);
        },
        async post_general_ifo(cont, data) {
          return await axios.post(cont.state.backendUrl+'api/app_info_general', data);
        },
        async post_info_security(cont, data) {
          return await axios.post(cont.state.backendUrl+'api/information_security', data);
        },
      // GETS Selects
        async get_selects(context, url) {
          return await axios.get(context.state.backendUrl+'api/apps_settings/specifi/field'+url);
        },
  }
};
