<template>
  <b-row>
    <b-col v-for="i in $store.state.total_ponies" :key="i" cols="4">
      <small-hug-card :hug-data="getHugDataAtOrder(i)" class="w-100 mb-3"/>
    </b-col>
  </b-row>
</template>

<script>
import SmallHugCard from "@/components/SmallHugCard";

export default {
  name: "HerdGrid",
  components: {
    SmallHugCard
  },
  data() {
    return {
      insideOutHugs: {}
    }
  },
  props: {
    hugs: Array
  },
  methods: {
    getHugDataAtOrder(i) {
      return this.hugs.find((hug) => hug.pony.order === i) || null // Why does undefined even exists??
    }
  }
}
</script>

<style scoped>

</style>