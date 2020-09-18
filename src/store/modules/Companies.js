import axios from 'axios';

const state = {
    list: []
};

const getters = {};

const mutations = {
    setCompanyList(state, payload) {
        state.list = payload;
    }
};

const actions = {
    getList( { commit } ) {
        return new Promise( (resolve, reject) => {
            // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/companies`)
            .then( res => {
                console.log('res.data.items----')
                console.log(res.data.items)
                resolve(res)
                commit('setCompanyList', res.data.items)
            })
            .catch( err => reject(err))
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}