<template>
  <b-nav-text v-if="$store.state.factions_fetched">
    <b-img :src="imgSrc" height="30px" :alt="$store.getters.myFactionData.name"/>
  </b-nav-text>
</template>


<script>
export default {
  name: "FactionIndicator",
  computed: {
    imgSrc() {
      const image_name = this.$store.getters.myFactionData.icon_set + "_team_sm.png"
      const images = require.context('../assets/', false, /\.png$/)
      return images('./' + image_name)
    }
  }
}
</script>