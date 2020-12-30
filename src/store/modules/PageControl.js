// meant to control top level vue widgets

const state = {
    showSidePanels: true
}

const getters = {}

const mutations = {
    setShowSidePanels(state, payload) {
        console.log('HIDING SIDE PANELS')
        state.showSidePanels = payload
    }
}

const actions = {
    setShowSidePanels({commit}, payload = true) {
        commit('setShowSidePanels', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}