import axios from "axios";
import generalListModule from "../../GeneralListModule";
const Convert = require("@/store/models/itapps");
const ItAppDescription = require("@/store/models/itapp_description");
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
          Object.keys(convertModel.general_info).forEach(key => {
            if(typeof convertModel.general_info[key] === 'object' && convertModel.general_info[key] === null)
              convertModel.general_info[key] = {id:undefined, value:undefined, field:undefined}  
          });
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
          let previewCommit = ItAppDescription.itappsDescriptionToJson(data);
          axios.put(cont.state.backendUrl+'some_tags', {params : previewCommit.formerly_known.concat(previewCommit.also_known)});
          axios.put(cont.state.backendUrl+'itapps/'+previewCommit.id, previewCommit);
          axios.put(cont.state.backendUrl+'app_info_general/'+previewCommit.general_info.id, 
            ItAppDescription.generalInfo(previewCommit.general_info)
          );
          axios.put(cont.state.backendUrl+'information_security/'+data.information_security.id,{
            ssn: data.information_security.ssn_foreign.id,
            facing: data.information_security.facing,
            phi: data.information_security.phi,
            pci: data.information_security.pci
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
        async post_licensing(cont, data){
          return await axios.post(cont.state.backendUrl+'licensing', data);
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
        async post_dependency(cont, data){
          return await axios.post(cont.state.backendUrl+'dependencie',data);
        },
        put_dependencies(cont, data){
          axios.put(cont.state.backendUrl+'dependencie/'+data.id, ItAppDependencies.dependenciesToJson(data));
        },
        delete_dependency(cont, id){
          axios.delete(cont.state.backendUrl+'dependencie/'+id);
        },
      // Notifications
        post_notification(cont, data){
          axios.post(cont.state.backendUrl+'notification_date',data.noti_date).then(
            res => (
              data.notification.date = res.data.notification_date_id,
              axios.post(cont.state.backendUrl+'notification', data.notification)
            )
          );
        },
      // GETS Selects
        async get_selects(context, url) {
          return await axios.get(context.state.backendUrl+'apps_settings/specifi/field'+url);
        },
        async get_all_selects(cont, data) {
          return await axios.get(cont.state.backendUrl+'apps_settings/per_param/field', {params:data});
        },
  }
};
