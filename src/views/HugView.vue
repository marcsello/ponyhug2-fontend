<template>
  <div>
    <b-row>
      <b-col class="my-3 text-center">

        <gametime-warning/>
        <unapproved-warning/>

        <h1>
          Ölelés
        </h1>
        <p>
          Ha nincs QR kód olvasód ide írd be a kulcsot!
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
                  description="A kulcsot megtalálod a papíron a QR kód alatt"
              >
                <b-form-input
                    id="input-code"
                    v-model="form.key"
                    type="text"
                    required
                    placeholder="Kulcs: XXXXXXXXXX"
                    :disabled="submitPending "
                    autocomplete="off"
                    :state="inputGood"
                    aria-describedby="input-code-live-feedback"
                ></b-form-input>

                <b-form-invalid-feedback id="input-code-live-feedback">
                  Egy póni kulcs pontosan 10 karakter!
                </b-form-invalid-feedback>


              </b-form-group>

              <div class="text-center py-3">
                <b-button type="submit" variant="primary" :disabled="!hugAllowed">Ölelés!</b-button>
              </div>

            </b-form>
          </div>
        </b-overlay>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {statsUpdaterMixin} from '@/mixins'
import GametimeWarning from '@/components/GametimeWarning'
import UnapprovedWarning from "@/components/UnapprovedWarning.vue";


export default {
  name: "HugView",
  components: {
    UnapprovedWarning,
    GametimeWarning
  },
  mixins: [
    statsUpdaterMixin
  ],
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

      /* TODO: Timeframe is not checked here on purpose, because this function might be called before the timeframe is fetched
        Altrough the user experience might be better if it were checked, but the server refuses the request anyways
        Since I'm short on time I'm going to ignore this issue for now
       */

      if (this.form.key.length !== 10) {
        this.inputGood = false
      } else {

        this.submitPending = true

        this.$api.performHug(this.form.key.toUpperCase()).then((hug) => {
          this.updateStats() // In case we were the leader
          this.$showToast("Új pónit öleltél meg!", "success", false)
          this.$store.dispatch('storeJustScannedCode', this.form.key)
          this.$router.push({name: 'Pony', params: {id: hug.id}})

        }).catch(({status, text, data}) => {
          this.submitPending = false

          switch (status) {
            case 200: // this is not an error actually
              this.$showToast("Ezt a pónit megölelted már!", "user_error", false)
              this.$store.dispatch('storeJustScannedCode', this.form.key)
              this.$router.push({name: 'Pony', params: {id: data.id}})
              break;
            case 409:
              this.$showToast(text, 'user_error')
              break;
            case 404:
              this.$showToast(text, 'user_error')
              break;
            default:
              this.$showToast(text)
          }

        })

      }
    }
  },
  watch: {
    'form.key': function () {
      if (this.inputGood !== null) {
        this.inputGood = this.form.key.length === 10
      }
    }

  },
  mounted() {
    if (this.$route.hash) {
      const scanned_key = this.$route.hash.substring(1)

      // Super gagyi solution, de most nem tudok jobbat... a sima back button spamet megoldja...
      if (scanned_key === this.$store.state.just_scanned_code) {
        window.location.hash = ""
      } else {
        this.form.key = scanned_key
        this.onSubmit()
      }
    }
  },
  computed: {
    hugAllowed() {
      return (!this.submitPending) && this.$store.getters.isInValidTimeframe && this.$store.state.playerdata.is_approved
    }
  }
}
</script>

<style scoped>

</style>