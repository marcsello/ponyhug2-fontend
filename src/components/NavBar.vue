<template>
  <div id="navbar">
    <b-navbar toggleable="sm" type="dark" variant="dark" fixed="top">


      <b-navbar-brand>
        <b>PonyHug</b>
        <b-badge>2024</b-badge>
      </b-navbar-brand>


      <leader-score v-if="$store.state.playerdata.registered" /> <!-- this v-if delays the create and mount calls of the component -->

      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" v-if="$store.state.playerdata.registered">Főoldal</b-nav-item>
          <b-nav-item to="/hug" v-if="$store.state.playerdata.registered">Ölelés</b-nav-item>
          <b-nav-item to="/herd" v-if="$store.state.playerdata.registered">Istálló</b-nav-item>
          <b-nav-item to="/register" v-if="!$store.state.playerdata.registered">Regisztráció</b-nav-item>
          <b-nav-item to="/about">Rólunk</b-nav-item>

          <b-nav-item-dropdown v-if="$store.state.playerdata.is_admin" class="text-danger" right>
            <template #button-content>
              <span class="text-danger">Admin</span>
            </template>
            <b-dropdown-item to="/admin/leaderboard">Leaderboard</b-dropdown-item>
            <b-dropdown-item to="/admin/players">Players</b-dropdown-item>
            <b-dropdown-item to="/admin/ponies">Ponies</b-dropdown-item>
            <b-dropdown-item to="/admin/debug">Debug</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="$store.state.playerdata.registered">
          <b-nav-text class="text-center text-white">
            <b-icon icon="exclamation-triangle-fill" variant="danger" v-if="!$store.state.playerdata.is_approved"/> {{ $store.state.playerdata.name }}
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>

import LeaderScore from "@/components/LeaderScore";

export default {
  name: "NavBar",
  components: {LeaderScore},
  methods: {},
  computed: {}
}
</script>

<style scoped>

</style>