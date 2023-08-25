<template>
  <div>
    <b-row>
      <b-col>
        <h1>Leaderboard</h1>
        <b-table
            striped
            :busy="loading"
            :items="players"
            :fields="leaderboardFields"
            :tbody-tr-class="rowClass"
        >
          <template #table-busy>
            <div class="text-center">
              <div>
                <b-spinner/>
              </div>
              <div><strong>Loading...</strong></div>
            </div>
          </template>
        </b-table>
        <b-button variant="success" @click="updateData" :disabled="loading">Update</b-button>
      </b-col>
    </b-row>
    <b-row class="my-3" v-if="!loading">
      <b-col>
        <h1>Top 3</h1>
        <ol>
          <li v-for="ply in top3" :key="ply.name"><b>{{ ply.name }}</b> ({{ply.hug_counter}}; {{parseInt(ply.playtime)}})</li>
        </ol>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  name: "LeaderboardView",
  data() {
    return {
      players: [],
      loading: true, // load on mount
      leaderboardFields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: 'playtime',
          sortable: true,
          formatter(n) {
            return Number.parseFloat(n).toFixed(2)
          }
        },
        {
          key: 'hug_counter',
          label: 'Hugs',
          sortable: true,
        }
      ]
    }
  },
  mounted() {
    this.updateData()
  },
  methods: {
    updateData() {
      this.loading = true
      this.$api.adminGetAllPlayers().then((players) => {
        this.players = players
        this.loading = false
      }).catch(({text}) => {
        this.$showToast("Players" + text)
        this.loading = false
      })
    },
    rowClass(item, type) {
      if (!item || type !== 'row') return
      if (!item.is_approved) return 'table-danger'
      if (item.hug_counter === this.$store.state.total_ponies) return 'table-success'
    }
  },
  computed: {
    top3() {
      if (!this.players || this.players.length === 0) {
        return []
      }

      const players = _.cloneDeep(this.players).filter((ply) => ply.is_approved)
      const orderedPlayers = _.orderBy(players, ['hug_counter', 'playtime'], ['desc', 'asc'])
      return orderedPlayers.slice(0,3)
    }
  }
}
</script>

<style scoped>

</style>