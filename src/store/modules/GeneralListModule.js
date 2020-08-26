import MockData from "../MockData";
import _ from "lodash";

export default {
  namespaced: true,
  state: {
    general_list: [],
    active_previews: [],
    idle_previews: []
  },
  getters: {
    get_general_list: (state) => () => state.general_list,
    get_active_previews: (state) => () => state.active_previews,
    get_idle_previews: (state) => () => state.idle_previews
  },
  mutations: {
    set_general_list_data(state, proj) {
      state.general_list = proj;
    },
    set_active_previews(state, new_data) {
      state.active_previews = new_data;
    },
    set_idle_previews(state, new_data) {
      state.idle_previews = new_data;
    }
  },
  actions: {
    load_mock_general_data({ commit }) {
      let data = MockData.fake_projects;
      commit("set_general_list_data", data);
    },
    push_data_to_active(context, preview_object) {
      // let received_preview = context.state.general_list.find((object) => {
      //   return object.uid === obj;
      // });
      if (context.state.active_previews.length !== 2) {
        context.state.active_previews.push(preview_object);
      } else {
        // Push 1st element from 'active_previews' to 'idle_previews'
        context.dispatch("push_data_to_idle", context.state.active_previews[0]);

        // Push 'received_preview' to 'active_previews'
        context.state.active_previews.push(preview_object);

        // Remove 1st element from 'active_previews'
        context.dispatch(
          "remove_from_active",
          context.state.active_previews[0].uid
        );
      }
      console.log(
        "context.state.active_previews",
        context.state.active_previews
      );
    },
    push_data_to_idle(context, preview_object) {
      // let received_preview = context.state.general_list.find((object) => {
      //   return object.uid === id;
      // });
      context.state.idle_previews.push(preview_object);
    },
    remove_from_active(context, id) {
      let newArray = _.remove(context.state.active_previews, function(n) {
        return n.uid != id;
      });
      context.commit("set_active_previews", newArray);
    },
    remove_from_idle(context, id) {
      let newArray = _.remove(context.state.idle_previews, function(n) {
        return n.uid != id;
      });
      context.commit("set_idle_previews", newArray);
    }
  }
};
