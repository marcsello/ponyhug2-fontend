<template>
  <b-nav-text class="text-white" v-if="$store.state.leader_score !== null">
    <b-icon icon="trophy"/>
    {{ $store.state.leader_score }}
  </b-nav-text>
</template>

<script>

import {leaderScoreUpdaterMixin} from '@/mixins'

export default {
  name: "LeaderScore",
  mixins: [
    leaderScoreUpdaterMixin
  ],
  data() {
    return {
      timer: null
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.updateLeaderScore()
    }, 30000) // 30sec
  },
  mounted() { // it seems like that v-if buzerates mounted()... this is sufficent for now
    if (this.$store.state.playerdata.registered) {
      this.updateLeaderScore()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>