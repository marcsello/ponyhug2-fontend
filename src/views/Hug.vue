<template>
  <div>
    <b-row>
      <b-col class="my-3 text-center">

        <h1>
          Ölelés
        </h1>
        <p>
          Ha nincs QR kód olvasód ide írd be a kódot!
        </p>

      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-3">
        <b-overlay :show="submitPending" rounded="sm">
          <div class="px-5">
            <b-form @submit.prevent="onSubmit">
              <b-form-group
                  id="input-group-code"
                  label-for="input-code"
                  description="A kódot megtalálod a papíron a QR kód alatt"
              >
                <b-form-input
                    id="input-code"
                    v-model="form.key"
                    type="text"
                    required
                    placeholder="Kód: XXXXXXXXXX"
                    :disabled="submitPending"
                ></b-form-input>
              </b-form-group>

              <div class="text-center py-3">
                <b-button type="submit" variant="primary" :disabled="submitPending">Ölelés!</b-button>
              </div>

            </b-form>
          </div>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Hug",
  data() {
    return {
      form: {
        key: ""
      },
      submitPending: false
    }
  },
  methods: {
    onSubmit() {
      this.submitPending = true

      this.$api.performHug(this.form.key).then((hug) => {
        this.$router.push({name: 'Pony', params: {id: hug.pony.id}})
      }).catch(({text}) => {
        this.$showError(text) // TODO: kezdem úgyérezni, hogy ez nagyon fos koncepció
        this.submitPending = false
      })

    }
  },
  mounted() {
    if (this.$route.hash) {
      this.form.key = this.$route.hash.substr(1)
      this.onSubmit()
    }
  }
}
</script>

<style scoped>

</style>