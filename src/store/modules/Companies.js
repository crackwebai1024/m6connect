import axios from 'axios'

const state = {
  list: [],
  currentCompany: []
}

const getters = {
  getCurrentCompanyUsers(state) {
    if (state.currentCompany.users) {
      return state.currentCompany.users.items || []
    }
    return []
  }
}

const mutations = {
  setCompanyList(state, payload) {
    state.list = payload
  },
  setCurrentCompany(state, payload) {
    state.currentCompany = payload
  }
}

const actions = {
  getList({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/companies`)
        .then(res => {
          resolve(res)
          commit('setCompanyList', res.data.items)
        })
        .catch(err => reject(err))
    })
  },
  getCompanyByID({ commit }, companyID) {
    return new Promise((resolve, reject) => {
      axios.get(`http://${process.env.VUE_APP_ENDPOINT}/api/companies/company/${companyID}`)
        .then(res => {
          commit('setCurrentCompany', res.data)
          resolve(res)
        })
        .catch(err => reject(err))
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
