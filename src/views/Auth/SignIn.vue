<template>
    <auth-layout>
        <template #nav-btn >
            <router-link :to="{ name: 'auth.SignUp' }" class="text-dec-none float-right">
                <v-btn text class="custom-blue-text" >
                    Sign Up
                </v-btn>
            </router-link>
        </template>
        <template #header >
            <div class="d-flex justify-center">
                <h1 class="text-xs-6 custom-blue-text">
                    {{ $t('SignIn.title') }}
                </h1>
            </div>
            <div class="d-flex justify-center" >
                <span class="custom-blue-text" >
                    {{ $t('SignIn.subtitle') }}
                </span>
            </div>
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
                                    :append-icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off'"
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

            <m6-loading :loading="loading" />

            <m6-notification 
                :snackbar="notifShow" 
                :success="notifSuccess"
                :danger="notifDanger"
                top 
                :text="notifText"  
                @closing="resetNotif" 
            />

        </template>
    </auth-layout>
</template>

<script>
import AuthLayout from '@/components/Auth/AuthLayout'
import { mapActions } from 'vuex'

export default {
    components: {
        AuthLayout
    },
    data: () => ({
        notifShow: false,
        notifText: "",
        notifDanger: false,
        notifSuccess: false,
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
    methods: {
        ...mapActions('Auth', {
            userSignIn: 'signin'
        }),
        resetNotif() {
            this.notifShow = false
            this.notifSuccess = false
            this.notifDanger = false 
            this.notifText = ""
        },
        setNotif( success, text ){
            this.notifShow = true
            this.notifSuccess = success
            this.notifDanger = !success
            this.notifText = text
        },
        onPasswordClick() {
            this.showPass = !this.showPass
        },
        async SignIn() {
            this.loading = true
            if( !this.$refs.form.validate() ) {
                this.setNotif(false, 'Please fill in both fields')
                this.loading = false
                return
            } else {
                try {
                    await this.userSignIn(this.user)
                    this.loading = false
                    this.$router.push({ name: 'home' })

                } catch (error) {
                    if( error.type == "UserNotConfirmedException" ) {

                        this.$router.push({ 
                            name: 'auth.SignUp', 
                            query: { email: this.user.email } 
                        })
                    } else {
                        this.setNotif(false, this.$t('SignIn.error.signin'))
                    }
                    this.loading = false
                }  
            } 
        },
        getQueryParams() {
            const email = this.$h.dg(this.$route, 'query.email', '')
            if( email ) {
                this.user.email = email
            } 
        }
    },
    mounted() {
        this.getQueryParams()
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