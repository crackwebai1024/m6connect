import MockData from "../MockData";
import _ from "lodash";

export default {
  namespaced: true,
  state: {
    screen_status: false,
    record_full_screen : {
      register_type: "record",
      record_name: "Ruthenium Gada",
      uid: "7q312",
      phase: "asdasd",
      company: "m6connect",
      department: "Design",
      record_leader: "",
      record_support: "",
      designer: "",
      role_two: "",
      client_status: "",
      internal_description: "",
      internal_objective: "",
      record_image_url:
        "https://picsum.photos/1280/720?nocache=" + Math.random(),
      client_original_request: "",
      client_requested_due_date: "",
      client_in_take_clarification_description: "",
      client_follow_up_date: "",
      image_url_type: "record_image_url",
      widgets:[
        'Request', 'Tickets', 'By Company','Meeting Notes'
      ]
    },
    active_previews: [],
    idle_previews: [],
    general_list: []
  },
  getters: {
    get_record_full_screen : (state) => () => state.record_full_screen,
    get_active_previews: (state) => () => state.active_previews,
    get_screen_status: (state) => () => state.screen_status,
    get_idle_previews: (state) => () => state.idle_previews,
    get_general_list: (state) => () => state.general_list
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
    },
    preview_screen(state){
      state.screen_status = false;
    },
    full_screen(state, item){
      state.record_full_screen = item;
      state.screen_status = true;
    },
    push_to_idle(state, data){
      state.idle_previews.push(data);
    }
  },
  actions: {
    load_mock_general_data({ commit }) {
      let data = MockData.fake_records;
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
    push_data_to_idle({commit}, preview_object) {
      commit("push_to_idle", preview_object)
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
    hidden_preview(context, item){
      context.dispatch("remove_from_active",item);
      context.dispatch("push_data_to_idle", item);
    },
    show_preview_of_idle(context, item){
      context.dispatch("remove_from_idle",item);
      if(context.state.screen_status){
        context.dispatch("remove_from_idle", item.uid);
        context.dispatch("push_data_to_idle", context.state.record_full_screen);
        context.dispatch("full_screen", item);
      }else{
        context.dispatch("push_data_to_active", item);
      }
    },
    full_screen(context, item){
      context.commit("full_screen", item);
      context.dispatch("remove_from_active", item);
      if(context.state.active_previews.length>0)
        context.dispatch("hidden_preview", context.state.active_previews[0]);
    },
    preview_screen(context, item){
      context.commit("preview_screen")
      context.dispatch("push_data_to_active", item);
    },
    close_full_screen({commit}){
      commit("preview_screen");
    },
    hidden_full_screen({commit}, object){
      commit("preview_screen");
      commit("push_to_idle", object);
    }
  }
};
