export const initialInfoFetchMixin = {
    methods: {
        fetchPrivateInfo() { // Fetch info that does require login (Excluding player info)
            // Get total ponies
            this.$api.getGameStat().then(({total_ponies}) => {
                this.$store.dispatch('storeTotalPonies', total_ponies)
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
                    // TODO: No valid timeframe available
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