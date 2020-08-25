import MockData from "../MockData";

export default{
    namespaced: true,
    state: {
        posts_data: [],
    },
    getters: {
        get_posts_data: (state) => () => state.posts_data,
    },
    mutations: {
        set_posts_info_data(state, data){
            state.posts_data = data;
        },
    },
    actions: {
        set_posts_data({commit}){
            let data = MockData.fake_posts;
            commit('set_posts_info_data', data)
        },
    }
}