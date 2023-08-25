<template>
  <b-row>
    <b-col>
      <h1>Ponies</h1>
      <b-table
          striped
          :busy="loading"
          :items="ponies"
          :fields="fields"
      >

        <template #cell(hugs)="data">
          {{ data.item.hugs.length }}
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
export default {
  name: "PoniesView",
  data() {
    return  {
      loading: true, // load on mount
      ponies: [],
      fields: [
        {
          key: 'name',
          sortable: true
        },
        {
          key: "hugs",
          sortable: true,
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
      this.$api.adminGetAllPonies().then((ponies) => {
        this.loading = false
        this.ponies = ponies
      }).catch(({text}) => {
        this.loading = false
        this.$showToast(text)
      })
    },
  }
}
</script>

<style scoped>

</style>