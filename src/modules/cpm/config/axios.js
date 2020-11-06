export default {
  firestoreApiUrl: process.env.VUE_APP_FIREBASE_APIURL,
  config: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  }
}
