<template>
    <auth-layout>
        <template #nav-btn >
            <router-link to="/signin" class="text-dec-none float-right"  >
                <v-btn text class="custom-blue-text"  >
                    Sign In
                </v-btn>
            </router-link>

        </template>
        <template #header >
            <v-flex class="d-flex justify-center" >
                <h1 class="text-xs-6 custom-blue-text">
                    {{ $t('SignUp.signup') }}
                </h1>
            </v-flex>
            <v-flex class="d-flex justify-center" >
                <span class="custom-blue-text" >
                    {{ $t('SignUp.subtitle') }}
                </span>
            </v-flex>
        </template>
        <template #body >
            <v-form ref="form" >
                <v-container :class=" $vuetify.breakpoint.sm ? null : 'pa-0'" >
                    <div v-if="confirmEmail" >
                        <v-text-field 
                            class="mx-4"
                            v-model="codeConfirm" 
                            :label="$t('SignUp.getConfirmationCode')" 
                            dark 
                        />
                        <div class="d-flex justify-center" >
                            <v-btn :color="customBlue" @click="confirmSignUp" >
                                <span class="black--text" >Confirm</span>
                            </v-btn>
                        </div>
                    </div>
                    <v-row justify="center" v-else >
                        <v-col cols="12" xs="12" md="5" class="pb-0" >
                            <v-text-field 
                                dark
                                :label="$t('SignUp.firstName')"
                                v-model="user.firstName"
                                :rules="[rules.required]"
                            />
                        </v-col>

                        <v-col cols="12" xs="12" md="5" class="pb-0" >
                            <v-text-field 
                                dark
                                v-model="user.lastName"
                                :label="$t('SignUp.lastName')"
                                :rules="[rules.required]"
                            />
                        </v-col>

                        <v-col cols="12" xs="12" md=10 class="pt-0" >
                            <v-text-field 
                                dark
                                v-model="user.email"
                                :label="$t('SignUp.email')"
                                :rules="rules.email"
                            />
                            

                            <v-combobox
                                dark
                                :items="companiesList"
                                item-text="name"
                                item-value="id"
                                return-object
                                v-model="user.company"
                                :label="$t('SignUp.companyName')"
                                :rules="[rules.required]"
                            />

                            <v-text-field
                                dark
                                v-model="user.password"
                                :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off'"
                                counter
                                :hint="$t('SignIn.minCharacters', { num: '8' })"
                                :label="$tc('SignIn.password', 1)"
                                :rules="[rules.required, rules.min]"
                                :type="showPass ? 'text' : 'password'"
                                @click:append="onPasswordClick"
                            />
                            
                            

                            <v-text-field
                                dark
                                v-model="user.passwordConfirm"
                                :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off'"
                                counter
                                :hint="$t('SignIn.minCharacters', { num: '8' })"
                                :label="$tc('SignUp.passwordConfirm', 1)"
                                :rules="[rules.required, rules.min]"
                                :type="showPass ? 'text' : 'password'"
                                @click:append="onPasswordClick"
                            />

                            <div class="d-flex justify-center" >
                                <v-btn :color="customBlue" @click="signUp" >
                                    <span class="black--text" >{{ $t('SignUp.signup') }}</span>
                                </v-btn>
                            </div>

                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>

        <m6-loading :loading="loading" />
    </auth-layout>
</template>

<script>
import AuthLayout from '@/components/Auth/AuthLayout'
import { mapActions, mapState } from 'vuex'
// mapMutations
import { v4 } from 'uuid'

