<template>
  <div>
    <b-row>
      <b-col>
        <b-button @click="updateAllData" variant="success" :disabled="loading">Update All Data
          <b-spinner v-if="loading" small/>
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h1>Player Data</h1>
        <pre>{{ data.players }}</pre>
        <h1>Player count</h1>
        <b>By summary:</b> {{ data.players.length }}<br>
        <h1>Sum hugs</h1>
        <b>By summary:</b> {{ sumHugs }}<br>
        <b>By API:</b> {{ data.stats.sum_hugs }}<br>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h1>Ponies</h1>
        <pre>{{ data.ponies }}</pre>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h1>Total ponies</h1>
        <b>By summary:</b> {{ data.ponies.length }}<br>
        <b>By API:</b> {{ data.stats.sum_hugs }}<br>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h1>Timeframes</h1>
        <pre>{{ data.timeframes }}</pre>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <h1>JWT Token</h1>
        <pre>{{ token }}</pre>
      </b-col>
    </b-row>
  </div>

</template>

<script>

/// Danger Zone ///

export default {
  name: "DebugView",
  data() {
    return {
      loading: false,
      data: {
        ponies: [],
        players: [],
        timeframes: [],
        factions: [],
        stats: {sum_hugs: 0},
        total_ponies_count: 0
      },
    }
  },
  methods: {
    updateAllData() {
      this.loading = true
      let expReq = 5
      const reqComplete = function () {
        expReq--
        if (expReq === 0) {
          this.loading = false
        }
      }.bind(this)

      this.$api.adminGetAllPlayers().then((players) => {
        this.data.players = players
        reqComplete()
      }).catch(({text}) => {
        this.$showToast("Players" + text)
        reqComplete()
      })

      this.$api.adminGetAllPonies().then((ponies) => {
        this.data.ponies = ponies
        reqComplete()
      }).catch(({text}) => {
        this.$showToast("Ponies: " + text)
        reqComplete()
      })

      this.$api.adminGetAllTimeframes().then((timeframes) => {
        this.data.timeframes = timeframes
        reqComplete()
      }).catch(({text}) => {
        this.$showToast("Timeframes: " + text)
        reqComplete()
      })

      this.$api.getStats().then((stats) => {
        this.data.stats = stats
        reqComplete()
      }).catch(({text}) => {
        this.$showToast("Sum hugs: " + text)
        reqComplete()
      })

      this.$api.getTotalPonyCount().then((cnt) => {
        this.data.total_ponies_count = cnt.total_ponies
        reqComplete()
      }).catch(({text}) => {
        this.$showToast("Total Pony Count: " + text)
        reqComplete()
      })

    },

  },
  computed: {
    sumHugs() {
      if (this.data.players.length > 0) {
        return this.data.players.map(item => item.hug_counter).reduce((prev, next) => prev + next)
      } else {
        return 0
      }
    },
    token() {
      return localStorage.getItem("JWT")
    }
  }
}
</script>

<style scoped>

</style>