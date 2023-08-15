<template>
  <div>
    <b-overlay rounded="sm" :show="!$store.state.factions_fetched">
      <b-card title="A csapatod">
        <p>
          <b-aspect aspect="1:1">
            <b-img v-if="$store.state.factions_fetched" :src="imgSrc" fluid-grow/>
          </b-aspect>
        </p>
        <p class="h3 text-center">
          {{name}}
        </p>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
export default {
  name: "HomeFactionIndicator",
  computed: {
    name() {
      if (this.$store.state.factions_fetched) {
        return this.$store.getters.myFactionData.name
      } else {
        return '...'
      }
    },
    imgSrc() {
      const image_name = this.$store.getters.myFactionData.icon_set + "_team_lg.png"
      const images = require.context('../assets/', false, /\.png$/)
      return images('./' + image_name)
    }
  }
}
</script>

<style scoped>

</style>