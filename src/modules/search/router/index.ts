const name = 'search'

export default [
  {
    name: `${name}.index`,
    path: '/search',
    component: (): ImportMeta =>
      import(/* webpackChunkName: "search" */ '@/modules/search/components/Search.vue')
  }
]
