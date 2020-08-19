import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects:[ ]
  },
  getters: {
    get_projects: (state) => () => {
      return state.projects;
    },get_first_project: (state) => () => {
      return state.projects[0];
    }
  },
  mutations: {
    setAllProjects(state, proj){
      state.projects = proj;
    }
  },
  actions: {
    set_projects({commit}){
      let data = [{
        project_name:"New Vallarta",
        projecj_id:'123132',
        phase: "asdasd",
        company:"m6connect", 
        department: "Design", 
        project_leader: "",
        project_support:"",
        designer:"",
        role_two:"",
        client_status:"",
        internal_description:"",
        internal_objective:"",
        projet_image_url:"",
        client_original_request:"",
        client_requested_due_date:"",
        client_in_take_clarification_description:"",
        client_follow_up_date:""
      },{
        project_name:"New Vallarta",
        projecj_id:'123132',
        phase: "asdasd",
        company:"m6connect", 
        department: "Design", 
        project_leader: "",
        project_support:"",
        designer:"",
        role_two:"",
        client_status:"",
        internal_description:"",
        internal_objective:"",
        projet_image_url:"",
        client_original_request:"",
        client_requested_due_date:"",
        client_in_take_clarification_description:"",
        client_follow_up_date:""
      },{
        project_name:"New Vallarta",
        projecj_id:'123132',
        phase: "asdasd",
        company:"m6connect", 
        department: "Design", 
        project_leader: "",
        project_support:"",
        designer:"",
        role_two:"",
        client_status:"",
        internal_description:"",
        internal_objective:"",
        projet_image_url:"",
        client_original_request:"",
        client_requested_due_date:"",
        client_in_take_clarification_description:"",
        client_follow_up_date:""
      }]
      commit('setAllProjects', data);
    },
  },
  modules: {
  }
})
