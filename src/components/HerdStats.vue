<template>
  <b-jumbotron header="Istálló" lead="Eddig megölelt pónik:" class="text-center">
    <p class="herd-counter">{{ herdCounterText }}</p>
    <b-progress :value="hugCount" :max="$store.state.total_ponies" animated></b-progress>
  </b-jumbotron>
</template>

<script>
export default {
  name: "HerdStats",
  props: {
    hugCount: Number,
    hugsLoading: Boolean
  },
  computed: {
    herdCounterText() {
      if (this.hugsLoading) {
        return '...'
      } else {
        return this.hugCount + '/' + this.$store.state.total_ponies
      }
    }
  }
}
</script>

<style scoped>
p.herd-counter {
  font-size: 2em;
}

.progress {
  background-color: #dbdbdb;
  border: 1px solid #c4c4c4;
}

</style>