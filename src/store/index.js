import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        playerdata: {
            name: null,
            is_admin: null,
            registered: false,
            faction: null // This will be a numeric id... TODO: change to faction data maybe
        },
        timeframe: {
            begin_timestamp: null,
            end_timestamp: null,
            fetched: false
        },
        factions: {
        },
        factions_fetched: false,
        faction_stats: { // Édes kurva faszom: https://forum.vuejs.org/t/vuex-best-practices-for-complex-objects/10143/2

        },
        faction_stats_fetched: false,
        total_ponies: null,
        leader_score: null,
        just_scanned_code: null // This is used to prevent back-button spam (we store the last code used, and ignore it only if it's in the hash... a new scan will reload the app anyways)
    },

    mutations: {
        storePlayerData(state, playerdata) {
            Vue.set(state, 'playerdata', {
                name: playerdata.name,
                is_admin: playerdata.is_admin,
                registered: true,
                faction: playerdata.faction
            })
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
        storeFactions(state, factions) {

            factions.forEach((faction) => {
                Vue.set(state.factions, faction.id, faction)
            })
            state.factions_fetched = true;

        },
        storeLeaderScore(state, leader_score) {
            state.leader_score = leader_score
        },
        storeFactionsStats(state, factions_stats) {
            for (const [key, value] of Object.entries(factions_stats)) {
                Vue.set(state.faction_stats, key, value)
            }
            state.faction_stats_fetched = true;
        },
        storeJustScannedCode(state, just_scanned_code) {
            state.just_scanned_code = just_scanned_code
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
        storeFactions({commit}, factions) {
            commit('storeFactions', factions)
        },
        storeLeaderScore({commit}, leader_score) {
            commit('storeLeaderScore', leader_score)
        },
        storeFactionsStats({commit}, factions_stats) {
            commit('storeFactionsStats', factions_stats)
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
        myFactionData(state) {

            if (!state.factions || _.isEmpty(state.factions) || !state.playerdata.registered) {
                return null
            }

            return state.factions[state.playerdata.faction]

        },
        sumHugs(state) { // this can be retrived from summarizing the hugs

            if (!state.factions || _.isEmpty(state.factions) || _.isEmpty(state.faction_stats) || !state.playerdata.registered) {
                return 0
            }

            return Object.values(state.faction_stats).reduce((a, b) => a + b)

        }
    }
})
