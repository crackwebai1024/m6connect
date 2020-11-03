import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import { API } from 'aws-amplify'

Vue.use(firestorePlugin)
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID
}

export let db = {}
export let storage = {}
let firebaseInitiated = false
let firebaseCPMApp = null
const getToken = true

// const init = () => {
//   if (!firebaseInitiated) {
//     firebaseCPMApp = firebase.initializeApp(config)
//     Object.freeze(firebase)
//     db = firebase.firestore()
//     storage = firebase.storage()
//     firebaseInitiated = true

//     // eslint-disable-next-line no-console
//     console.log('Firebase Ready')
//   } else {
//     // eslint-disable-next-line no-console
//     console.log('Firebase is running')
//   }
// }

// export default init

export const destroyFirebase = () => {
  if (firebaseInitiated) {
    firebaseCPMApp.delete()
    firebaseInitiated = false
    // eslint-disable-next-line no-console
    console.log('Firebase Delete')
  } else {
    // eslint-disable-next-line no-console
    console.log('Firebase not initiated')
  }
}

export const doFirebaseAuth = () => new Promise(async (resolve, reject) => {
  // eslint-disable-next-line no-console
  console.log('Starting Firebase Auth')

  const token = await API.get('rest', '/firebase/getToken')
  firebase
    .auth()
    .signInWithCustomToken(token.token)
    .then(() => {
      resolve(true)
      // eslint-disable-next-line no-console
      console.log('Firebase Auth Done')
    }).catch(e => reject(e))
})

export const newFirebaseInit = () => new Promise(async (resolve, reject) => {
  try {
    if (!firebase.apps.length) {
      firebaseCPMApp = firebase.initializeApp(config)
      firebaseInitiated = true
      db = firebase.firestore()
      storage = firebase.storage()
    }

    resolve(true)
  } catch (e) {
    console.log('Firebase init')
    reject(e)
  }
})
