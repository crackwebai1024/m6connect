// meant to control top level vue widgets

const state = {
    showSidePanels: true
}

const getters = {}

const mutations = {
    setShowSidePanels(state, payload) {
        state.showSidePanels = payload
    }
}

const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}