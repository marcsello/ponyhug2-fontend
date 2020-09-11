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
    // Recieve player data
    if (this.$api.haveToken) {
      this.$api.getMyInfo().then((playerdata) => {
        this.$store.dispatch('storePlayerData', playerdata)
      }).catch(({text}) => {
        this.$showToast(text)
      })


      // Get total ponies
      this.$api.getGameStat().then(({total_ponies}) => {
        this.$store.dispatch('storeTotalPonies', total_ponies)
      }).catch(({text}) => {
        this.$showToast(text) // TODO: Nem mindenre kell errort dobni
      })

    }

    // Get timeframe
    this.$api.getCurrentTimeframe().then((timeframe) => {
      this.$store.dispatch('storeTimeframe', timeframe)
    }).catch(({text}) => {
      this.$showToast(text) // TODO: Nem mindenre kell errort dobni
    })


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
