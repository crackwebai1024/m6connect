import Vue from 'vue'
import Vuex from 'vuex'
import Data from './data'
import ITAppsModule from './modules/Backend/ItApps/ITAppsModule'
import SocialNetworkModule from './modules/SocialNetworkModule'
import GeneralListModule from './modules/GeneralListModule'
import NavigationStack from './modules/NavigationStack'
import TablesModule from './modules/TablesModule'
import InfoModule from './modules/InfoModule'
import Auth from './modules/Auth'
import Companies from './modules/Companies'
import GSChat from './modules/GSChat'
import GSFeed from './modules/GSFeed'
import PageControl from './modules/PageControl'
import UserSettingsControl from './modules/UserSettingsControl'
import SnackBarNotif from './modules/SnackBarNotif'
import File from './modules/File'
import AppBuilder from './modules/AppBuilder'
import M6Codes from './modules/M6Codes'
import WorkOrderModule from './modules/Backend/WorkOrder/WorkOrderModule'
import companies from '@/modules/cpm/store/companies'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chats: [],
    departments: {
      // id and then properties
      10: {
        name: 'IT Department',
        users: [0, 1, 2, 3]
      },
      11: {
        name: 'CPM Department',
        users: [4, 5, 6, 7]
      },
      12: {
        name: 'Microsoft Corporation',
        users: [8, 9, 10, 11, 12]
      }
    },
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
    layout: state => state.layout,
    get_views_list: state => () => state.viewsList,
    get_user_data: state => () => state.user_data,
    get_workers: state => () => state.workers,
    // Return the first project or the data saved
    // View Tabs Getters
    get_tabs: state => () => state.tabs,
    get_image_preview_overlay: state => () => [
      state.preview_images_array,
      state.preview_images_selected
    ]
  },
  mutations: {
    setAllWorkers(state, work) {
      state.workers = work
    },
    set_new_status_bootom_template(state, data) {
      state.bootom_template = data
    },
    set_user_info_data(state, data) {
      state.user_data = data
    },
    set_image_preview_overlay(state, array) {
      state.preview_images_array = array[0]
      state.preview_images_selected = array[1]
    },
    reset_image_overlay(state) {
      state.preview_images_array = []
      state.preview_images_selected = {}
    }
  },
  actions: {
    set_workers({ commit }) {
      const data = [
        {
          name: 'Raul Mercado',
          imageUrl:
            'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
          email: 'raulmercado@mail.com',
          contactPhone: '2321235465'
        },
        {
          name: 'Natalia Portman',
          imageUrl:
            'https://images.pexels.com/photos/5119189/pexels-photo-5119189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          email: 'nataliaportman@mail.com',
          contactPhone: '1233546529'
        }
      ]
      commit('setAllWorkers', data)
    },
    set_status_bootom_template({ commit }, data) {
      commit('set_new_status_bootom_template', data)
    },
    set_user_data({ commit }) {
      const user_data = {
        id: '123asd123',
        name: 'Jose Manuel Valdez Gonzalez',
        imageUrl: 'https://cdn.vuetifyjs.com/images/john.jpg',
        occupation: 'IT Apps (Department)'
      }
      commit('set_user_info_data', user_data)
    },
    set_image_preview_overlay({ commit }, array) {
      commit('set_image_preview_overlay', array)
    },
    reset_image_overlay({ commit }) {
      commit('reset_image_overlay')
    }
  },
  modules: {
    SocialNetworkModule,
    GeneralListModule,
    NavigationStack,
    WorkOrderModule,
    ITAppsModule,
    TablesModule,
    InfoModule,
    Auth,
    Companies,
    GSChat,
    GSFeed,
    PageControl,
    UserSettingsControl,
    SnackBarNotif,
    M6Codes,
    File,
    AppBuilder,
    companies
  }
})
