<template>
    <auth-layout>
        <template #nav-btn >
            <router-link :to="{ name: 'auth.SignIn' }" class="text-dec-none float-right">
                <v-btn text class="custom-blue-text" >
                    Sign In
                </v-btn>
            </router-link>
        </template>
        <template #header >
            <div class="d-flex justify-center">
                <h1 class="text-xs-6 custom-blue-text">
                    {{ $t('ForgotPassword.title') }}
                </h1>
            </div>
            <div class="d-flex justify-center">
                <span class="custom-blue-text" >
                    {{ $t('ForgotPassword.subtitle') }}
                </span>
            </div>
        </template>
        <template #body >
            <div >
                <v-container  >
                    <v-row justify="center" >

                        <v-col cols="12" xs="12" md="8" class="pt-0" >
                            <v-text-field 
                                dark
                                v-model="email"
                                :label="$t('ForgotPassword.email')"
                                :rules="rules.email"
                            />
                            <div class="d-flex justify-center">
                                <v-btn color="#a4ceea" @click="forgotPass" >
                                    <span class="black--text" >{{ $t('ForgotPassword.button') }}</span>
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </template>
        <m6-loading :loading="loading" />
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

        loading: false,
        email: '',
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
            startPasswordReset: 'startPasswordReset'
        }),
        onPasswordClick() {
            this.showPass = !this.showPass
        },
        forgotPass() {
            this.loading = true

            this.startPasswordReset(this.email)
            .then(data => {
                this.loading = false
                console.log(data)
                // this.$snotify.success(this.$t('ForgotPassword.success.checkEmail'), this.$t('general.success'))
                this.$router.push({ name: 'auth.ResetPassword', query: { email: this.email } })
            })
            .catch(err => {
                console.log('startPasswordReset - error')
                console.log(err)
                // this.$snotify.error(this.$t('ForgotPassword.error.resetPass'), this.$t('general.error'))
                this.loading = false
            })
        }
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
.float-right {
    float: right;
}
</style>