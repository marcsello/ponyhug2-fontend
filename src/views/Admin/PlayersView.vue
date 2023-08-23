<template>
  <b-row>
    <PlayerAlterModal :player-data="currentlyEditingPlayerData" @changed="updateData" />
    <b-col>
      <h1>Players</h1>
      <b-table
          striped
          hover
          :busy="loading"
          :items="players"
          :fields="fields"
          @row-clicked="rowClicked"
      >

        <template #cell(flags)="data">
          <b-icon icon="person-check-fill" variant="success" class="mx-1" v-if="data.item.is_approved" />
          <b-icon icon="person-x-fill" variant="danger" class="mx-1" v-if="!data.item.is_approved" />
          <b-icon icon="suit-heart" class="mx-1" v-if="data.item.is_admin" />
          <b-icon icon="snow" class="mx-1" v-if="data.item.hug_counter === 0" />
        </template>

        <template #table-busy>
          <div class="text-center">
            <div><b-spinner /></div>
            <div><strong>Loading...</strong></div>
          </div>
        </template>

      </b-table>
      <b-button variant="success" @click="updateData" :disabled="loading">Update</b-button>
    </b-col>
  </b-row>
</template>

<script>
import PlayerAlterModal from "@/components/PlayerAlterModal.vue";

export default {
  name: "PlayersView",
  components: {PlayerAlterModal},
  data() {
    return  {
      loading: true, // load on mount
      players: [],
      fields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: "flags",
          thStyle: {width: "30%"},
        }
      ],
      currentlyEditingPlayerData: {}
    }
  },
  mounted() {
    this.updateData()
  },
  methods: {
    updateData() {
      this.loading = true
      this.$api.adminGetAllPlayers().then((players) => {
        this.loading = false
        this.players = players
      }).catch(({text}) => {
        this.loading = false
        this.$showToast(text)
      })
    },
    rowClicked(row) {
      this.currentlyEditingPlayerData = row
      this.$bvModal.show('modal-alter-player')
    }
  }
}
</script>

<style scoped>

</style>