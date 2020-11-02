import axios from "axios";

export default {
  namespaced: true,
  state: {
  },
  getters: {  
  },
  mutations: {
  },
  actions: {
    async getWorkOrder(){
      let res = await axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/work_order/deleted_at/null`);
      return res['data'];
    },
    async getUsersList({}, data) {
      return await axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/user/list`, {userIds: data})
    },
    async getRecords({}, type){
      return await axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/records/${type}`);
    },
    postAction({}, data) {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/work_order`, data)
    }
  }
};
