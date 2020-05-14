module.exports = {
  lintOnSave: false,
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    },
    port: '8121',
    disableHostCheck: true,
    hot: true,
    writeToDisk: true,
  },
}