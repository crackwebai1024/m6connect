import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    projects:[],
    workers: [],
    info_data:{}
  },
  getters: {
    get_projects: (state) => () =>  state.projects,
    get_workers: (state) => () =>  state.workers,
    // Return the first project or the data saved
    get_info_data: (state) => () => 
      Object.keys(state.info_data).length === 0 ? state.projects[0] : state.info_data
  },
  mutations: {
    setAllProjects(state, proj) {
      state.projects = proj;
    },
    setAllWorkers(state, work){
      state.workers = work;
    },
    setNewInfoData(state, newData){
      state.info_data = newData
    }
  },
  actions: {
    set_projects({ commit }) {
      let data = [
        {
          project_name: "New Vallarta 1",
          projecj_id: "123132",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url: "",
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 2",
          projecj_id: "123132",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url: "",
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 3",
          projecj_id: "123132",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url: "",
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 4",
          projecj_id: "123132",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url: "",
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 5",
          projecj_id: "123132",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url: "",
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 6",
          projecj_id: "123132",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url: "",
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 7",
          projecj_id: "123132",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url: "",
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 8",
          projecj_id: "123132",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url: "",
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
      ];
      commit("setAllProjects", data);
    },
    set_info_data({commit}, data){
      commit('setNewInfoData', data)
    },
    set_workers({commit}){
      let data = [{
        name: "Raul Mercado",
        imageUrl: "https://via.placeholder.com/350/",
        email: "raulmercado@mail.com",
        contactPhone: "2321235465",
      },
      {
        name: "Natalia Portman",
        imageUrl: "https://via.placeholder.com/350/",
        email: "nataliaportman@mail.com",
        contactPhone: "1233546529",
      }]
      commit('setAllWorkers', data);
    },
  },
  modules: {},
});
