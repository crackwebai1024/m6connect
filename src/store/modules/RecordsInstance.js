// this is a place to save and mutate which record and app is being showed
// along with triggering th start of the AppBuilderShow modal
import axios from 'axios'

const state = {
    currentRecord: {},
    displayAppBuilderShow: false
}

const getters = {}

const mutations = {
    setDisplayAppBuilderShow(state) {
        state.displayAppBuilderShow = !state.displayAppBuilderShow
    },
    setCurrentRecord(state, record) {
        state.currentRecord = record
    }
}

const actions = {
    getRecordById({ commit }, id) {
        return new Promise( (resolve, reject) => {
            axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/record/${id}`).then( ({ data }) => {
                commit('setCurrentRecord', data)
                resolve(data)
            })
            .catch( e => reject(e) )
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