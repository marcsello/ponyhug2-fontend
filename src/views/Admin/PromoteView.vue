<template>
  <div>
    <div v-if="!$store.state.playerdata.is_admin">
      <b-row>
        <b-col>
          <h1>Promote</h1>
          <b-form @submit.prevent="doPromote">
            <b-form-group
                id="input-group-adminkey"
                label-for="input-adminkey"
            >
              <b-form-input
                  id="input-adminkey"
                  v-model="promoteform.adminkey"
                  type="text"
                  required
                  autocomplete="off"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Promote!</b-button>

          </b-form>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      Already promoted to admin
    </div>
    <div>
      <b-row class="py-5">
        <!-- This does not make sense to be on the promote page, but have no better place to put it -->
        <b-col>
          <h1>Danger</h1>
          <b-button @click="forgetMe" variant="danger">Forget Me</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

/// Danger Zone ///

export default {
  name: "AdminView",
  data() {
    return {
      promoteform: {
        adminkey: ""
      },
      loading: false,
    }
  },
  methods: {
    forgetMe() {
      if (confirm("Are you sure?")) {
        localStorage.clear()
        location.reload()
      }
    },
    doPromote() {
      this.$api.adminPerformPromote(this.promoteform.adminkey).then(() => {
        location.reload()
      }).catch(({text}) => {
        this.$showToast(text)
      })
    }
  },
}
</script>

<style scoped>

</style>