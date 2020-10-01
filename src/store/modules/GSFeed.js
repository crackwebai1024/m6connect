import { connect } from 'getstream'
import axios from 'axios'

const defaultState = {
  gsToken: '',
  client: {},
  feed: {},
  timeline: []
}
const state = () => defaultState

const getters = {
  getTimeline: state => state.timeline
}

const mutations = {
  SET_GS_TOKEN: (state, payload) => state.gsToken = payload,
  SET_CLIENT: (state, token) => {
    state.client = connect(process.env.VUE_APP_GS_ID, token)
  },
  SET_FEED: async (state, userID) => {
    state.feed = await state.client.feed(
      'timeline',
      userID,
      state.gsToken
    )
  },
  SET_TIMELINE: (state, paylaod) => state.timeline = paylaod,
  SET_USER: async (state, payload) => {
    await state.client.setUser(
      payload,
      state.gsToken
    )
  }
}

const actions = {
  addActivity({ state }, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
      const activity = await state.feed.addActivity({
        ...payload,
        actor: state.client.currentUser
      })
      console.log(activity)
      resolve(true)
    })
  },
  getGSFeedToken({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/getGSFeedToken`, {
        id: payload.id
      }).then(({ data }) => {
        commit('SET_GS_TOKEN', data.token)
        commit('SET_CLIENT', data.token)
        resolve(data.token)
      }).catch(e => reject(e))
    })
  },
  retrieveFeed({ state, commit }) {
    return new Promise((resolve, reject) => {
      state.feed.get().then(({ results }) => {
        commit('SET_TIMELINE', results)
        resolve(true)
      }).catch(e => reject(e))
    })
  },
  followUser({ state }, { type, id }) {
    return new Promise(resolve => {
      state.state.client.feed.follow(type, id)
      resolve(true)
    })
  },
  setFeed({ commit }, payload) {
    return new Promise(resolve => {
      commit('SET_FEED', payload)
      resolve(true)
    })
  },
  setUser({ commit }, payload) {
    return new Promise(resolve => {
      commit('SET_USER', payload)
      resolve(true)
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
