import { SearchHit } from '@/modules/search/interface'
import {
  VuexModule,
  Module,
  Mutation,
  Action
} from 'vuex-module-decorators'


@Module({ namespaced: true, name: 'SearchStore' })
class CompanyStore extends VuexModule {
  
}
export default CompanyStore
