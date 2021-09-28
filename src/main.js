import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import singleSpaVue from 'single-spa-vue'


Vue.config.productionTip = false

const appOptions = {
  el: '#microApp',
  router,
  store,
  render: h => h(App)
}

if (!window.singleSpaNavigate) {
  delete appOptions.el
  new Vue(appOptions).$mount('#app')
}

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions
})

export const bootstrap = vueLifecycles.bootstrap
export const mount = vueLifecycles.mount
export const unmount = vueLifecycles.unmount
