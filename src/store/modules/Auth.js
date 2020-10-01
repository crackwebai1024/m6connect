import axios from 'axios'
import { dataGet } from '@/utils/helpers'

const state = {
  AccessToken: "",
  IdToken: "",
  exp: "",
  user: {},
  statusColors:{
    PENDING: "#e3aa27",
    ACTIVE: "#59cf51",
    INACTIVE: "#bf2121"
  }
};

const getters = {
  loggedIn(state) {
    return (state.exp * 1000) >= +new Date()
  },
  getUser(state) {
    return state.user
  },
  getCurrentUserCompanies(state) {
    return dataGet(state, 'user.companies.items', [])
  }
}

const mutations = {
  setTokens(state, payload) {
    state.AccessToken = payload.AccessToken
    state.IdToken = payload.IdToken
    state.exp = payload.exp
    window.localStorage.setItem('m6Token', JSON.stringify(payload))
  },
  setUser(state, payload) {
    state.user = payload
  }
}

const actions = {
  getUserData({ state, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      const { IdToken } = state
      axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/auth/getUser`, {
        IdToken
      })
        .then(res => {const companyRel = res.data.companies.items.find( c => c.active )
          dispatch('Companies/getCompanyByID', companyRel.company.id, { root: true })
          commit('setUser', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  searchForToken({ commit }) {
    const str = window.localStorage.getItem('m6Token')
    if (str) {
      const m6token = JSON.parse(str)
      commit('setTokens', m6token)
    }
  },
  signUp(context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/auth/signup`, payload)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  confirmCode(context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/auth/confirmSignup`, payload)
        .then(res => {
          resolve(res)
        })
        .catch(reject)
    })
  },
  signin({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/auth/signin`, payload)
        .then(res => {
          commit('setTokens', res.data)
          resolve(res.data)
        })
        .catch(err => {
          reject(dataGet(err, 'response.data'))
        })
    })
  },
  confirmPasswordReset(context, params) {
    return new Promise((resolve, reject) => {
      axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/auth/confirmPasswordReset`, params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(dataGet(err, 'response.data'))
        })
    })
  },
  startPasswordReset(context, email) {
    return new Promise((resolve, reject) => {
      axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/auth/startPasswordReset`, {
        email
      })
        .then(resolve)
        .catch(err => {
          reject(dataGet(err, 'response.data'))
        })
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
