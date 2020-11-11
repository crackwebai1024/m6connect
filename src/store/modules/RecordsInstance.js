// this is a place to save and mutate which record and app is being showed
// along with triggering th start of the AppBuilderShow modal

const state = {
    currentRecord: {},
    displayAppBuilderShow: false
}

const getters = {}

const mutations = {
    setDisplayAppBuilderShow(state) {
        state.displayAppBuilderShow = !state.displayAppBuilderShow
    },
    setCurrentRecord(state, record) {
        state.currentRecord = record
    }
}

const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}