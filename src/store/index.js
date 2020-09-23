import Vue from "vue";
import Vuex from "vuex";
import Data from "./data";
import ITAppsModule from "./modules/Backend/ItApps/ITAppsModule";
import SocialNetworkModule from "./modules/SocialNetworkModule";
import GeneralListModule from "./modules/GeneralListModule";
import NavigationStack from "./modules/NavigationStack";
import TablesModule from "./modules/TablesModule";
import InfoModule from "./modules/InfoModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chats: [],
    departments: {
      // id and then properties
      10: {
        name: 'IT Department',
        users: [0,1,2,3]
      },
      11: {
        name: 'CPM Department',
        users: [4,5,6,7]
      },
      12: {
        name: 'Microsoft Corporation',
        users: [8,9,10,11,12]
      }
    },
    currentUser: {
      id: 0,
      name: 'John Doe',
      pic: 'https://cdn.vuetifyjs.com/images/john.jpg',
      title: 'Software Developer',
      departmentId: 10,
      connections: [2,3,4,5,6],
      myCompany: [4,6,7,8],
      vendors: [9,10,11,12]
    },
    users: [
      {
        id: 1,
        name: "John Doe",
        pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        departmentName: 'IT Department'
      },
      {
        id: 2,
        name: "Example User",
        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        departmentName: 'IT Department'
      },
      {
        id: 3,
        name: "Another Example",
        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        departmentName: 'CPM Department'
      },
      {
        id: 4,
        name: "John Doe",
        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        departmentName: 'HR Department'
      },
      {
        id: 5,
        name: "Example User",
        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        departmentName: 'Microsoft Corporation'
      },
      {
        id: 6,
        name: "Another Example",
        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        departmentName: 'IT Department'
      },
      {
        id: 7,
        name: "John Doe",
        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        departmentName: 'IT Department'
      },
      {
        id: 8,
        name: "Example User",
        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        departmentName: 'HR Department'
      },
      {
        id: 9,
        name: "Another Example",
        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        departmentName: 'CPM Department'
      },
      {
        id: 10,
        name: "John Doe",
        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        departmentName: 'IT Department'
      },
      {
        id: 11,
        name: "John Doe",
        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        departmentName: 'IT Department'
      },
      {
        id: 12,
        name: "John Doe",
        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        departmentName: 'IT Department'
      }
    ],
    projects: [],
    workers: [],
    info_carousel: [],
    user_data: {},
    viewsList: Data.get_views_list(),
    tabs: Data.get_tabs(),
    request_table_header: Data.get_request_table_header(),
    ticket_table_header: Data.get_ticket_table_header(),
    bootom_template: false,
    preview_images_array: [],
    preview_images_selected: {}
  },
  getters: {
    // View Home Getters
    layout: (state) => state.layout,
    get_views_list: (state) => () => state.viewsList,
    get_user_data: (state) => () => state.user_data,
    get_workers: (state) => () => state.workers,
    // Return the first project or the data saved
    // View Tabs Getters
    get_tabs: (state) => () => state.tabs,
    get_image_preview_overlay: (state) => () => [
      state.preview_images_array,
      state.preview_images_selected
    ]
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
    },
    set_image_preview_overlay(state, array) {
      state.preview_images_array = array[0];
      state.preview_images_selected = array[1];
    },
    reset_image_overlay(state) {
      state.preview_images_array = [];
      state.preview_images_selected = {};
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
    },
    set_image_preview_overlay({ commit }, array) {
      commit("set_image_preview_overlay", array);
    },
    reset_image_overlay({ commit }) {
      commit("reset_image_overlay");
    }
  },
  modules: {
    SocialNetworkModule,
    GeneralListModule,
    NavigationStack,
    ITAppsModule,
    TablesModule,
    InfoModule
  }
});
