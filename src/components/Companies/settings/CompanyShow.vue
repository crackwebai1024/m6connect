<template>
    <div  >
        <v-card>
            <v-card-text>
                <v-form ref="form" > 
                    <v-container pa-0>
                        <v-row>
                            <v-col col-xs-12 col-md-12 class="text-right pa-0" >
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
                            <v-col col-xs-12 class="text-center pa-0" >
                                <img v-if="$h.dg(company, 'logo')" :src="$h.dg(company, 'logo')" class="round-img" alt="user profile image">

                                <v-icon v-else size="5rem" >mdi-bank</v-icon>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col col-xs-12 col-md-6 class="pt-0" >
                                <v-text-field v-model="company.legalCompanyName" label="Legal Company Name" :rules="rules.genericRules" />
                            </v-col>
                            <v-col col-xs-12 col-md-6 class="pt-0" >
                                <v-text-field v-model="company.name" label="Company Name" :rules="rules.genericRules" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col col-xs-12 col-md-6 class="pt-0" >
                                <v-text-field v-model="company.email" label="Public Company Email" :rules="rules.emailRules" />
                            </v-col>
                            <v-col col-xs-12 col-md-6 class="pt-0" >
                                <v-text-field v-model="company.phone" label="Public Company Phone" :rules="rules.genericRules" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col col-xs-12 class="pt-0" >
                                <v-text-field v-model="company.website" label="Company Website" :rules="rules.websiteRules" />
                            </v-col>
                        </v-row>
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
export default {
    data: () => ({
        company: {},
        loading: false,
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
            currentCompany: 'currentCompany'
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
        }
    },
    mounted() {
        this.company = {...this.currentCompany}
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