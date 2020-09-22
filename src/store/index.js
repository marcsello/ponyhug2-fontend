import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        playerdata: {
            name: null,
            is_admin: null,
            registered: false
        },
        timeframe: {
            begin_timestamp: null,
            end_timestamp: null,
            fetched: false
        },
        total_ponies: null,
        leader_score: null
    },

    mutations: {
        storePlayerData(state, playerdata) {
            state.playerdata = {
                name: playerdata.name,
                is_admin: playerdata.is_admin,
                registered: true
            }
        },
        storeTimeframe(state, timeframe) {
            state.timeframe = {
                begin_timestamp: new Date(timeframe.begin_timestamp),
                end_timestamp: new Date(timeframe.end_timestamp),
                fetched: true
            }
        },
        storeTotalPonies(state, total_ponies) {
            state.total_ponies = total_ponies
        },
        storeLeaderScore(state, leader_score) {
            state.leader_score = leader_score
        }
    },

    actions: {
        storePlayerData({commit}, playerdata) {
            commit('storePlayerData', playerdata)
        },
        storeTimeframe({commit}, timeframe) {
            commit('storeTimeframe', timeframe)
        },
        storeTimeframeOutside({commit}) {
            commit('storeTimeframe', {begin_timestamp : null, end_timestamp: null})
        },
        storeTotalPonies({commit}, total_ponies) {
            commit('storeTotalPonies', total_ponies)
        },
        storeLeaderScore({commit}, leader_score) {
            commit('storeLeaderScore', leader_score)
        }
    },

    modules: {},

    getters: {
        isInValidTimeframe(state) {

            if (!state.timeframe.fetched) { // Dunno yet
                return false
            }

            if (state.timeframe.end_timestamp && state.timeframe.begin_timestamp) {
                let now = new Date()
                return (state.timeframe.end_timestamp > now) && (state.timeframe.begin_timestamp < now)
            } else {
                return false
            }
        }
    }
})
