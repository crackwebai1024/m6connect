const endpoint = '/beta3'
const name = 'm6company'

export default [
  {
    name: `${name}.index`,
    path: `${endpoint}/company`,
    component: () => import(/* webpackChunkName: "m6company" */ '@/modules/companies/components/Company.vue')
  }
]
