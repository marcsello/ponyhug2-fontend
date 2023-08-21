<template>
  <b-overlay :show="stillLoading" rounded="sm">
    <b-jumbotron header="Istálló" lead="Eddig megölelt pónik:" class="text-center">
      <p class="herd-counter">{{ herdCounterText }}</p>
      <b-progress
          v-if="!stillLoading"
          :value="hugCount"
          :max="$store.state.total_ponies"
          animated
          :variant="barVariant"/>
    </b-jumbotron>
  </b-overlay>
</template>

<script>
export default {
  name: "HerdStats",
  props: {
    hugCount: Number,
    hugsLoading: Boolean
  },
  computed: {
    stillLoading() { // This is probably the worst way of doing this...
      return this.hugsLoading || (this.$store.state.total_ponies === null)
    },
    herdCounterText() {
      if (this.stillLoading) {
        return '...'
      } else {
        return this.hugCount + '/' + this.$store.state.total_ponies
      }
    },
    barVariant() {
      if (this.stillLoading) {
        return 'primary'
      }
      if (this.hugCount === this.$store.state.total_ponies) {
        return 'success'
      }
      return 'primary'
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