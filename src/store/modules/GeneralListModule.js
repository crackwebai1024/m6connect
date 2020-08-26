import MockData from "../MockData";
import Data from "../data"
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
      let validator = false;
      context.state.active_previews.forEach(element => {
        if(element === preview_object){
          validator = true;
        }
      });
      if(!validator){
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
            context.state.active_previews[0]
          );
        }
        let index = context.state.idle_previews.indexOf(preview_object);
        if(index>=0){
          context.state.idle_previews.splice(index, 1)
        }
      }
    },
    push_data_to_idle(context, preview_object) {
      context.state.idle_previews.push(preview_object);
    },
    remove_from_active(context, item) {
      let newArray = _.remove(context.state.active_previews, function(n) {
        return n != item;
      });
      context.commit("set_active_previews", newArray);
    },
    remove_from_idle(context, id) {
      let newArray = _.remove(context.state.idle_previews, function(n) {
        return n.uid != id;
      });
      context.commit("set_idle_previews", newArray);
    },
    get_nav_widgets(cont, preview_list_widget_data){
      return Data.get_widgets_previews(preview_list_widget_data);
    },
    hidden_preview(context, item){
      context.dispatch("remove_from_active",item);
      context.dispatch("push_data_to_idle", item);
    },
    show_preview_of_idle(context, item){
      context.dispatch("remove_from_idle",item);
      context.dispatch("push_data_to_active", item);
    }
  }
};
