import axios from 'axios'
import { dataGet } from '@/utils/helpers'

const state = {
  AccessToken: '',
  userDynamoID: '',
  exp: ''
}

const getters = {
  loggedIn(state) {
    return (state.exp * 1000) >= +new Date()
  }
}

const mutations = {
  setTokens(state, payload) {
    state.AccessToken = payload.AccessToken
    state.userDynamoID = payload.userDynamoID
    state.exp = payload.exp
    window.localStorage.setItem('m6Token', JSON.stringify(payload))
  }
}

const actions = {
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
          resolve(res)
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
