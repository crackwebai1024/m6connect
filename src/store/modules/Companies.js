import axios from 'axios';
import { dataGet } from '@/utils/helpers'

const state = {
    list: [],
    currentCompany: {},
    userCompanyStatus: [
        { text: "Status" }
    ]
};

const getters = {
    getCurrentCompanyUsers(state) {
        return dataGet(state, 'currentCompany.users.items', [])
    }
};

const mutations = {
    setCompanyList(state, payload) {
        state.list = payload;
    },
    setCurrentCompany(state, payload) {
        state.currentCompany = payload;
    }
};

const actions = {
    getList( { commit } ) {
        return new Promise( (resolve, reject) => {
            axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/companies`)
            .then( res => {
                resolve(res)
                commit('setCompanyList', res.data.items)
            })
            .catch( err => reject(err))
        })
    },
    getCompanyByID({ commit }, companyID) {
        return new Promise( (resolve, reject) => {
            axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/companies/company/${ companyID }`)
            .then( res => {
                commit('setCurrentCompany', res.data)
                resolve(res)
            })
            .catch( err => reject(err))
        })
    },

    updateUserCompany(context, userCompany) {
        return new Promise( (resolve, reject) => {
            axios.put(`http://${process.env.VUE_APP_ENDPOINT}/api/companies/userCompany`, { userCompany })
            .then(res => {
                resolve(res)
            })
            .catch(reject)
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