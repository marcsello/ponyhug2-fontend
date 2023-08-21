<template>
  <b-nav-text class="text-white" v-if="$store.state.leader_score !== null">
    <b-icon icon="trophy"/>
    {{ $store.state.leader_score }}
  </b-nav-text>
</template>

<script>

export default {
  name: "LeaderScore",
}
</script>

<style scoped>

</style>