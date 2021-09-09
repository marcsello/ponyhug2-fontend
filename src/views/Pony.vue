<template>
  <div v-if="ponyValid === true">
    <b-row class="my-2">
      <b-col>
        <b-card :title="hugdata.pony.name" class="text-center">
          <b-img :src="hugdata.pony.image" fluid-grow/>
          <p class="py-3">
            {{ hugdata.pony.story }}
          </p>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col>
        <h2>Statisztikák</h2>
        <table class="table  table-striped table-light">
          <tbody>
          <tr>
            <th scope="row" class="align-middle">Ekkor ölelted</th>
            <td>{{ hugdata.timestamp|formathugtimestamp }}</td>
          </tr>
          <tr v-if="hugdata.count > 1">
            <th scope="row" class="align-middle">Ennyiszer próbáltad</th>
            <td>{{ hugdata.count }}</td>
          </tr>
          </tbody>
        </table>
        <table class="table  table-striped table-light">
          <tbody>
          <tr>
            <th scope="row" class="align-middle">Először ölelte</th>
            <td>{{ hugdata.pony.first_hug.playername }}</td>
          </tr>
          <tr>
            <th scope="row" class="align-middle">Összesen megölelték</th>
            <td>{{ hugdata.pony.hugs.length }}</td>
          </tr>
          <tr>
            <th scope="row" class="align-middle">Eddig megölelte</th>
            <td>
              <div v-for="(hugger, index) in hugdata.pony.hugs" :key="index">{{ hugger }}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </div>
  <div v-else-if="ponyValid === false">
    <b-alert variant="primary" show>Úgy tűnik, ez nem a te ölelésed! De ne csüggedj, rád is sok ölelés vár!</b-alert>
  </div>
  <div v-else-if="ponyLoading" class="text-center mt-5">
    <b-spinner label="Loading..."></b-spinner>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "Pony",
  data() {
    return {
      hugdata: {
        id: null,
        count: null,
        timestamp: null,
        pony: {
          first_hug: {
            playername: null,
            timestamp: null
          },
          hugs: [],
          id: null,
          image: null,
          name: null,
          source: null,
          story: null
        },
        player: null
      },
      ponyLoading: true,
      ponyValid: null
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.$api.getHug(this.$route.params.id).then((hugdata) => {
        this.hugdata = hugdata
        this.ponyLoading = false
        this.ponyValid = true
      }).catch(({status, text}) => {
        this.ponyLoading = false

        if (status === 404) {
          this.ponyValid = false
        } else {
          this.$showToast(text) // API Call failed
        }

      })
    }
  },
  filters: {
    formathugtimestamp(value) {
      return moment(String(value)).format('hh:mm:ss')
    }
  }
}
</script>

<style scoped>

</style>