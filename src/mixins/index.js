export const initialInfoFetchMixin = {
    methods: {
        fetchPrivateInfo() { // Fetch info that does require login (Excluding player info)

            Promise.all([
                this.$api.getTotalPonyCount(),
                this.$api.getAllFactionData()
            ]).then((responses) => {
                this.$store.dispatch('storeTotalPonies', responses[0].total_ponies)
                this.$store.dispatch('storeFactions', responses[1])
            }).catch(({text}) => {
                this.$showToast(text) // API call failed
            })
        },
        fetchPublicInfo() { // Fetch info that does not require login
            // Get timeframe
            this.$api.getCurrentTimeframe().then((timeframe) => {
                this.$store.dispatch('storeTimeframe', timeframe)
            }).catch(({status, text}) => {

                if (status === 404) {
                    // No valid timeframe available
                    this.$store.dispatch('storeTimeframeOutside')
                } else {
                    this.$showToast(text) // API call failed
                }

            })
        },
        smartFetchRequired() { // Supposed to be called on pageload

            this.fetchPublicInfo()

            if (this.$api.haveToken) {
                this.$api.getMyInfo().then((playerdata) => {
                    this.$store.dispatch('storePlayerData', playerdata).then(() => {
                        this.fetchPrivateInfo()
                    })
                }).catch(({text}) => {
                    this.$showToast(text) // API call failed
                })

            }


        }
    }
}


export const leaderScoreUpdaterMixin = {
    methods: {
        updateLeaderScore() {
            this.$api.getLeaderStat().then(({hug_counter}) => {
                this.$store.dispatch('storeLeaderScore', hug_counter)
            }).catch(() => {
                // Errors are ignored
            })
        }
    }
}

export const factionsStatsUpdaterMixin = {
    methods: {
        updateFactionsStats() {
            this.$api.getFactionsStat().then((data) => {
                this.$store.dispatch('storeFactionsStats', data)
            }).catch(() => {
                // Errors are ignored
            })
        }
    }
}