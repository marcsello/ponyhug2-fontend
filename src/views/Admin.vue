<template>
  <div>
    <div v-if="!$store.state.playerdata.is_admin">
      <b-row>
        <b-col>
          <h1>Promote</h1>
          <b-form @submit.prevent="doPromote">
            <b-form-group
                id="input-group-adminkey"
                label-for="input-adminkey"
            >
              <b-form-input
                  id="input-adminkey"
                  v-model="promoteform.adminkey"
                  type="text"
                  required
                  autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Promote!</b-button>

          </b-form>
        </b-col>
      </b-row>
    </div>
    <div v-if="$store.state.playerdata.is_admin">
      <b-button @click="updateAllData" variant="success">Update All Data</b-button>
      <b-row>
        <b-col>
          <h1>Leaderboard</h1>
          <b-table striped :items="data.players" :fields="leaderboardFields" :tbody-tr-class="rowClass"></b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h1>Player Data</h1>
          <pre>{{ data.players }}</pre>
          <h1>Sum hugs</h1>
          <b>{{ sumHugs }}</b>
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
          <h1>Timeframes</h1>
          <pre>{{ data.timeframes }}</pre>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h1>Factions</h1>
          <pre>{{ data.factions }}</pre>
        </b-col>
      </b-row>
    </div>
    <div>
      <b-row>
        <b-col>
          <h1>Danger</h1>
          <b-button @click="forgetMe" variant="danger">Forget Me</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

/// Danger Zone ///

export default {
  name: "Admin",
  data() {
    return {
      promoteform: {
        adminkey: ""
      },
      data: {
        ponies: [],
        players: [],
        timeframes: [],
        factions: []
      },
      leaderboardFields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'playtime',
          sortable: true
        },
        {
          key: 'hug_counter',
          label: 'Hugs',
          sortable: true,
        },
        {
          key: "faction"
        }
      ]
    }
  },
  methods: {
    forgetMe() {
      if (confirm("Are you sure?")) {
        localStorage.clear()
        location.reload()
      }
    },
    doPromote() {
      this.$api.adminPerformPromote(this.promoteform.adminkey).then(() => {
        location.reload()
      }).catch(({text}) => {
        this.$showToast(text)
      })
    },
    updateAllData() {
      this.$api.adminGetAllPlayers().then((players) => {
        this.data.players = players
      }).catch(({text}) => {
        this.$showToast("Players" + text)
      })

      this.$api.adminGetAllPonies().then((ponies) => {
        this.data.ponies = ponies
      }).catch(({text}) => {
        this.$showToast("Ponies: " + text)
      })

      this.$api.adminGetAllTimeframes().then((timeframes) => {
        this.data.timeframes = timeframes
      }).catch(({text}) => {
        this.$showToast("Timeframes: " + text)
      })

      this.$api.getAllFactionData().then((factions) => { // this isn't admin stuff, but meh...
        this.data.factions = factions
      }).catch(({text}) => {
        this.$showToast("Factions: " + text)
      })

    },
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (item.hug_counter === this.$store.state.total_ponies) return 'table-success'
    }

  },
  computed: {
    sumHugs() {
      if (this.data.players.length > 0) {
        return this.data.players.map(item => item.hug_counter).reduce((prev, next) => prev + next)
      } else {
        return 0
      }
    }
  }
}
</script>

<style scoped>

</style>