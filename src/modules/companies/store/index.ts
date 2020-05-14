// import M6Request from '@/shared/class/requests'
import { Company } from '@/modules/companies/interface'
import {
  VuexModule,
  Module,
  Mutation,
  Action
} from 'vuex-module-decorators'


@Module({ namespaced: true, name: 'CompanyStore' })
class CompanyStore extends VuexModule {
  // private http = new M6Request()
  private http: any
  public company!: Company

  get getCompany() {
    return this.company
  }

  @Mutation
  SET_COMPANY(company: Company): void {
    this.company = company
  }

  @Action({ commit: 'SET_COMPANY' })
  public fetchCompanyData(operation: string, fields: Array<any>, variables: object) {
    return new Promise<boolean>((resolve, reject) => {
      this.http.query(operation, fields, variables).then((response: any) => {
        resolve(true)
        return response
      }).catch(reject)
    })
  }
}
export default CompanyStore
