import Vue from "vue";
import Vuex from "vuex";
import Data from "./data";

Vue.use(Vuex);

const wi = "1280";
const le = "1280";

export default new Vuex.Store({
  state: {
    active_projects: [],
    idle_projects: [],
    info_carousel:[],
    posts_data: [],
    projects: [],
    workers: [],
    user_data:{},
    info_data: {
      name: "",
      imageUrl: "",
      email: "",
      contactPhone: "",
    },
    viewsList: Data.get_views_list(),
    tabs: Data.get_tabs(),
    request_table_header: Data.get_request_table_header(),
    ticket_table_header: Data.get_ticket_table_header(),
    previewNavigationDrawer: false,
    bootom_template: false
  },
  getters: {
    // View Home Getters
    get_active_projects: (state) => () => state.active_projects,
    get_info_carousel: (state) => () => state.info_carousel,
    get_posts_data: (state) => () => state.posts_data,
    get_views_list: (state) => () => state.viewsList,
    get_user_data: (state) => () => state.user_data,
    get_projects: (state) => () => state.projects,
    get_workers: (state) => () => state.workers,
    // Return the first project or the data saved
    get_info_data: (state) => (index) => state.projects[index],
    // View Tabs Getters
    get_preview_navigation_drawer: (state) => () => state.previewNavigationDrawer,
    get_request_table_header: (state) => () => state.request_table_header,
    get_ticket_table_header: (state) => () => state.ticket_table_header,
    get_tabs: (state) => () => state.tabs,
    // Tables Getters
    get_bootom_template: (state) => state.bootom_template
  },
  mutations: {
    setAllProjects(state, proj) {
      state.projects = proj;
    },
    push_new_info_data_active(state, new_data) {
      state.active_projects.push(new_data)
    },
    setAllWorkers(state, work) {
      state.workers = work;
    },
    setNewInfoData(state, newData) {
      state.info_data = newData;
    },
    setPreviewNavigationDrawer(state, drawer_state) {
      state.previewNavigationDrawer = drawer_state;
    },
    set_new_status_bootom_template(state, data){
      state.bootom_template = data;
    },
    set_posts_info_data(state, data){
      state.posts_data = data;
    },
    set_user_info_data(state, data){
      state.user_data = data;
    },
  },
  actions: {
    change_preview_navigation_drawer({ commit }, drawer_state) {
      commit("setPreviewNavigationDrawer", drawer_state);
    },
    set_projects({ commit }) {
      let data = [
        {
          project_name: "New Vallarta 1",
          projecj_id: "1123",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url:
            "https://picsum.photos/" +
            wi +
            "/" +
            le +
            "?nocache=" +
            Math.random(),
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 2",
          projecj_id: "2321",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url:
            "https://picsum.photos/" +
            wi +
            "/" +
            le +
            "?nocache=" +
            Math.random(),
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 3",
          projecj_id: "34123",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url:
            "https://picsum.photos/" +
            wi +
            "/" +
            le +
            "?nocache=" +
            Math.random(),
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 4",
          projecj_id: "4312",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url:
            "https://picsum.photos/" +
            wi +
            "/" +
            le +
            "?nocache=" +
            Math.random(),
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 5",
          projecj_id: "5123",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url:
            "https://picsum.photos/1280/720?nocache=" + Math.random(),
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 6",
          projecj_id: "6231",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url:
            "https://picsum.photos/" +
            wi +
            "/" +
            le +
            "?nocache=" +
            Math.random(),
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 7",
          projecj_id: "7q312",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url:
            "https://picsum.photos/1280/720?nocache=" + Math.random(),
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 8",
          projecj_id: "81231",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url:
            "https://picsum.photos/" +
            wi +
            "/" +
            le +
            "?nocache=" +
            Math.random(),
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 9",
          projecj_id: "91231",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url:
            "https://picsum.photos/" +
            wi +
            "/" +
            le +
            "?nocache=" +
            Math.random(),
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
        {
          project_name: "New Vallarta 10",
          projecj_id: "101233",
          phase: "asdasd",
          company: "m6connect",
          department: "Design",
          project_leader: "",
          project_support: "",
          designer: "",
          role_two: "",
          client_status: "",
          internal_description: "",
          internal_objective: "",
          projet_image_url:
            "https://picsum.photos/1280/720?nocache=" + Math.random(),
          client_original_request: "",
          client_requested_due_date: "",
          client_in_take_clarification_description: "",
          client_follow_up_date: "",
        },
      ];
      commit("setAllProjects", data);
    },
    set_info_data({ commit }, data) {
      commit("setNewInfoData", data);
    },
    set_workers({ commit }) {
      let data = [
        {
          name: "Raul Mercado",
          imageUrl:
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
          email: "raulmercado@mail.com",
          contactPhone: "2321235465",
        },
        {
          name: "Natalia Portman",
          imageUrl:
            "https://images.pexels.com/photos/5119189/pexels-photo-5119189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          email: "nataliaportman@mail.com",
          contactPhone: "1233546529",
        },
      ];
      commit("setAllWorkers", data);
    },
    set_status_bootom_template({commit}, data) {
      commit("set_new_status_bootom_template", data);
    },
    push_info_data_active(context, id) {
      console.log('push_info_data_active', id)
      let searchProject = context.state.projects.find((object)=>{
        return object.projecj_id === id
      })
      // console.log('Project Obj', searchProject)
      context.commit("push_new_info_data_active", searchProject)
    },
    set_posts_data({commit}){
        let data = [
          {
              contain: "Ad do incididunt reprehenderit enim est laborum. Enim dolore do est eu incididunt. Commodo commodo occaecat tempor magna anim. Minim aute nisi culpa sint est et officia elit. Eiusmod eiusmod cupidatat qui qui mollit et irure nulla eiusmod reprehenderit culpa dolor laboris. Consequat pariatur cillum anim minim.",
              name: "Jose Manuel Valdez Gonzalez",
              imageUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
              occupation: "IT Apps (Department)",
              images:[
                  {url:"https://www.pngitem.com/pimgs/m/160-1600311_free-png-download-happy-person-png-images-background.png"},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
              ],
              reactions: {
                  likes: 100,
                  enchants: 23,
                  unlikes: 21
              },
              comments:[{
                  name: "Eduardo Ramirez",
                  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg",
                  message: "In duis ea irure et magna quis commodo sunt enim fugiat anim eu. Consequat ex eu eiusmod culpa tempor officia aute excepteur ex consequat esse occaecat nostrud. Aliqua irure eiusmod duis occaecat consectetur aute officia in incididunt ut exercitation do. Eiusmod irure tempor reprehenderit do minim nostrud proident reprehenderit. Irure aute do proident duis Lorem tempor. Nisi sit eiusmod duis qui elit voluptate tempor aute.",
                  reactions: {
                      likes: 17,
                      enchants: 21,
                      unlikes: 6
                  },
                  timestamps:{
                      created: '14min'
                  }
              },{
                  name: "Eduardo Ramirez",
                  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg",
                  message: "In duis ea irure et magna quis commodo sunt enim fugiat anim eu. Consequat ex eu eiusmod culpa tempor officia aute excepteur ex consequat esse occaecat nostrud. Aliqua irure eiusmod duis occaecat consectetur aute officia in incididunt ut exercitation do. Eiusmod irure tempor reprehenderit do minim nostrud proident reprehenderit. Irure aute do proident duis Lorem tempor. Nisi sit eiusmod duis qui elit voluptate tempor aute.",
                  reactions: {
                      likes: 17,
                      enchants: 21,
                      unlikes: 6
                  },
                  timestamps:{
                      created: '14min'
                  }
              },]
          },{
              contain: "Ad do incididunt reprehenderit enim est laborum. Enim dolore do est eu incididunt. Commodo commodo occaecat tempor magna anim. Minim aute nisi culpa sint est et officia elit. Eiusmod eiusmod cupidatat qui qui mollit et irure nulla eiusmod reprehenderit culpa dolor laboris. Consequat pariatur cillum anim minim.",
              name: "Jose Manuel Valdez Gonzalez",
              imageUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
              occupation: "IT Apps (Department)",
              images:[
                  {url:"https://picsum.photos/1280/720?nocache=" + Math.random()},
              ],
              reactions: {
                  likes: 100,
                  enchants: 23,
                  unlikes: 21
              },
              comments:[{
                  name: "Eduardo Ramirez",
                  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg",
                  message: "In duis ea irure et magna quis commodo sunt enim fugiat anim eu. Consequat ex eu eiusmod culpa tempor officia aute excepteur ex consequat esse occaecat nostrud. Aliqua irure eiusmod duis occaecat consectetur aute officia in incididunt ut exercitation do. Eiusmod irure tempor reprehenderit do minim nostrud proident reprehenderit. Irure aute do proident duis Lorem tempor. Nisi sit eiusmod duis qui elit voluptate tempor aute.",
                  reactions: {
                      likes: 17,
                      enchants: 21,
                      unlikes: 6
                  },
                  timestamps:{
                      created: '14min'
                  }
              },{
                  name: "Eduardo Ramirez",
                  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg",
                  message: "In duis ea irure et magna quis commodo sunt enim fugiat anim eu. Consequat ex eu eiusmod culpa tempor officia aute excepteur ex consequat esse occaecat nostrud. Aliqua irure eiusmod duis occaecat consectetur aute officia in incididunt ut exercitation do. Eiusmod irure tempor reprehenderit do minim nostrud proident reprehenderit. Irure aute do proident duis Lorem tempor. Nisi sit eiusmod duis qui elit voluptate tempor aute.",
                  reactions: {
                      likes: 17,
                      enchants: 21,
                      unlikes: 6
                  },
                  timestamps:{
                      created: '14min'
                  }
              },]
          },{
              contain: "Ad do incididunt reprehenderit enim est laborum. Enim dolore do est eu incididunt. Commodo commodo occaecat tempor magna anim. Minim aute nisi culpa sint est et officia elit. Eiusmod eiusmod cupidatat qui qui mollit et irure nulla eiusmod reprehenderit culpa dolor laboris. Consequat pariatur cillum anim minim.",
              name: "Jose Manuel Valdez Gonzalez",
              imageUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
              occupation: "IT Apps (Department)",
              images:[],
              reactions: {
                  likes: 100,
                  enchants: 23,
                  unlikes: 21
              },
              comments:[{
                  name: "Eduardo Ramirez",
                  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg",
                  message: "In duis ea irure et magna quis commodo sunt enim fugiat anim eu. Consequat ex eu eiusmod culpa tempor officia aute excepteur ex consequat esse occaecat nostrud. Aliqua irure eiusmod duis occaecat consectetur aute officia in incididunt ut exercitation do. Eiusmod irure tempor reprehenderit do minim nostrud proident reprehenderit. Irure aute do proident duis Lorem tempor. Nisi sit eiusmod duis qui elit voluptate tempor aute.",
                  reactions: {
                      likes: 17,
                      enchants: 21,
                      unlikes: 6
                  },
                  timestamps:{
                      created: '14min'
                  }
              },{
                  name: "Eduardo Ramirez",
                  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg",
                  message: "In duis ea irure et magna quis commodo sunt enim fugiat anim eu. Consequat ex eu eiusmod culpa tempor officia aute excepteur ex consequat esse occaecat nostrud. Aliqua irure eiusmod duis occaecat consectetur aute officia in incididunt ut exercitation do. Eiusmod irure tempor reprehenderit do minim nostrud proident reprehenderit. Irure aute do proident duis Lorem tempor. Nisi sit eiusmod duis qui elit voluptate tempor aute.",
                  reactions: {
                      likes: 17,
                      enchants: 21,
                      unlikes: 6
                  },
                  timestamps:{
                      created: '14min'
                  }
              },]
          }
        ];
        commit('set_posts_info_data', data)
    },
    set_user_data({commit}){
      let user_data = {
        id:'123asd123',
        name: 'Jose Manuel Valdez Gonzalez',
        imageUrl: "https://cdn.vuetifyjs.com/images/john.jpg",
        occupation: "IT Apps (Department)",
      }
      commit("set_user_info_data", user_data)
    },
  },
  modules: {},
});
