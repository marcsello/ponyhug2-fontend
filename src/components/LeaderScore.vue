<template>
  <b-nav-text class="text-white" v-if="$store.state.leader_score !== null">
    <b-icon icon="trophy"/>
    {{ $store.state.leader_score }}
  </b-nav-text>
</template>

<script>
export default {
  name: "LeaderScore",
  data() {
    return {
      timer: null
    }
  },
  methods: {
    instantUpdate() {
      this.$api.getLeaderStat().then(({hug_counter}) => {
        this.$store.dispatch('storeLeaderScore', hug_counter)
      }).catch(() => {
        // Errors are ignored
      })
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.instantUpdate()
    }, 30000) // 30sec
  },
  mounted() { // it seems like that v-if buzerates mounted()... this is sufficent for now
    if (this.$store.state.playerdata.registered) {
      this.instantUpdate()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>