import axios from 'axios';
import { dataGet } from '@/utils/helpers'

const state = {}

const getters = {}

const mutations = {}

const actions = {
    createRapidTicket({ commit }, rapidTicket) {
        axios.put(`http://${process.env.VUE_APP_ENDPOINT}/api/rapid/ticket`, { rapidTicket })
            .then(res => {
                console.log('res--------')
                console.log(res)
                resolve(res)
            })
            .catch(err => {
                reject(err)
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
