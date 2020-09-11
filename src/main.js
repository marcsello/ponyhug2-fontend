import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

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

Vue.prototype.$showToast = function (text, type = 'error', local=true) {

    let options = {}
    switch (type) {
        case "error":
            options = {
                title: "Hiba történt!",
                variant: "danger"
            }
            break;
        case "user_error":
            options = {
                title: "Hopsz...",
                variant: "warning"
            }
            break;
        case "success":
            options = {
                title: "Yay!",
                variant: "success"
            }
            break;
    }

    const bvToast = local ? this.$bvToast : this.$root.$bvToast

    bvToast.toast(text, {
        ...options,
        toaster: 'b-toaster-top-center',
        solid: true,
        appendToast: false
    })
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
