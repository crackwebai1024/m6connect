import { connect } from 'getstream'
import axios from 'axios'

const defaultState = {
  gsToken: '',
  client: {},
  feed: {},
  feedNotification: {},
  timeline: [],
  appGsId: process.env.VUE_APP_GS_ID,
  appId: process.env.VUE_APP_ID
}
const state = () => defaultState

const getters = {
  getFeedNotification: state => state.feedNotification,
  getTimeline: state => state.timeline,
  getFeed: state => state.feed,
  getClient: state => state.client
}

const mutations = {
  SET_GS_TOKEN: (state, payload) => state.gsToken = payload,
  SET_CLIENT: (state, token) => {
    state.client = connect(process.env.VUE_APP_GS_ID, token, process.env.VUE_APP_ID)
  },
  SET_FEED: async (state, userID) => {
    state.feedNotification = await state.client.feed(
      'notification',
      userID,
      state.gsToken
    )
    state.feed = await state.client.feed(
      'users',
      userID,
      state.gsToken
    )
  },
  SET_TIMELINE: (state, payload) => state.timeline = payload,
  SET_USER: async (state, payload) => {
    await state.client.setUser(
      payload,
      state.gsToken
    )
  }
}

const actions = {
  addChildReaction({ state }, comment ) {
    return new Promise(resolve => {
      state.client.reactions.addChild("like", comment, state.client.id).then(response => {
        resolve(response)
      })
    })
  },
  addChildReactionComment({ state }, {comment, text} ) {
    return new Promise(resolve => {
      state.client.reactions.addChild(
        "comment", 
        comment, 
        state.client.id
      ).then((response) => {
        state.client.reactions.update(response.id, {"text":text} ).then(response => {
          resolve(response)
        })
      })
    })
  },
  addReaction({ state }, { type, id, whoNotify, options = null }) {
    return new Promise(resolve => {
      state.client.reactions.add(type, id, options,  { targetFeeds:  [`notification:${whoNotify}`] }).then(response => {
        resolve(response)
      })
    })
  },
  addActivity({ state }, payload) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
      // const attachments = await Promise.all(payload.images.map(async image => {
      //   console.log(image)
      //   await state.client.images.upload(image)
      // }))
      // console.log(attachments)
      const activity = await state.feed.addActivity({
        ...payload,
        actor: state.client.currentUser
      })
      resolve(activity)
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
  removeActivity({ state }, id) {
    return new Promise(resolve => {
      state.feed.removeActivity(id).then(response => {
        resolve(response)
      })
    })
  },
  updateActivity({ state }, updateProperties) {
    return new Promise(resolve => {
      axios.put(`http://${process.env.VUE_APP_ENDPOINT}/api/feed/activity`, updateProperties).then(res => {
        console.log(res.data);
        resolve(true);
      });
    })
  },
  removeReaction({ state }, id) {
    return new Promise(resolve => {
      state.client.reactions.delete(id).then(response => {
        resolve(response)
      })
    })
  },
  updateReaction({ state }, {id, text}) {
    return new Promise(resolve => {
      state.client.reactions.update(id, {"text": text}).then(response => {
        resolve(response)
      })
    })
  },
  retrieveFeed({ state, commit }) {
    return new Promise((resolve, reject) => {
      state.feed.get({
        reactions: { own: true, recent: true, counts: true }
      }).then(({ results }) => {
        commit('SET_TIMELINE', results)
        resolve(true)
      }).catch(e => reject(e))
    })
  },
  retrieveActivityReactions({ state }, id) {
    return new Promise(async (resolve, reject) => {
      const reactions = await state.client.reactions.filter({
        'activity_id': id,
        'kind': 'comment'
      });
      resolve(reactions)
    })
  },
  retrieveChildReactions({ state }, reaction_id) {
    return new Promise(async (resolve, reject) => {
      const reactions = await state.client.reactions.filter({
        'reaction_id': reaction_id,
        'kind': 'comment',
      });
      resolve(reactions)
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
