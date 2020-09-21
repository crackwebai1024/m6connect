import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Tabs from "@/views/Tabs";
import CompanyProfile from '@/components/Profile'
import Companies from '@/components/Companies'
import Apps from '@/components/Apps'
import StoreFront from '@/components/Store'

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
      path: "/apps",
      name: "apps",
      component: Apps
    },
    {
      path: "/companies",
      name: "companies",
      component: Companies
    },
    {
      path: "/store",
      name: "store",
      component: StoreFront
    }
  ],
});
Vue.config.devtools = true;
router.beforeEach((to, from, next) => {
  next();
});

export default router;
