export const initialInfoFetchMixin = {
    methods: {
        fetchPrivateInfo() { // Fetch info that does require login (Excluding player info)

            return new Promise((resolve, reject) => {
                Promise.all([
                    this.$api.getTotalPonyCount(),
                ]).then((responses) => {
                    this.$store.dispatch('storeTotalPonies', responses[0].total_ponies).then(resolve).catch(reject)
                }).catch(({text}) => {
                    this.$showToast(text) // API call failed
                    reject()
                })
            })

        },
        fetchPublicInfo() { // Fetch info that does not require login
            // Get timeframe
            return new Promise((resolve, reject) => {
                this.$api.getCurrentTimeframe().then((timeframe) => {
                    this.$store.dispatch('storeTimeframe', timeframe).then(resolve).catch(reject)
                }).catch(({status, text}) => {

                    if (status === 404) {
                        // No valid timeframe available
                        this.$store.dispatch('storeTimeframeOutside').then(resolve).catch(reject)
                    } else {
                        this.$showToast(text) // API call failed
                        reject()
                    }

                })
            })
        },
        smartFetchRequired() { // Supposed to be called on pageload

            return new Promise((resolve, reject) => {
                let proms = [this.fetchPublicInfo()]

                if (this.$api.haveToken) {
                    this.$api.getMyInfo().then((playerdata) => {
                        this.$store.dispatch('storePlayerData', playerdata).then(() => {
                            proms.push(
                                this.fetchPrivateInfo()
                            )
                            Promise.all(proms).then(resolve)
                        })
                    }).catch(({text}) => {
                        this.$showToast(text) // API call failed
                        reject()
                    })

                } else {
                    Promise.all(proms).then(resolve)
                }

            })
        }
    }
}


export const statsUpdaterMixin = {
    methods: {
        updateStats() {
            this.$api.getStats().then((stats) => {
                this.$store.dispatch('storeStats', stats)
            }).catch(() => {
                // Errors are ignored
            })
        }
    }
}
