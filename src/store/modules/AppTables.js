import axios from 'axios'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  createTable(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/app_tables`, payload)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
    })
  },
  updateTable(_, { id, title } = {}) {
    return new Promise((resolve, reject) => {
      axios.put(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/app_tables/${id}`, { title })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
    })
  },
  getTableFields(_, tableID) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/app_tables/${tableID}/fields`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
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
