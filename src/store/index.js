import Vue from "vue";
import Vuex from "vuex";
import Data from "./data";
import SocialNetworkModule from "./modules/SocialNetworkModule";
import GeneralListModule from "./modules/GeneralListModule";
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
    request_table_header: Data.get_request_table_header(),
    ticket_table_header: Data.get_ticket_table_header(),
    bootom_template: false
  },
  getters: {
    // View Home Getters
    get_info_carousel: (state) => () => state.info_carousel,
    layout: (state) => state.layout,
    get_views_list: (state) => () => state.viewsList,
    get_user_data: (state) => () => state.user_data,
    get_workers: (state) => () => state.workers,
    // Return the first project or the data saved
    // View Tabs Getters
    get_request_table_header: (state) => () => state.request_table_header,
    get_ticket_table_header: (state) => () => state.ticket_table_header,
    get_tabs: (state) => () => state.tabs,
    // Tables Getters
    get_bootom_template: (state) => state.bootom_template
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
    InfoModule
  }
});
