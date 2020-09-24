import axios from "axios";
import generalListModule from "../../GeneralListModule";
const Convert = require("@/store/models/itapps");
const ItAppDescription = require("@/store/models/itapp_description");
const ItAppDependencies = require("@/store/models/itapp_dependencies");

export default {
  namespaced: true,
  state: {
      itappsRecords: []
  },
  getters: {
      
  },
  mutations: {
  },
  actions: {
      // Push record
        async push_record(cont, id){
          let a = await axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/itapps/get_itapp_info/${id}`);
          generalListModule.state.general_list.push(a.data);
        },
      // GET ITApps
        async get_it_apps(cont){
          let response = await axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/itapps`);
          response['data'].forEach(e => {
            let a = Convert.toItapps(e);
            cont.state.itappsRecords.push(a);
          });
          generalListModule.state.general_list = cont.state.itappsRecords;
        },
        async get_description(cont, id) {
          let response = await axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/itapps/get_itapp_info/${id}`);
          let convertModel = ItAppDescription.toItappsDescription(response.data);
          Object.keys(convertModel.general_info).forEach(key => {
            if(typeof convertModel.general_info[key] === 'object' && convertModel.general_info[key] === null)
              convertModel.general_info[key] = {id:undefined, value:undefined, field:undefined}  
          });
          return convertModel;
        },
      // POST ITApp
        async post_it_apps(cont, data) {
          return await axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/itapps`, Convert.itappsToJson(data));
        },
        async post_it_app_image(cont, data) {
          return await axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/app_image`, data);
        },
        async post_general_ifo(cont, data) {
          return await axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/app_info_general`, data);
        },
        async post_info_security(cont, data) {
          return await axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/information_security`, data);
        },
        async post_tag(cont, data) {
          return await axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/tag`, data);
        },
      // Put Itapps
        async put_itapp_description(cont, data){
          data.also_known.forEach((item, index) => {
            if(typeof item === 'string'){
              data.also_known[index] = {
                created_at: undefined,
                field: 'also_know_as',
                foreign_id: data.id,
                id: undefined,
                updated_at: undefined,
                value: item
              };
            }
          });
          data.formerly_known.forEach((item, index) => {
            if(typeof item === 'string') {
              data.formerly_known[index] = {
                created_at: undefined,
                field: 'formerly_known_as',
                foreign_id: data.id,
                id: undefined,
                updated_at: undefined,
                value: item
              };
            }
          });
          axios.put(`http://${process.env.VUE_APP_ENDPOINT}/api/itapps/update_all_info/${data.id}`, ItAppDescription.itappsDescriptionToJson(data));
        },
      // Licensing
        async get_licensing(cont, appId){
          let response = await axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/licensing/${appId}`);          
          return Object.keys(response.data).length == 0 ? {} :{
            id: response.data.id,
            licenseType : response.data.type,
            users : response.data.estimated_users,
            concurrentUsers : response.data.estimated_current_users,
            licenses : response.data.number_of_licenses,
            details : response.data.details
          };
        },
        async post_licensing(cont, data){
          return await axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/licensing`, data);
        },
        put_licensing(cont, data) {
          axios.put(`http://${process.env.VUE_APP_ENDPOINT}/api/licensing/${data.id}`, data);
        },
        delete_licensing(cont,id){
          axios.delete(`http://${process.env.VUE_APP_ENDPOINT}/api/licensing/${id}`);
        },
      // Dependencies
        async get_dependencies(cont, appId){
          return await axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/dependencie/${appId}`);
        },
        async post_dependency(cont, data){
          return await axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/dependencie`, data);
        },
        put_dependencies(cont, data){
          axios.put(`http://${process.env.VUE_APP_ENDPOINT}/api/dependencie/${data.id}`, ItAppDependencies.dependenciesToJson(data));
        },
        delete_dependency(cont, id){
          axios.delete(`http://${process.env.VUE_APP_ENDPOINT}/api/dependencie/${id}`);
        },
      // Notifications
        post_notification(cont, data){
          axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/notification_date`, data.noti_date).then(
            res => (
              data.notification.date = res.data.notification_date_id,
              axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/notification`, data.notification)
            )
          );
        },
      // GETS Selects
        async get_selects(cont, url) {
          return await axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/apps_settings/specifi/field${url}`);
        },
        async get_all_selects(cont, data) {
          return await axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/apps_settings/per_param/field`, {params:data});
        },
      // Tags
        async getTagsAkaFka(cont, id) {
          return await axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/tag/specifi/foreign_id/${id}`);
        },
        put_tags(cont, obj){
          axios.put(`http://${process.env.VUE_APP_ENDPOINT}/api/some_tags`, {params : obj});
        }
  }
};
