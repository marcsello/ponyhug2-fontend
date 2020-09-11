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
                    autocomplete="off"
                    :state="inputGood"
                    aria-describedby="input-code-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-code-live-feedback">
                  Egy póni kód pontosan 10 karakter!
                </b-form-invalid-feedback>


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
      inputGood: null,
      submitPending: false
    }
  },
  methods: {
    onSubmit() {

      if (this.form.key.length !== 10) {
        this.inputGood = false
      } else {

        this.submitPending = true

        this.$api.performHug(this.form.key).then((hug) => {
          this.$router.push({name: 'Pony', params: {id: hug.pony.id}})
        }).catch(({text}) => {
          this.$showToast(text) // TODO: kezdem úgyérezni, hogy ez nagyon fos koncepció
          this.submitPending = false
        })

      }
    }
  },
  watch: {
    'form.key': function() {
      if (this.inputGood !== null) {
        this.inputGood = this.form.key.length === 10
      }
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