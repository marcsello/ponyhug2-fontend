<template>
  <div>
    <b-row>
      <b-col>
        <herd-stats :hug-count="hugs.length" :hugs-loading="hugsLoading"/>
      </b-col>
    </b-row>
    <herd-grid :hugs="hugs" v-if="!hugsAndTotalPoniesLoading"/>
  </div>
</template>

<script>
import HerdStats from "@/components/HerdStats";
import HerdGrid from "@/components/HerdGrid";

export default {
  name: "Herd",
  components: {
    HerdStats,
    HerdGrid
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