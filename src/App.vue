<template>
  <div id="app">

    <nav-bar/>

    <div id="content">
      <b-container>
        <router-view/>
      </b-container>
    </div>

    <div id="footer">
      <b-container>
        <footer-content/>
      </b-container>
    </div>

  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterContent from "@/components/FooterContent";

import {initialInfoFetchMixin, statsUpdaterMixin} from '@/mixins'

export default {
  components: {
    FooterContent,
    NavBar
  },
  data() {
    return {
      statsUpdateInterval: null,
      approvalStateUpdateInterval: null // will only be used if the player is unapproved, so they don't have to reload once approved
    }
  },
  mixins: [
    initialInfoFetchMixin,
    statsUpdaterMixin
  ],
  created() {
    // Receive player data
    this.smartFetchRequired().then(() => {
      this.attemptStatUpdate() // <- initial stat update after playerdata is fetched

      // if the player is unapproved, set up a timer to constantly poll for its approval state
      if (this.$store.state.playerdata.registered && !this.$store.state.playerdata.is_approved) {
        console.log("Player is un-approved... will poll for state")
        this.approvalStateUpdateInterval = setInterval(this.checkApprovalState, 4500)
      }
    })

    this.statsUpdateInterval = setInterval(this.attemptStatUpdate, 15000)

    this.$bus.$on("register", (partial_player_data) => {
      this.updateStats() // <- initial stat update after player is registered

      if (partial_player_data.is_approved) {
        return
      }

      console.log("Player is un-approved... will poll for state")
      this.approvalStateUpdateInterval = setInterval(this.checkApprovalState, 4500)
    })

  },
  beforeDestroy() {
    clearInterval(this.statsUpdateInterval)
    this.statsUpdateInterval = null
    clearInterval(this.approvalStateUpdateInterval)
    this.approvalStateUpdateInterval = null
    this.$bus.$off("register")
  },
  methods: {
    attemptStatUpdate() {
      if (this.$store.state.playerdata.registered) {
        this.updateStats()
      }
    },
    checkApprovalState() {
      if (!this.$store.state.playerdata.registered) {
        return
      }

      if (this.$store.state.playerdata.is_approved) {
        // it is updated outside, lol
        clearInterval(this.approvalStateUpdateInterval)
        this.approvalStateUpdateInterval = null
        return
      }

      this.$api.getMyInfo().then((playerinfo) => {
        if (playerinfo.is_approved) {

          this.$store.dispatch("storePlayerApprovedStatus", true)

          clearInterval(this.approvalStateUpdateInterval)
          this.approvalStateUpdateInterval = null
        }
      }).catch(() => {
        // ignore?
      })
    }
  }
}

</script>


<style>

#content {
  margin-top: 70px;
  margin-bottom: 20px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#footer {
  padding: 1em;
  margin-top: auto;
  background: #E9ECEF;
}

</style>
