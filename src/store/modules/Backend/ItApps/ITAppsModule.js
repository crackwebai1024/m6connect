import axios from "axios";
import generalListModule from "../../GeneralListModule";
const Convert = require("../../../models/itapps");
const ItAppDescription = require("../../../models/itapp_description");
const ItAppDependencies = require("@/store/models/itapp_dependencies");

export default {
  namespaced: true,
  state: {
      backendUrl: 'http://www.localhost:8080/api/',
      itappsRecords: []
  },
  getters: {
      
  },
  mutations: {
  },
  actions: {
      // GET ITApps
        async get_it_apps(context){
          let response = await axios.get(context.state.backendUrl+'itapps');
          response['data'].forEach(e => {
            let a = Convert.toItapps(e);
            context.state.itappsRecords.push(a);
          });
          generalListModule.state.general_list = context.state.itappsRecords;
        },
        async get_description(context, id) {
          let response = await axios.get(context.state.backendUrl+'itapps/get_itapp_info/'+id);
          let convertModel = ItAppDescription.toItappsDescription(response.data);
          return convertModel;
        },
      // POST ITApp
        async post_it_apps(context, data) {
          return await axios.post(context.state.backendUrl+'itapps', Convert.itappsToJson(data));
        },
        async post_it_app_image(context, data) {
          return await axios.post(context.state.backendUrl+'app_image', data);
        },
        async post_general_ifo(cont, data) {
          return await axios.post(cont.state.backendUrl+'app_info_general', data);
        },
        async post_info_security(cont, data) {
          return await axios.post(cont.state.backendUrl+'information_security', data);
        },
        async post_tag(cont, data) {
          return await axios.post(cont.state.backendUrl+'tag', data);
        },
      // Put Itapps
        async put_itapp_description(cont, data){
          // itapps/{id}
          let previewCommit = ItAppDescription.itappsDescriptionToJson(data);
          axios.put(cont.state.backendUrl+'itapps/'+previewCommit.id, previewCommit);
          axios.put(cont.state.backendUrl+'app_info_general/'+previewCommit.general_info.id, {
            'server_hosting_model_settings_id':previewCommit.general_info.server_hosting_model.id,
            'first_contact_group_settings_id':previewCommit.general_info.first_contact_group.id,
            'app_management_settings_id':previewCommit.general_info.app_management.id,
            'sub_category_settings_id':previewCommit.general_info.sub_category.id,
            'category_settings_id':previewCommit.general_info.category.id,
            'status_settings_id':previewCommit.general_info.status.id,
            'type_settings_id':previewCommit.general_info.type.id,
            'vendor_id':previewCommit.general_info.vendor_id,
            'version':previewCommit.general_info.version,
          });
        },
      // Licensing
        async get_licensing(cont, apId){
          let response = await axios.get(cont.state.backendUrl+'licensing/'+apId);
          return Object.keys(response.data).length == 0 ? {} :{
            id: response.data.id,
            licenseType : response.data.type,
            users : response.data.estimated_users,
            concurrentUsers : response.data.estimated_current_users,
            licenses : response.data.number_of_licenses,
            details : response.data.details
          };
        },
        post_licensing(cont, data){
          axios.post(cont.state.backendUrl+'licensing', data);
        },
        put_licensing(cont, data) {
          axios.put(cont.state.backendUrl+'licensing/'+data.id, data);
        },
        delete_licensing(cont,id){
          axios.delete(cont.state.backendUrl+'licensing/'+id);
        },
      // Dependencies
        async get_dependencies(cont, appId){
          return await axios.get(cont.state.backendUrl+'dependencie/'+appId);
        },
        post_dependencie(cont, data){
          axios.post(cont.state.backendUrl+'dependencie',data);
        },
        put_dependencies(cont, data){
          axios.put(cont.state.backendUrl+'dependencie/'+data.id, ItAppDependencies.dependenciesToJson(data)).then(
            response => (console.log(response))
          );
        },
        delete_dependencie(cont, id){
          axios.delete(cont.state.backendUrl+'dependencie/'+id);
        },
      // GETS Selects
        async get_selects(context, url) {
          return await axios.get(context.state.backendUrl+'apps_settings/specifi/field'+url);
        },
  }
};
