import ProjectsListModule from "./ProjectsListModule";

export default{
    namespaced: true,
    state: {
        previewNavigationDrawer: false,
        active_projects: [],
        info_data: {
            name: "",
            imageUrl: "",
            email: "",
            contactPhone: "",
        },
    },
    getters: {
        get_preview_navigation_drawer: (state) => () => state.previewNavigationDrawer,
        get_active_projects: (state) => () => state.active_projects,
    },
    mutations: {
        setPreviewNavigationDrawer(state, drawer_state) {
          state.previewNavigationDrawer = drawer_state;
        },
        push_new_info_data_active(state, new_data) {
            state.active_projects.push(new_data)
        },
        setNewInfoData(state, newData) {
            state.info_data = newData;
        },
    },
    actions: {
        change_preview_navigation_drawer({ commit }, drawer_state) {
            commit("setPreviewNavigationDrawer", drawer_state);
        },
        push_info_data_active(context, id) {
            console.log('push_info_data_active', id)
            let searchProject = ProjectsListModule.state.projects.find((object)=>{
                return object.projecj_id === id
            })
            // console.log('Project Obj', searchProject)
            context.commit("push_new_info_data_active", searchProject)
        },
        set_info_data({ commit }, data) {
            commit("setNewInfoData", data);
        },
    }
}