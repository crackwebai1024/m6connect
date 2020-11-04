import { connect } from 'getstream'
import axios from 'axios'
import auth from './Auth'

const defaultState = {
  room: '',
  gsToken: '',
  client: {},
  feed: {},
  actionPost: {},
  feedNotification: {},
  timeline: [],
  appGsId: process.env.VUE_APP_GS_ID,
  appId: process.env.VUE_APP_ID
}
const state = () => defaultState

const getters = {
  getFeedNotification: state => state.feedNotification,
  getTimeline: state => state.timeline,
  getActionPost: state => state.actionPost,
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
  SET_COMPANIES_FEED: async (state, feedID) => {
    state.feedNotification = await state.client.feed(
      'notification',
      feedID,
      state.gsToken
    )
    state.feed = await state.client.feed(
      'companies',
      feedID,
      state.gsToken
    )
  },
  SET_ROOM: (state, payload) => state.room = payload,
  SET_TIMELINE: (state, payload) => state.timeline = payload,
  SET_USER: async (state, payload) => {
    await state.client.setUser(
      payload,
      state.gsToken
    )
  },
  UPDATE_USER: (state, payload) => {
    state.client.user(payload['id']).update(payload);
  },
  SET_ACTION_POST: (state, payload) => {
    axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/feed/activities/${payload.room}/${payload.id}`).then( res => {
      state.actionPost = res.data;
      state.actionPost['props'] = payload['props'];
    })
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
        state.client.reactions.update(response.id, {"text":text} ).then(res => {
          resolve(res)
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
      payload['req']['room'] = state.room;
      payload['req']['data']['time'] = new Date().toISOString();
      payload['req']['data']['foreign_id'] = `${Date.now()}-post-${Math.floor(Math.random() * 9999999)}`;
      if (state.room === 'companies') {
        payload['req']['data']['to'] = ['companies:global']
        payload['req']['data']['company'] = payload['compID']
      }
      
      const activity = await axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/feed/activity`, {
        ...payload['req']
      });
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
  updateActivity({}, updateProperties) {
    return new Promise(resolve => {
      axios.put(`http://${process.env.VUE_APP_ENDPOINT}/api/feed/activity/${auth.state.user.id}`, updateProperties).then(res => {
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
      if (state.room === 'companies') {
        let comp = auth.state.user.companies.items.find(res => res.active === true);

        axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/feed/activities/${state.room}/${comp.company.id}`).then(res => {
          commit('SET_TIMELINE', res.data)
          resolve(true)
        }).catch(e => reject(e));
      }else{
        state.feed.get({
          reactions: { own: true, recent: true, counts: true }
        }).then(({ results }) => {
          commit('SET_TIMELINE', results)
          resolve(true)
        }).catch(e => reject(e))
      }
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
  setCompanyFeed({ commit }, payload) {
    return new Promise(resolve => {
      commit('SET_COMPANIES_FEED', payload)
      resolve(true)
    })
  },
  setUser({ commit }, payload) {
    return new Promise(resolve => {
      commit('SET_USER', payload)
      resolve(true)
    })
  },
  setRoom({ commit }, slugRoom) {
    commit('SET_ROOM', slugRoom)
  },
  updateUser({ commit }, payload){
    return new Promise(resolve => {
      commit('UPDATE_USER', payload)
      resolve(true)
    })
  },
  setActionPost({ commit }, payload){
    return new Promise(resolve => {
      commit('SET_ACTION_POST', payload)
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
