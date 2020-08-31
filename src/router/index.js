import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Tabs from "@/views/Tabs";
import CompanyProfile from '@/components/Profile'

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
    }
  ],
});
Vue.config.devtools = true;
router.beforeEach((to, from, next) => {
  next();
});

export default router;
