import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import companyRouter from '@/modules/companies/router'
import searchRouter from '@/modules/search/router'

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'm6company.index' }
  },
  ...companyRouter,
  ...searchRouter
]

const router = new VueRouter({
  routes
})

export default router
