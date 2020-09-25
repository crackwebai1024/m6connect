import axios from 'axios'
import { StreamChat } from 'stream-chat'

const defaultState = {
  gsToken: '',
  chats: [],
  client: {}
}
const state = () => defaultState

const getters = {
  gsToken: state => state.gsToken,
  chats: state => state.chats,
  client: state => state.client
}

const mutations = {
  SET_GS_TOKEN: (state, payload) => state.gsToken = payload,
  PUSH_CHAT: (state, payload) => {
    if (!state.chats.includes(payload)) {
      if (state.chats.length > 4) {
        state.chats.shift()
      }
      state.chats.push(payload)
    }
  },
  REMOVE_CHAT: (state, payload) => {
    if (state.chats.includes(payload)) {
      const index = state.chats.indexOf(payload)
      if (index > -1) {
        state.chats.splice(index, 1)
      }
    }
  },
  SET_CHATS: (state, payload) => state.chats = payload,
  SET_CLIENT: state => {
    state.client = new StreamChat(process.env.VUE_APP_GS_ID)
  },
  SET_USER: async (state, payload) => {
    await state.client.setUser(payload, state.gsToken)
  }
}

const actions = {
  createChat() {},
  getGSToken({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/getGSToken`).then(({ data }) => {
        commit('SET_GS_TOKEN', data.token)
        commit('SET_CLIENT')
      }).catch(e => reject(e))
    })
  },
  pushChat({ commit }, payload) {
    return new Promise(resolve => {
      commit('PUSH_CHAT', payload)
      resolve(true)
    })
  },
  removeChat({ commit }, payload) {
    return new Promise(resolve => {
      commit('REMOVE_CHAT', payload)
      resolve(true)
    })
  },
  async retrieveChats({ state, commit }) {
    const filter = {
      type: 'messaging',
      members: {
        $in: ['thierry']
      }
    }
    // eslint-disable-next-line camelcase
    const sort = { last_message_at: -1 }

    const channels = await state.client.queryChannels(filter, sort, {
      watch: true,
      state: true
    })
    commit('SET_CHATS', channels)
    for (const c of channels) {
      console.log(c.custom.name, c.cid)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
