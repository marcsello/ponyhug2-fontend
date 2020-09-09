<template>
  <div>
    <b-row>
      <b-col class="my-3 text-center">

        <h1>
          Regisztráció
        </h1>
        <p>
          Üdvözöllek idegen. Kérlek válassz nevet...
        </p>

      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-3">
        <div>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-name"
                label-for="input-name"
                description="A nevedet később már nem változtathatod meg!"
            >
              <b-form-input
                  id="input-name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Játékos név"
              ></b-form-input>
            </b-form-group>

            <div class="text-center py-3">
              <b-button type="submit" variant="primary">Induljon a játék!</b-button>
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