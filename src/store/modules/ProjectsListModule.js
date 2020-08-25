import MockData from "../MockData";
import ProjectsListModule from "./ProjectsListModule";
import _ from "lodash";

export default {
  namespaced: true,
  state: {
    projects: [],
    active_projects: [],
    idle_projects: []
  },
  getters: {
    get_projects: (state) => () => state.projects,
    get_info_data: (state) => (index) => state.projects[index],
    get_active_projects: (state) => () => state.active_projects,
    get_idle_projects: (state) => () => state.idle_projects
  },
  mutations: {
    setAllProjects(state, proj) {
      state.projects = proj;
    },
    push_new_info_data_active(state, new_data) {
      if (state.active_projects.length !== 2) {
        state.active_projects.push(new_data);
      } else {
        state.idle_projects.push(state.active_projects[0]);
        state.active_projects.push(new_data);
        state.active_projects.shift();
        console.log("New IDLE: ", state.idle_projects);
      }
    },
    set_active_projects(state, new_data) {
      state.active_projects = new_data;
    },
    set_idle_projects(state, new_data) {
      state.idle_projects = new_data;
    }
  },
  actions: {
    set_projects({ commit }) {
      let data = MockData.fake_projects;
      commit("setAllProjects", data);
    },
    push_info_data_active(context, id) {
      let searchProject = ProjectsListModule.state.projects.find((object) => {
        return object.projecj_id === id;
      });
      context.commit("push_new_info_data_active", searchProject);
    },
    remove_from_active(context, id) {
      let newArray = _.remove(context.state.active_projects, function(n) {
        return n.projecj_id != id;
      });
      context.commit("set_active_projects", newArray);
    },
    remove_from_idle(context, id) {
      let newArray = _.remove(context.state.idle_projects, function(n) {
        return n.projecj_id != id;
      });
      context.commit("set_idle_projects", newArray);
    }
  }
};
