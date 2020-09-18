import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import(/* webpackChunkName: 'Home' */ "@/views/Home");
const Tabs = () => import( /* webpackChunkName: 'Tabs' */ "@/views/Tabs");
const CompanyProfile = () => import( /* webpackChunkName: 'SignUp' */ "@/components/Profile");
const SignUp = () => import(/* webpackChunkName: 'SignUp' */ "@/views/Auth/SignUp");
const SignIn = () => import(/* webpackChunkName: 'SignIn' */ "@/views/Auth/SignIn");

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
      component: SignUp
    },
    {
      path: '/signin',
      name: "auth.SignIn",
      component: SignIn
    }
  ],
});
Vue.config.devtools = true;
router.beforeEach((to, from, next) => {
  next();
});

export default router;
