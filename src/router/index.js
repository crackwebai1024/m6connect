import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import(/* webpackChunkName: 'Home' */ "@/views/Home");
const Tabs = () => import( /* webpackChunkName: 'Tabs' */ "@/views/Tabs");
const CompanyProfile = () => import( /* webpackChunkName: 'SignUp' */ "@/components/Profile");
const SignUp = () => import(/* webpackChunkName: 'SignUp' */ "@/views/Auth/SignUp");
const SignIn = () => import(/* webpackChunkName: 'SignIn' */ "@/views/Auth/SignIn");
const ForgotPassword = () => import(/* webpackChunkName: 'ForgotPassword' */ "@/views/Auth/ForgotPassword");
const ResetPassword = () => import(/* webpackChunkName: 'ResetPassword' */ "@/views/Auth/ResetPassword");

import store from '../store/';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/company/:id",
      name: "company_profile",
      component: CompanyProfile,
    },
    {
      path: "/tabs",
      name: "tabs",
      component: Tabs
    },
    {
      path: "/signup",
      name: "auth.SignUp",
      component: SignUp,
      meta: {
        public: true
      }
    },
    {
      path: '/signin',
      name: "auth.SignIn",
      component: SignIn,
      meta: {
        public: true
      }
    },
    {
      path: '/forgotPassword',
      name: 'auth.ForgotPassword',
      component: ForgotPassword,
      meta: {
        public: true
      }
    },
    {
      path: '/ResetPassword',
      name: 'auth.ResetPassword',
      component: ResetPassword,
      meta: {
        public: true
      }
    }
  ],
});

Vue.config.devtools = true;

router.beforeEach(async (to, from, next) => {
  // Check if we have session in sessionStorage
  store.dispatch('Auth/searchForToken')
  let loggedIn = store.getters["Auth/loggedIn"]

  // Verify if route is public
  if (to.meta.public) {
    // Is public Route
    if ( loggedIn ) {
      // Authenticated User on public route
      if( to.name.split('.')[0] === 'auth' ) {
        next({ name: 'home' })
      } else {
        next()
      }
    } else {
      // Anonymous User on public route
      next()
    }
  } else {
    // Check always if im logged in
    try {      
      store.dispatch('Auth/searchForToken')
      let loggedIn = store.getters["Auth/loggedIn"]

      if( loggedIn ) {
        next()
      } else {
        next({ name: 'auth.SignIn' })
      }

    } catch (e) {
      next({ name: 'auth.SignIn' })
      console.error(e)
    }
  }
})


export default router;

