<template>
  <div v-if="ponyValid === true">
    <b-row class="my-2">
      <b-col>
        <b-card :title="ponydata.name" class="text-center">
          <b-img :src="ponydata.image" fluid-grow/>
          <p class="py-3">
            {{ ponydata.story }}
          </p>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col>
        <h2>Póni statisztikák</h2>
        <table class="table table-borderless table-striped table-light">
          <tbody>
          <tr>
            <th scope="row" class="align-middle">Először ölelte</th>
            <td>{{ ponydata.first_hug.playername }}</td>
          </tr>
          <tr>
            <th scope="row" class="align-middle">Összesen megölelték</th>
            <td>{{ ponydata.hugs.length }}</td>
          </tr>
          <tr>
            <th scope="row" class="align-middle">Eddig megölelték</th>
            <td>
              <div v-for="(hugger, index) in ponydata.hugs" :key="index">{{ hugger }}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </div>
  <div v-else-if="ponyValid === false">
    <b-alert variant="primary" show>Úgy tűnik, ezt a pónit nem ölelted még meg. Keresd meg, és adj neki egy ölelést!</b-alert>
  </div>
  <div v-else-if="ponyLoading" class="text-center">
    <b-spinner label="Loading..."></b-spinner>
  </div>
</template>

<script>
export default {
  name: "Pony",
  data() {
    return {
      ponydata: {
        "first_hug": {
          "playername": null,
          "timestamp": null
        },
        "hugs": [],
        "id": null,
        "image": null,
        "name": null,
        "source": null,
        "story": null
      },
      ponyLoading: true,
      ponyValid: null
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.$api.getPony(this.$route.params.id).then((ponydata) => {
        this.ponydata = ponydata
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
  }
}
</script>

<style scoped>

</style>