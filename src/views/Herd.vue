<template>
  <div>
    <b-row>
      <b-col>
        <b-overlay :show="hugsLoading" rounded="sm">
          <herd-stats :hug-count="hugs.length" :hugs-loading="hugsLoading"/>
        </b-overlay>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <herd-list :hugs="hugs" v-if="!hugsLoading"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import HerdStats from "@/components/HerdStats";
import HerdList from "@/components/HerdList";

export default {
  name: "Herd",
  components: {
    HerdStats,
    HerdList
  },
  data() {
    return {
      hugs: [],
      hugsLoading: true
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