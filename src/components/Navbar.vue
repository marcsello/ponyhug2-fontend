<template>
  <div id="navbar">
    <b-navbar toggleable="sm" type="dark" variant="dark" fixed="top">


      <b-navbar-brand>
        <b>PonyHug</b>
        <b-badge>2020</b-badge>
      </b-navbar-brand>

      <b-nav-text class="text-white">
        <b-icon icon="trophy"/>
        20
      </b-nav-text>

      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Főoldal</b-nav-item>
          <b-nav-item to="/hug">Ölelés</b-nav-item>
          <b-nav-item to="/herd">Istálló</b-nav-item>
          <b-nav-item to="/about">Rólunk</b-nav-item>
          <b-nav-item to="/admin"><span class="text-danger">Admin</span></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-text class="text-center text-white">
            Lófasz jóska
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>


    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {}
}
</script>

<style scoped>

</style>