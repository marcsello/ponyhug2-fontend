<template>
  <div id="app">

    <navbar/>

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
import Navbar from "@/components/Navbar";
import FooterContent from "@/components/FooterContent";

export default {
  components: {
    FooterContent,
    Navbar
  },
  created() {
    if (this.$api.haveToken) {
      this.$api.getMyInfo().then((playerdata) => {
        this.$store.dispatch('storePlayerData', playerdata)
      }).catch(({text}) => {
        this.$showError(text)
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