export default {
    components: {
        AuthLayout
    },
    data: () => ({
        codeConfirm: "",
        loading: false,
        customBlue: "#a4ceea",
        confirmEmail: false,
        confirmationCode: "",
        user: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        reg: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
        showPass: false,
        rules: {
            required: value => !!value || 'Required.',
            counter: value => value.length <= 20 || 'Max 20 characters',
            min: v => v.length >= 8 || 'Min 8 characters',
            email: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        },
    }),
    methods: {
        // ...mapActions('auth', {
        //     userSignUp: 'signUp',
        //     resetConfirmCode: 'resetConfirmCode',
        //     userConfirmCode: 'confirmCode'
        // }),
        ...mapActions('Companies', {
            // createCompanyOnSignUp: 'createCompanyOnSignUp',
            listCompanies: 'getList',
            // createUserCompanyConnection: 'createUserCompany'
        }),
        // ...mapMutations('auth', {
        //     setCurrentUser: 'setCurrentUser'
        // }),
        // ...mapMutations('companies', {
        //     setUserCompany: 'setUserCompany'
        // }),
        // ...mapActions('users', {
        //     createUser: 'create'
        // }),
        ...mapActions('Auth', {
            signUpUser: 'signUp'
        }),
        onPasswordClick() {
            this.showPass = !this.showPass
        },
        validate() {
            if(!this.$refs.form.validate()) {
                this.$snotify.error(this.$t('general.fillAllFields'), this.$t('general.error'))
                return false
            }

            if(this.user.password !== this.user.passwordConfirm) {
                this.$snotify.error(this.$t('SignUp.error.passwordsDontMath'), this.$t('general.error'))
                return false
            }

            if( !this.reg.test(this.user.password) ) {
                this.$snotify.error(this.$t('SignUp.error.RegexCheck'))
                return false
            }

            return true
        }, 
        async signUp() {
            if( !this.validate() ) {
                return
            }

            try{    
                this.loading = true 
               
                await this.signUpUser(this.user)

                // this.$snotify.success(this.$t('SignUp.success.created'), this.$t('general.success'))
                this.confirmEmail = true
                this.loading = false
            } catch(e) {
                console.log('error')
                console.log(e)
                // let errorMsg = this.$t('SignUp.error.signUpErr')
                // if( e.code === 'UsernameExistsException' ) errorMsg = e.message
                // this.$snotify.error(errorMsg , this.$t('general.error'))
                // this.loading = false

                // if( e.code === 'UsernameExistsException' ) this.$router.push({ name: 'auth.signedin' })
            }
        },
        async signUpOLD() {
            if( !this.validate() ) {
                return
            }

            try{    
                this.loading = true 
                const userDynamoID = v4()

                const userObj = {
                    username: this.user.email,
                    password: this.user.password,
                    attributes: {
                        name: this.user.firstName,
                        family_name: this.user.lastName,
                        email: this.user.email,
                        "custom:dynamoID": userDynamoID,
                    }
                }
                // herehere
                typeof this.user.company === "string" ?
                    await this.createCompanyOnSignUp(this.user.company) :
                    this.setUserCompany(this.user.company)
                await this.createUserCompanyConnection( userDynamoID )
                await this.userSignUp(userObj)
               
                await this.createUser(userObj)

                this.$snotify.success(this.$t('SignUp.success.created'), this.$t('general.success'))
                this.confirmEmail = true
                this.loading = false
            } catch(e) {
                let errorMsg = this.$t('SignUp.error.signUpErr')
                if( e.code === 'UsernameExistsException' ) errorMsg = e.message
                this.$snotify.error(errorMsg , this.$t('general.error'))
                this.loading = false

                if( e.code === 'UsernameExistsException' ) this.$router.push({ name: 'auth.signedin' })
            }
        },
        async confirmSignUp() {
            try {
                this.loading = true

                await this.userConfirmCode({ code: this.codeConfirm })
                this.$snotify.success(this.$t('SignUp.signUpConfirmed'), this.$t('general.success'))
                this.loading = false
                this.$router.push({ name: 'auth.signin' })
            } catch (error) {
                this.$snotify.error(this.$t('SignUp.error.codeConfirmError'), this.$t('general.error'))
                this.loading = false
            }
        },
        async getDataFromQuery() {
            const email = this.$h.dg(this.$route, 'query.email', '')

            if( email.length ) { 
                this.setCurrentUser({ username: email })
                this.confirmEmail = true 

                try {
                    this.loading = true
                    await this.resetConfirmCode()
                    this.loading = false
                    this.$snotify.success( 
                        this.$t('SignUp.success.ConfirmCodeResent'), 
                        this.$t('general.success')
                    )
                } catch (err) {
                    this.$snotify.error(
                        this.$t('SignUp.error.ConfirmCodeResentError'),
                        this.$t('general.error')
                    )
                    this.loading = false
                }
            }
        }

    },
    computed: {
        // ...mapGetters('screens', {
        //     currentScreen: 'currentScreen'
        // }),
        ...mapState('Companies', {
            companiesList: 'list',
            // getUserCompany: 'getUserCompany'
        })
    },
    mounted() {
        this.getDataFromQuery()
        this.listCompanies()
    }
}
</script>

<style lang="scss" scoped >
.bottom-logo {
    width: 25%;
    height: auto;
}
.custom-blue-text {
  color: #a4ceea !important;
}
input[type=password] {
  letter-spacing: 0.30em;
}
.text-dec-none {
  text-decoration: none;
}
.float-right {
    float: right;
}
</style>