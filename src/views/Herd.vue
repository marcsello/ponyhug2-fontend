<template>
  <div>
    <b-row>
      <b-col>
        <herd-stats :hug-count="hugs.length"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <herd-list :hugs="hugs"/>
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
      this.$showToast(text) // TODO: ez is fos
    })
  }
}
</script>

<style scoped>

</style>