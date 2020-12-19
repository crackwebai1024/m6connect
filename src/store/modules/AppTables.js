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

  createAppTableRow(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/table_rows`, payload)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
    })
  },

  getTableRowValues(_, { tableID, recordID } = {}) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/table_rows/${tableID}/record/${recordID}`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
    })
  },

  deleteTableRowByID(_, tableRowID) {
    return new Promise((resolve, reject) => {
      axios.delete(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/table_rows/${tableRowID}`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
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
