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
        <div class="px-5">
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-code"
                label-for="input-code"
                description="A kódot megtalálod a papíron a QR kód alatt"
            >
              <b-form-input
                  id="input-code"
                  v-model="form.code"
                  type="text"
                  required
                  placeholder="Kód: XXXXXXXXXX"
              ></b-form-input>
            </b-form-group>

            <div class="text-center py-3">
              <b-button type="submit" variant="primary">Ölelés!</b-button>
            </div>

          </b-form>
        </div>
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
        input: ""
      }
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style scoped>

</style>