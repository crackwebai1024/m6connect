import { db } from '@/utils/Firebase'
import axios from 'axios'

// const elkConfig = {
//   url: window.Drupal.settings.m6_platform.elastic.url,
//   key: window.Drupal.settings.m6_platform.elastic.key
// }
const state = {
}

const getters = {
}

const mutations = {
}

const actions = {
  create(_, { projectId, commitment }) {
    if (!projectId || !commitment) return Promise.reject('Bad Request when creating commitmnet')

    return new Promise((resolve, reject) => {
      db.collection('cpm_projects')
        .doc(projectId)
        .collection('commitments')
        .add(commitment)
        .then(async doc => {
          const post = {
            reference: `/cpm_projects/${projectId}/commitments/${doc.id}`,
            mainUID: projectId,
            mainCollection: 'cpm_projects',
            secondCollection: 'commitments',
            secondUID: doc.id,
            action: 'create',
            target: 'commitments'
          }

          // await axios.post(elkConfig.url, post, {
          //   headers: {
          //     'x-api-key': elkConfig.key
          //   }
          // })
          resolve(doc)
        })
        .catch(reject)
    })
  },

  update(_, { projectId, commitment = {} }) {
    if (!projectId || !commitment.id) return Promise.reject('Bad Request when updating commitment')

    return new Promise((resolve, reject) => {
      db.collection('cpm_projects')
        .doc(projectId)
        .collection('commitments')
        .doc(commitment.id)
        .update(commitment)
        .then(async doc => {
          const post = {
            reference: `/cpm_projects/${projectId}/commitments/${commitment.id}`,
            mainUID: projectId,
            mainCollection: 'cpm_projects',
            secondCollection: 'commitments',
            secondUID: commitment.id,
            action: 'update',
            target: 'commitments'
          }

          // await axios.post(elkConfig.url, post, {
          //   headers: {
          //     'x-api-key': elkConfig.key
          //   }
          // })
          resolve(doc)
        })
        .catch(reject)
    })
  },

  delete(_, { projectId, commitmentId = {} }) {
    if (!projectId || !commitmentId) return Promise.reject('Bad Request when deleting commitment')

    return new Promise(async (resolve, reject) => {
      const post = {
        reference: `/cpm_projects/${projectId}/commitments/${commitmentId}`,
        mainUID: projectId,
        mainCollection: 'cpm_projects',
        secondCollection: 'commitments',
        secondUID: commitmentId,
        action: 'delete',
        target: 'commitments'
      }
      // await axios.post(elkConfig.url, post, {
      //   headers: {
      //     'x-api-key': elkConfig.key
      //   }
      // })

      db.collection('cpm_projects')
        .doc(projectId)
        .collection('commitments')
        .doc(commitmentId)
        .delete()
        .then(resolve())
        .catch(reject)
    })
  },

  createLineItem(_, { commitmentRef, lineItem }) {
    if (!commitmentRef || !lineItem) return Promise.reject()

    return new Promise((resolve, reject) => {
      commitmentRef
        .collection('line_items')
        .add(lineItem)
        .then(resolve)
        .catch(reject)
    })
  },

  updateLineItem(_, { commitmentRef, lineItem, lineItemId }) {
    if (!commitmentRef || !lineItem || !lineItemId) return Promise.reject('bad request when updating line item')

    return new Promise((resolve, reject) => {
      commitmentRef
        .collection('line_items')
        .doc(lineItemId)
        .update(lineItem)
        .then(resolve)
        .catch(reject)
    })
  },

  deleteLineItem(_, { projectId, commitmentId, lineItemId }) {
    if (!projectId || !commitmentId || !lineItemId) return Promise.reject('bad request when updating line item')

    return new Promise((resolve, reject) => {
      db.collection('cpm_projects')
        .doc(projectId)
        .collection('commitments')
        .doc(commitmentId)
        .collection('line_items')
        .doc(lineItemId)
        .delete()
        .then(resolve)
        .catch(reject)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}