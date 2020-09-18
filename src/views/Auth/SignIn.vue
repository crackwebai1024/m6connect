<template>
    <auth-layout>
        <template #nav-btn >
            <router-link to="/signup" class="text-dec-none float-right">
                <v-btn text class="custom-blue-text" >
                    Sign Up
                </v-btn>
            </router-link>
        </template>
        <template #header >
            <h1 class="text-xs-6 custom-blue-text">
                {{ $h.dg(currentScreen, 'signin.title', '') || $t('SignIn.title') }}
            </h1>
            <span class="custom-blue-text" >
                {{ $h.dg(currentScreen, 'signin.subtitle', '') || $t('SignIn.subtitle') }}
            </span>
        </template>
        <template #body >
            <v-form ref="form" >
                <v-container >
                    <v-row justify="center">
                        <v-col 
                            cols="10"
                        >
                            <v-flex >
                                <v-text-field 
                                    dark
                                    v-model="user.email"
                                    :label="$t('SignIn.email')"
                                    :rules="rules.email"
                                />
                            </v-flex>
                            
                            <v-flex >
                                <v-text-field
                                    dark
                                    v-model="user.password"
                                    :append-icon="showPass ? 'visibility' : 'visibility_off'"
                                    counter
                                    :hint="$t('SignIn.minCharacters', { num: '8' })"
                                    :label="$tc('SignIn.password', 1)"
                                    :rules="[rules.required, rules.min]"
                                    :type="showPass ? 'text' : 'password'"
                                    @click:append="onPasswordClick"
                                    @keyup.enter="SignIn"
                                />
                            </v-flex>

                            <v-btn color="#a4ceea" @click="SignIn" >
                                <span class="black--text" >{{ $t('SignIn.login') }}</span>
                            </v-btn>
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
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        AuthLayout
    },
    data: () => ({
        screen: {},
        customBlue: "#a4ceea",
        loading: false,
        user: {
            email: '',
            password: ''
        },
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
    computed: {
        ...mapGetters('screens', {
            currentScreen: 'currentScreen'
        }),
        ...mapGetters('auth', {
            currentUser: 'getCurrentUser'
        }),
        ...mapGetters('redirects', {
            isLocalHost: 'isLocalHost',
            isProd: 'isProd',
            isUat: 'isUat'
        })
    },
    methods: {
        ...mapActions('auth', {
            userSignIn: 'signIn'
        }),
        ...mapActions('users', {
            getUserByID: 'getUserByID',
            createUser: 'create'
        }),
        onPasswordClick() {
            this.showPass = !this.showPass
        },
        async SignIn() {
            this.loading = true
            if( !this.$refs.form.validate() ) {
                this.$snotify.error('Please fill in both fields', 'Error')
                return
            } else {
                try {
                    const user = await this.userSignIn(this.user)
 
                    const cognitoUser = await this.getUserByID( user.attributes["custom:dynamoID"] )
                    if( cognitoUser == null ) {
                        await this.createUser(cognitoUser)
                        await this.getUserByID( user.attributes["custom:dynamoID"] )
                    }
                    
                    this.loading = false
                    const screenLinksExist = Boolean( this.$h.dg(this.currentScreen, 'id', '').length )
                    
                    switch (true) {
                        
                        case this.isUat && screenLinksExist :
                            window.location.href = this.currentScreen.uatLink
                            break

                        case this.isProd && screenLinksExist : 
                            window.location.href = this.currentScreen.prodLink
                            break
                        
                        default:
                            this.$router.push({ name: 'defaultSignedIn' })
                            break
                    }
                } catch (error) {
                    if( error.code == "UserNotConfirmedException" ) {
                        this.$router.push({ 
                            name: 'auth.signup', 
                            query: { email: this.user.email } 
                        })
                    } else {
                        this.$snotify.error(this.$t('SignIn.error.signin'), this.$t('general.error'))
                    }
                    this.loading = false
                }  
            }  
        },  
    },
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
.header-btns {
    float: right;
}
.text-dec-none {
    text-decoration: none;
}
.float-right {
    float: right;
}
</style>