<template>
  <b-modal
      id="modal-alter-player"
      :title="playerData.name"
      :no-close-on-backdrop="loading"
      :no-close-on-esc="loading"
      :hide-header-close="loading"
      hide-footer
      @show="shown"
  >
    <h2>Info</h2>
    <table class="w-100">
      <tr>
        <th>id:</th>
        <td>{{ playerData.id }}</td>
      </tr>
      <tr>
        <th>name:</th>
        <td>{{ playerData.name }}</td>
      </tr>
      <tr>
        <th>registered:</th>
        <td>{{ playerData.registered|humanDate }}</td>
      </tr>
      <tr>
        <th>is_admin:</th>
        <td>{{ playerData.is_admin }}</td>
      </tr>
      <tr>
        <th>is_approved:</th>
        <td>{{ playerData.is_approved }}</td>
      </tr>
      <tr>
        <th>playtime:</th>
        <td>{{ playerData.playtime }}</td>
      </tr>
      <tr>
        <th>hug_counter:</th>
        <td>{{ playerData.hug_counter }}</td>
      </tr>
    </table>

    <h2 class="mt-3">Approval</h2>
    <b-button block variant="success" v-if="!playerData.is_approved" @click="changeProperty('is_approved', true)">
      Approve
    </b-button>
    <b-button block variant="secondary" v-if="playerData.is_approved" @click="changeProperty('is_approved', false)">
      Un-approve
    </b-button>

    <h2 class="mt-3">Change name</h2>
    <b-form @submit.prevent="changeName">
      <b-form-group
          id="input-group-new-username"
          label="New name:"
          label-for="input-new-username"
      >
        <b-input id="input-new-username" v-model="newName"/>

      </b-form-group>
      <b-button type="submit" variant="primary" block>Change name</b-button>
    </b-form>

    <h2 class="mt-3">Admin</h2>
    <b-button block variant="primary" v-if="!playerData.is_admin" @click="changeProperty('is_admin', true)">Promote to
      Admin
    </b-button>
    <b-button block variant="secondary" v-if="playerData.is_admin" @click="changeProperty('is_admin', false)">Demote
    </b-button>
    <h2 class="mt-3">Debug</h2>
    <b-button block variant="secondary" @click="impersonate">Impersonate</b-button>
  </b-modal>
</template>

<script>
export default {
  name: "PlayerAlterModal",
  props: {
    playerData: {
      type: Object,
      required: true,
      default() {
        return {
          "hug_counter": 0,
          "playtime": null,
          "id": 0,
          "name": "",
          "registered": "",
          "is_admin": false,
          "is_approved": false
        }
      }
    },
  },
  data() {
    return {
      loading: false,
      newName: ""
    }
  },
  watch: {
    playerData: {
      handler(newVal) {
        this.newName = newVal.name
      },
      deep: true
    }
  },
  methods: {
    shown() {
      this.newName = this.playerData.name
      this.loading = false // un-stuck if stuck
    },
    patchPlayer(reqBody) {
      this.loading = true
      this.$api.adminPatchPlayer(this.playerData.id, reqBody).then((resp) => {
        const k = Object.keys(reqBody)[0]
        this.$showToast(`${k}: ${this.playerData[k]} -> ${reqBody[k]}`, "success", false)
        this.$emit("changed", resp)
        this.$bvModal.hide('modal-alter-player')
        this.loading = false
      }).catch(({text}) => {
        this.$showToast(text)
        this.loading = false
      })
    },
    changeProperty(prop, val) {
      let reqBody = {}
      reqBody[prop] = val
      this.patchPlayer(reqBody)
    },
    changeName() {
      const reqBody = {
        name: this.newName
      }
      this.patchPlayer(reqBody)
    },
    impersonate() {
      if (!confirm("DANGER! DANGER! DANGER! After this operation you WILL LOOSE access to your current account!")) {
        return
      }

      this.loading = true
      this.$api.adminImpersonate(this.playerData.name).then((resp) => {
        const LOCAL_STORAGE_KEY = "JWT" // big hax
        localStorage.setItem(LOCAL_STORAGE_KEY, resp.jwt)
        location.reload()
      }).catch(({text}) => {
        this.$showToast(text)
        this.loading = false
      })
    }
  },
  filters: {
    humanDate(val) {
      const d = new Date(val)
      return d.toLocaleString('hu-HU')
    },
  }
}
</script>


<style scoped>

</style>