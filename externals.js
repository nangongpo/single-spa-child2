function camelCase(name) {
  return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(/^moz([A-Z])/, 'Moz$1')
}

module.exports = function(isURL) {
  const externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex'
    // axios: 'axios'
  }
  if (isURL) {
    const getURL = function(key) {
      return `/single-spa-parent/static/${camelCase(key)}.dll.js`
    }
    return Object.keys(externals).reduce((t, v) => [...t, getURL(v)], [])
  }
  return externals
}
