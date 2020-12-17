import axios from 'axios'
const DynamicAppPosts     = () => import("@/components/RecordMode/RecordComponents/RecordType/DynamicApp/RecordPostListPreview.vue")
const PreviewTabsManager  = () => import("@/components/RecordMode/RecordComponents/RecordType/DynamicApp/PreviewTabsBuilder.vue")
const defaultState = {
  app: {}
}
const state = () => defaultState
const getters = {}
const mutations = {
  setCurrentApp(state, payload) {
    state.app = payload
  }
}

const actions = {
  async getNavigationPreView(context, appID) {
    const tabs = []
    const app = await context.dispatch('getApp', appID)

    app.tabs.forEach((tab, i) => {
      tabs.push({
        name: tab.title,
        index: i,
        component: PreviewTabsManager,
        icon: 'mdi-table-row'
      })
      if (i === 0) {
        tabs.push({
          name: 'Feed',
          component: DynamicAppPosts,
          icon: 'mdi-comment-quote'
        })
      }
    })

    return tabs
  },
  getApp({ commit }, payload = 1) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/app/${payload}`).then(({ data }) => {
        commit('setCurrentApp', data)
        resolve(data)
      }).catch(e => reject(e))
    })
  },

  getAppList() {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/app/list`).then(({ data }) => {
        resolve(data)
      })
        .catch(e => reject(e))
    })
  },

  updateApp(_, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/app`, payload)
        .then(resolve)
        .catch(reject)
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

  updateTab(_, { id, tabToEdit }) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/tab/${id}`, {
        tabToEdit
      }).then(({ data }) => {
        resolve(data)
      }).catch(e => reject(e))
    })
  },

  switchOrderTabs(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/tab/switch-order`, payload)
        .then(resolve)
        .catch(reject)
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
  createRecord(_, payload) {
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

  updatePanel(_, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/panel/${payload.id}`, payload).then(({ data }) => {
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
      axios.put(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/record/${payload.id}`, payload).then(({ data }) => {
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
  },

  bulkSaveFieldValues(_, payload) {
    return new Promise(resolve => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/field_values`, payload).then(({ data }) => {
        resolve(data)
      })
        .catch(err => resolve(err))
    })
  },

  getFieldValuesPerPanel(_, { recordID, panelID } = {}) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/field_values/by_panel/${recordID}/${panelID}`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
    })
  },

  updateSomeFieldValues(_, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/field_values/some`, payload)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
    })
  },

  deleteFieldsByIds(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/field_values/fieldsByIds`, payload)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
    })
  },

  deleteApp(_, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/app/${payload}`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
    })
  },

  recordsByApps(_, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/records_by_apps`, payload)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(e => reject(e))
    })
  },

  getSingleRecordFieldValue(_, { recordID, fieldID, refID } = {}) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/field_values/reference/${recordID}/${fieldID}/${refID}`)
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
