import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from './App.vue'
import router from './router'
import store from './store'

import api from "@/api";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.prototype.$api = api

Vue.prototype.$showError = function(text, user_error = false) {
  this.$bvToast.toast(text, {
    title: user_error ? "Hopsz" : "Hiba történt",
    toaster: 'b-toaster-top-center',
    solid: true,
    appendToast: false,
    variant: user_error ? "warning" : "danger"
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
