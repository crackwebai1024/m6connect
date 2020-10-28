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

    multiSetUnspc(state, payload) {
        state.unspc = {...state.unspc, ...payload}
    },

    setRegions(state, payload) {
        state.regions[payload.id] = payload.data
        console.log('setRegions------------------------')
        console.log(state.regions)
    },

    mutliSetRegions(state, payload) {
        state.regions = {...state.regions, ...payload}
    },
}

const actions = {
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

    getUnspcCodesByIds( { commit }, ids = [] ) {
        return new Promise( (resolve, reject) => {
            axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/search/unspcCodes/ids`, { ids })
            .then( res => {
                commit('multiSetUnspc', res.data)  
                resolve(res.data)
            })
            .catch(reject)
        })
    },

    getCompanyTypes({ state, commit }, parents = '0') {
        if( state.unspc[parents] ) return Promise.resolve(state.unspc[parents])
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/search/companyTypes`, { parents })
                .then(res => {
                    console.log('getCompanyTypes')
                    console.log(res)
                    commit('setUnspc', { data: res.data, id: parents})
                    resolve(res.data)
                })
                .catch(reject)
        })
    },

    getCompanyTypesByIds({ state, commit }, ids = []) {
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/search/companyTypes/ids`, { ids })
                .then(res => {
                    console.log('res============')
                    console.log(res)
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
                    console.log('regions')
                    console.log(res)
                    commit('setRegions', { data: res.data, id: parents})
                    resolve(res.data)
                })
                .catch(reject)
        })
    },

    getRegionsByIds({ state, commit }, ids = [] ) {
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/search/regions/ids`, { ids })
                .then(res => {
                    console.log('res - regions')
                    console.log(res)
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
                    console.log('naics')
                    console.log(res)
                    commit('setUnspc', { data: res.data, id: parents})
                    resolve(res.data)
                })
                .catch(reject)
        })
    },

    getNaicsByIds({ state, commit }, ids = [] ) {
        return new Promise((resolve, reject) => {
            axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/search/naicsCodes/ids`, { ids })
                .then(res => {
                    console.log('ids---naics')
                    console.log(res)
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
