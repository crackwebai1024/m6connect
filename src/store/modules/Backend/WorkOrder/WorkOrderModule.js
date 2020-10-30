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
      console.log(res['data']);
      return res['data'];
    },
    async getRecords(){
      return await axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/records`);
    }
  }
};
