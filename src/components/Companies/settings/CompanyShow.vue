<template>
    <div  >
        <v-card>
            <v-card-text>
                <v-form ref="form" > 
                    <v-container pa-0>
                        <h1 class="text-center blue--text pb-3" >Edit Your Company</h1>
                        <v-tabs
                            v-model="tab"
                            color="blue darken-1"
                            grow
                        >
                            <v-tab>General</v-tab>
                            <v-tab>Project Specs</v-tab>
                            <v-tab>Social Media</v-tab>
                            <v-tab>Locations</v-tab>
                            <v-tab>Profile Image</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab" class="pt-3" >
                            <v-tab-item>
                                <v-row>
                                    <v-col col-xs-12 col-md-4 class="pt-0" >
                                        <v-text-field v-model="company.legalCompanyName" label="Legal Company Name" :rules="rules.genericRules" />
                                    </v-col>
                                    <v-col col-xs-12 col-md-4 class="pt-0" >
                                        <v-text-field v-model="company.name" label="Company Name" :rules="rules.genericRules" />
                                    </v-col>
                                    <v-col col-xs-12 col-md-4 class="pt-0" >
                                        <v-text-field v-model="company.email" label="Public Company Email" :rules="rules.emailRules" />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col col-xs-12 col-md-4 class="pt-0" >
                                        <vue-tel-input-vuetify v-model="company.phone" label="Public Company Phone" :rules="rules.genericRules" />
                                    </v-col>
                                    <v-col col-xs-12 col-md-4 class="pt-0" >
                                        <v-text-field v-model="company.website" label="Company Website" />
                                    </v-col>
                                    <v-col col-xs-12 col-md-4 class="pt-0" >
                                        <v-autocomplete 
                                            :items="OSHPDOlist" 
                                            v-model="company.preferredOSDHPDClass" 
                                            label="Prefered OSHPD Class" 
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col col-xs-12 col-md-12 class="pt-0" >
                                        <v-autocomplete 
                                            label="Company Insurance Status"
                                            v-model="company.companyInsuranceStatus"
                                            :items="companyInsuranceStatus"
                                            multiple
                                            chips
                                            item-text="label"
                                            item-value="val"
                                        />
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col col-xs-12 col-md-6 class="pt-0" >
                                        <vuetify-money 
                                            v-model="company.projectSize.from" 
                                            :options="options" 
                                            label="Project Size From" 
                                        />
                                    </v-col>
                                    <v-col col-xs-12 col-md-6 class="pt-0" >
                                        <vuetify-money 
                                            v-model="company.projectSize.to" 
                                            :options="options" 
                                            label="Project Size To" 
                                        />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col col-xs-12 col-md-6 class="pt-0" >
                                        <vuetify-money 
                                            v-model="company.projectCapability.from" 
                                            :options="options" 
                                            label="Project Capability From" 
                                        />
                                    </v-col>
                                    <v-col col-xs-12 col-md-6 class="pt-0" >
                                        <vuetify-money 
                                            v-model="company.projectCapability.to" 
                                            :options="options" 
                                            label="Project Capability To" 
                                        />
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col cols="12" class="text-right pa-0" >
                                        <v-tooltip left>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn 
                                                    v-on="on" 
                                                    v-bind="attrs" 
                                                    icon 
                                                    color="green darken-2" 
                                                    dark
                                                    @click="socialMediaAdd"
                                                >
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Add A New Link</span>
                                        </v-tooltip>
                                    </v-col>
                                    <v-col>
                                        <social-media-c-u 
                                            :items="this.company.socialMediaLinks" 
                                            @change=" e => company.socialMediaLinks = e" 
                                        />
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <company-address-table :locations="company.locations" />
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col col="12" class="text-right pa-0 pr-3" >
                                        <m6-upload 
                                            btnButton="purple" 
                                            @response="reponseProfileImg" 
                                            @loading="loading = !loading" 
                                        >
                                            <v-icon>mdi-cloud-upload</v-icon>
                                        </m6-upload>
                                    </v-col>
                                </v-row>
                                <v-row >
                                    <v-col col="12" class="text-center pa-0" >
                                        <img v-if="$h.dg(company, 'logo')" :src="$h.dg(company, 'logo')" class="round-img" alt="user profile image">

                                        <v-icon v-else size="5rem" >mdi-bank</v-icon>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                        </v-tabs-items>
                        
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn class="green darken-2 white--text" @click="updating" >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>

        <m6-loading :loading="loading" />
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import SocialMediaCU from './CompanyShowSubComponents/SocialMediaCU'
import CompanyAddressTable from './CompanyShowSubComponents/CompanyAddressTable'

export default {
    name: "CompanyShow",
    components: {
        SocialMediaCU,
        CompanyAddressTable
    },
    data: () => ({
        tab: null,
        defaultSocialMediaLink: { icon: "", name: "", link: "" },
        value: "",
        options: {
            locale: "en-US",
            decimal: '.',
            thousands: ',',
            prefix: "$",
            suffix: "",
            length: 12,
            precision: 2
        },
        company: {
            projectCapability: { to: "", from: "" },
            projectSize: { to: "", from: "" }
        },
        loading: false,
        OSHPDOlist: Array.from({length:20},(v,k)=>k+1),
        rules: {
            genericRules: [
                v => !!v || 'This field is required',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            websiteRules: [
                v => !!v || 'Website is required',
                v => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(v) || "Website must be valid"
            ]
        }
    }), 
    computed: {
        ...mapState('Companies', {
            currentCompany: 'currentCompany',
            companyInsuranceStatus: "companyInsuranceStatus"
        })
    },
    methods: {
        ...mapActions('Companies', {
            updateCompany: 'updateCompany'
        }),
        ...mapMutations('SnackBarNotif', {
            notifDanger: 'notifDanger',
            notifSuccess: 'notifSuccess' 
        }),
        validate() {
            return this.$refs.form.validate()
        },
        async reponseProfileImg(res) {
            if(res.ok) {
                this.company.logo = res.data.link

                try {
                    this.loading = true
                    await this.updateCompany(this.company)
                    this.loading = false
                    this.notifSuccess('Company Updated!')
                } catch(e) {
                    this.loading = false
                    this.notifDanger('There was an error while saving the file')  
                }
                
            } else {
                this.notifDanger('There was an error while saving the file')
            }
        },
        async updating() {
            if( !this.validate() ) {
                this.notifDanger('Please fill in all of the fields')
                return 
            }
            
            try{
                this.loading = true
                await this.updateCompany(this.company)
                this.loading = false
                this.notifSuccess('The company was saved')
            } catch(e) {
                this.loading = false
                this.notifDanger('There was an error while saving the user')
            }
        },
        socialMediaAdd() {
            this.company.socialMediaLinks.push({...this.defaultSocialMediaLink})
        },
    },
    mounted() {
        const company = {...this.currentCompany}
        if( !company.projectCapability ) company.projectCapability = { to: "0", from: "0" }
        if( !company.projectSize ) company.projectSize = { to: "0", from: "0" }
        if( !company.socialMediaLinks ) company.socialMediaLinks = []
        if( !company.locations ) company.locations = []

        console.log('company-----')
        console.log(company)

        this.company = company
    }
}
</script>

<style lang="scss" scoped>
.round-img {
  object-fit: cover;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  margin-bottom: -0.5rem;
}
</style>