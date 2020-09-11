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
        <b-overlay :show="registerPending" rounded="sm">
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
                    autocomplete="off"
                    :disabled="registerPending"
                ></b-form-input>
              </b-form-group>

              <div class="text-center py-3">
                <b-button type="submit" variant="primary" :disabled="registerPending">Induljon a játék!</b-button>
              </div>

            </b-form>
          </div>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import {initialInfoFetchMixin} from '@/mixins'

export default {
  name: "Register",
  mixins: [
    initialInfoFetchMixin
  ],
  data() {
    return {
      form: {
        name: ""
      },
      registerPending: false
    }
  },
  methods: {
    onSubmit() {
      this.registerPending = true
      this.$api.performRegister(this.form.name).then((partial_player_data) => {

        this.$store.dispatch('storePlayerData', partial_player_data).then(() => {
          this.fetchPrivateInfo() // Other info fetched automagically on pageload
          this.$router.push('/')
        })

      }).catch(({status, text}) => {
        this.registerPending = false

        if (status === 409 || status === 422) {
          this.$showToast(text, 'user_error')
        } else {
          this.$showToast(text)
        }

      })
    }
  }
}
</script>

<style scoped>

</style>