<template>
  <b-jumbotron header="Istálló" lead="Eddig megölelt pónik:" class="text-center">
    <p class="herd-counter">{{ hugCount }} / {{ $store.state.total_ponies }}</p>
    <b-progress :value="hugCount" :max="$store.state.total_ponies" animated></b-progress>
  </b-jumbotron>
</template>

<script>
export default {
  name: "HerdStats",
  props:  {
    hugCount: Number
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