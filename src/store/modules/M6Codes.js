import axios from 'axios';
import { dataGet } from '@/utils/helpers'

const state = {
    unspc: {},
    companyTypes: {},
    regions: {},
    naics: {}
}

const getters = {
    getSpecificUNSPC(state){
        return id => {
            return state.unspc[id]
        }
    }
}

const mutations = {
    setUnspc(state, payload) {
        const unspc = {...state.unspc}
        unspc[payload.id] = payload.data
        state.unspc = unspc
    },
    setCodesGeneric(state, payload) {
        const codes = state[payload.key]
    }
}

const actions = {
    getCompanyTypes({ state, commit }, parents = '0') {
        if( state.unspc[parents] ) return Promise.resolve(state.unspc[parents])
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/search/companyTypes`, { parents })
                .then(res => {
                    commit('setUnspc', { data: res.data, id: parents})
                    resolve(res.data)
                })
                .catch(reject)
        })
    },

    getUnspcCodes({ state, commit }, parents = '0') {
        if( state.unspc[parents] ) return Promise.resolve(state.unspc[parents])
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/search/unspcCodes`, { parents })
                .then(res => {
                    commit('setUnspc', { data: res.data, id: parents})
                    resolve(res.data)
                })
                .catch(reject)
        })
    },
    
    getRegions({ state, commit }, parents = '0') {
        if( state.unspc[parents] ) return Promise.resolve(state.unspc[parents])
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/search/regions`, { parents })
                .then(res => {
                    commit('setUnspc', { data: res.data, id: parents})
                    resolve(res.data)
                })
                .catch(reject)
        })
    },

    getNaics({ state, commit }, parents = '0') {
        if( state.unspc[parents] ) return Promise.resolve(state.unspc[parents])
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/search/naicsCodes`, { parents })
                .then(res => {
                    commit('setUnspc', { data: res.data, id: parents})
                    resolve(res.data)
                })
                .catch(reject)
        })
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
