<template>
  <b-nav-text class="text-white" v-if="leaderScore">
    <b-icon icon="trophy"/>
    {{ leaderScore }}
  </b-nav-text>
</template>

<script>
export default {
  name: "LeaderScore",
  data() {
    return {
      leaderScore: null,
      timer: null
    }
  },
  methods: {
    instantUpdate() {
      this.$api.getLeaderStat().then(({hug_counter}) => {
        this.leaderScore = hug_counter
      })
    }
  },
  created() {

    this.timer = setInterval(() => {
      this.instantUpdate()
    }, 30000) // 30sec

  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>