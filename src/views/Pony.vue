<template>
  <div>
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
      ponyLoading: true
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.$api.getHuggedPony(this.$route.params.id).then((ponydata) => {
        this.ponydata = ponydata
        this.ponyLoading = false
      }).catch(({status, text}) => {
        this.ponyLoading = false

        if (status === 404) {
          // TODO: What to do
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