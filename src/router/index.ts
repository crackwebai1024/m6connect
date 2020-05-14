import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import companyRouter from '@/modules/companies/router'

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'm6company.index' }
  },
  ...companyRouter
]

const router = new VueRouter({
  routes
})

export default router
