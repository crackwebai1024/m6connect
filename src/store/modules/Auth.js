import axios from 'axios';

const state = {};

const getters = {};

const mutations = {};

const actions = {
    signUp( context,  payload ) {
        return new Promise( (resolve, reject) => {
            // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            axios.post(`http://${process.env.VUE_APP_ENDPOINT}/api/auth/signup`, payload)
            .then( res => {
                console.log('res----')
                console.log(res)
                resolve(res)
            })
            .catch( err => reject(err))
        })
    },
    // signin( { }, payload ) {

    // },
    // confirmSignUp( { }, payload ) {

    // },
    // resendConfirmCode( { }, payload) {

    // },
    // confirmPasswordReset( { }, payload) {

    // }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}