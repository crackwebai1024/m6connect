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
    async getRecords({}, type){
      return await axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/records/${type}`);
    },
    postAction({}, data) {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/work_order`, data)
    }
  }
};
