<template>
  <div id="navbar">
    <b-navbar toggleable="sm" type="dark" variant="dark" fixed="top">


      <b-navbar-brand>
        <b>PonyHug</b>
        <b-badge>2021</b-badge>
      </b-navbar-brand>


      <leader-score v-if="$store.state.playerdata.registered" /> <!-- this v-if delays the create and mount calls of the component -->
      <faction-indicator v-if="$store.state.playerdata.registered"  class="m-0 p-0"/>

      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" v-if="$store.state.playerdata.registered">Főoldal</b-nav-item>
          <b-nav-item to="/hug" v-if="$store.state.playerdata.registered">Ölelés</b-nav-item>
          <b-nav-item to="/herd" v-if="$store.state.playerdata.registered">Istálló</b-nav-item>
          <b-nav-item to="/register" v-if="!$store.state.playerdata.registered">Regisztráció</b-nav-item>
          <b-nav-item to="/about">Rólunk</b-nav-item>
          <b-nav-item to="/admin" v-if="$store.state.playerdata.is_admin"><span class="text-danger">Admin</span>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-text class="text-center text-white">
            {{ $store.state.playerdata.name }}
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>

import LeaderScore from "@/components/LeaderScore";
import FactionIndicator from "@/components/FactionIndicator";

export default {
  name: "NavBar",
  components: {LeaderScore, FactionIndicator},
  methods: {},
  computed: {}
}
</script>

<style scoped>

</style>