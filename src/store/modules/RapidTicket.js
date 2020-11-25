import axios from 'axios';
import { dataGet } from '@/utils/helpers'

const state = {}

const getters = {}

const mutations = {}

const actions = {
    createRapidTickets( _, rapidTickets ) {
        return new Promise( (resolve, reject) => {
            axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/rapid/ticket`, { rapidTickets })
            .then( ({ data }) => resolve(data))
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
