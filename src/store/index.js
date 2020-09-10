import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        playerdata: {
            name: null,
            is_admin: null,
            registered: false
        }
    },

    mutations: {
        storePlayerData(state, playerdata) {
            state.playerdata = {
                name: playerdata.name,
                is_admin: playerdata.is_admin,
                registered: true
            }
        }
    },

    actions: {
        storePlayerData({commit}, playerdata) {
            commit('storePlayerData', playerdata)
        }
    },

    modules: {},

    getters: {}
})
