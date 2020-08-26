import Vue from "vue";
import Vuex from "vuex";
import Data from "./data";
import SocialNetworkModule from "./modules/SocialNetworkModule";
import GeneralListModule from "./modules/GeneralListModule";
import TablesModule from "./modules/TablesModule";
import InfoModule from "./modules/InfoModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    layout: {
      contacts: false // true = fullsize | false = mini
    },
    projects: [],
    workers: [],
    info_carousel: [],
    user_data: {},
    viewsList: Data.get_views_list(),
    tabs: Data.get_tabs(),
    bootom_template: false
  },
  getters: {
    // View Home Getters
    layout: (state) => state.layout,
    get_views_list: (state) => () => state.viewsList,
    get_user_data: (state) => () => state.user_data,
    get_workers: (state) => () => state.workers,
    // Return the first project or the data saved
    // View Tabs Getters
    get_tabs: (state) => () => state.tabs
  },
  mutations: {
    setAllWorkers(state, work) {
      state.workers = work;
    },
    set_new_status_bootom_template(state, data) {
      state.bootom_template = data;
    },
    set_user_info_data(state, data) {
      state.user_data = data;
    }
  },
  actions: {
    set_workers({ commit }) {
      let data = [
        {
          name: "Raul Mercado",
          imageUrl:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
          email: "raulmercado@mail.com",
          contactPhone: "2321235465"
        },
        {
          name: "Natalia Portman",
          imageUrl:
            "https://images.pexels.com/photos/5119189/pexels-photo-5119189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          email: "nataliaportman@mail.com",
          contactPhone: "1233546529"
        }
      ];
      commit("setAllWorkers", data);
    },
    set_status_bootom_template({ commit }, data) {
      commit("set_new_status_bootom_template", data);
    },
    set_user_data({ commit }) {
      let user_data = {
        id: "123asd123",
        name: "Jose Manuel Valdez Gonzalez",
        imageUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
        occupation: "IT Apps (Department)"
      };
      commit("set_user_info_data", user_data);
    }
  },
  modules: {
    SocialNetworkModule,
    GeneralListModule,
    TablesModule,
    InfoModule
  }
});
