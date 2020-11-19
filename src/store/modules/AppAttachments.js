import axios from "axios";

export default{
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        async post_attachment({}, data){
            let res = await axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/file/app-builder`, data['file'], {
                headers: data['headers']
            });

            return res['data'];
        }
    }
}