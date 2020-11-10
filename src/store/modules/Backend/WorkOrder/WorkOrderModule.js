import axios from "axios";
import auth from '../../Auth';

export default {
  namespaced: true,
  state: {
    actionFeed:[],
    filter:{}
  },
  getters: {  
    getActionFeed: state => state.actionFeed,
    getFilter: state => state.filter,
  },
  mutations: {
    SET_WORK_ORDER:  (state, payload) => state.actionFeed = payload,
    SET_WORK_FILTER: (state, payload) => state.filter = payload,
  },
  actions: {
    setWorkFilter({ commit }, data){
      commit('SET_WORK_FILTER', data);
    },
    async setWorkOrder(state){
      let res = await axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/work_order/${auth.state.user.id}/${state.state.filter.key}`);
      state.commit('SET_WORK_ORDER', res['data']);
    },
    async getUsersList({}, data) {
      return await axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/user/list`, {userIds: data})
    },
    async getRecords({}, type){
      return await axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/records/${type}`);
    },
    postAction({}, data) {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/work_order`, data)
    },
    putAction({}, data){
      axios.put(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/work_order/${data['id']}`, data['query']);
    },
    deleteAction({}, actionID){
      axios.delete(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/work_order/${actionID}`);
    }
  }
};
