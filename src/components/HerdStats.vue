<template>
  <b-jumbotron header="Istálló" lead="Eddig megölelt pónik:" class="text-center">
    <p class="herd-counter">2</p>
    <b-progress :value="20" :max="100" animated></b-progress>
  </b-jumbotron>
</template>

<script>
export default {
name: "HerdStats"
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