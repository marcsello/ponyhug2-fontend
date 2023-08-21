import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        playerdata: {
            name: null,
            is_admin: null,
            registered: false,
            is_approved: false,
        },
        timeframe: {
            begin_timestamp: null,
            end_timestamp: null,
            fetched: false
        },
        total_ponies: null,
        leader_score: null,
        total_hugs: null,
        just_scanned_code: null // This is used to prevent back-button spam (we store the last code used, and ignore it only if it's in the hash... a new scan will reload the app anyways)
    },

    mutations: {
        storePlayerData(state, playerdata) {
            Vue.set(state, 'playerdata', {
                name: playerdata.name,
                is_admin: playerdata.is_admin,
                registered: true,
                is_approved: playerdata.is_approved
            })
        },
        storePlayerApprovedStatus(state, is_approved) {
            state.playerdata.is_approved = is_approved
        },
        storeTimeframe(state, timeframe) {
            Vue.set(state, 'timeframe', {
                begin_timestamp: new Date(timeframe.begin_timestamp),
                end_timestamp: new Date(timeframe.end_timestamp),
                fetched: true
            })
        },
        storeTotalPonies(state, total_ponies) {
            state.total_ponies = total_ponies
        },
        storeStats(state, {leader_hug_count, sum_hugs}) {
            state.leader_score = leader_hug_count
            state.total_hugs = sum_hugs
        },
        storeJustScannedCode(state, just_scanned_code) {
            state.just_scanned_code = just_scanned_code
        }
    },

    actions: {
        storePlayerData({commit}, playerdata) {
            commit('storePlayerData', playerdata)
        },
        storePlayerApprovedStatus({commit}, is_approved) {
            commit('storePlayerApprovedStatus', is_approved)
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
        storeStats({commit}, stats) {
            commit('storeStats', stats)
        },
        storeJustScannedCode({commit}, just_scanned_code) {
            commit('storeJustScannedCode', just_scanned_code)
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
        },
    }
})
