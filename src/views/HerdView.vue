<template>
  <div>
    <b-row>
      <b-col>
        <herd-stats :hug-count="hugs.length" :hugs-loading="hugsLoading"/>
      </b-col>
    </b-row>
    <herd-grid :hugs="hugs" v-if="!hugsAndTotalPoniesLoading"/>
    <b-row class="mt-5">
      <b-col>
        <nav-button-group/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import HerdStats from "@/components/HerdStats";
import HerdGrid from "@/components/HerdGrid";
import NavButtonGroup from "@/components/NavButtonGroup";

export default {
  name: "HerdView",
  components: {
    HerdStats,
    HerdGrid,
    NavButtonGroup
  },
  data() {
    return {
      hugs: [],
      hugsLoading: true
    }
  },
  computed: {
    hugsAndTotalPoniesLoading() {
      return this.hugsLoading || (this.$store.state.total_ponies == null);
    }
  },
  mounted() {
    this.$api.getHugs().then((hugs) => {
      this.hugs = hugs
      this.hugsLoading = false
    }).catch(({text}) => {
      this.hugsLoading = false
      this.$showToast(text) // API Call failed
    })
  }
}
</script>

<style scoped>

</style>