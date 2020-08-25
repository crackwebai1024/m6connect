import MockData from '../MockData';

export default{
    namespaced: true,
    state: {
        projects: [],
    },
    getters: {
        get_projects: (state) => () => state.projects,
        get_info_data: (state) => (index) => state.projects[index],
    },
    mutations: {
        setAllProjects(state, proj) {
          state.projects = proj;
        },
    },
    actions: {
        set_projects({ commit }) {
          let data = MockData.fake_projects;
          commit("setAllProjects", data);
        },
    }
}