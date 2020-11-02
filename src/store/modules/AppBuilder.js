import axios from 'axios'
const defaultState = {}
const state = () => defaultState
const getters = {}
const mutations = {}

const actions = {
  getApp(_, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/app/${payload}`).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  listTabs(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/tab/list`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  listPanels(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/panel/list`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  listFields(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/field/list`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  listRecords(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/record/list`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },

  listFieldValue(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/fieldValue/list`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },


  saveTab(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/tab`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  savePanel(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/panel`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  saveField(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/field`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  saveRecord(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/record`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  saveFieldValue(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/fieldValue`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  updateTab(_, payload) {
    return new Promise((resolve, reject) => {
      axios.patch(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/tab/${payload.id}`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  updatePanel(_, payload) {
    return new Promise((resolve, reject) => {
      axios.patch(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/panel/${payload.id}`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  updateField(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/field/${payload.id}/update`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  updateRecord(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/record/${payload.id}`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  updateFieldValue(_, payload) {
    return new Promise((resolve, reject) => {
      axios.patch(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/fieldValue/${payload.id}`, payload).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  deleteTab(_, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/tab/${payload}`).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  deletePanel(_, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/panel/${payload}`).then(({ data }) => {
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
  },
  deleteRecord(_, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/record/${payload}`).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },
  deleteFieldValue(_, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/fieldValue/${payload}`).then(({ data }) => {
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
