import axios from 'axios'
const defaultState = {}
const state = () => defaultState
const getters = {}
const mutations = {}

const actions = {
  saveField(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/field`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  deleteField(_, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/field/${payload}`).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
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
