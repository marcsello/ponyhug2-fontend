<template>
  <b-list-group-item :to="{name: 'Pony', params: {id}}">
    <b-img fluid :src="imgSrc" class="w-25 pr-3"/>
    <span class="pony_name">{{ name }}</span>
  </b-list-group-item>
</template>

<script>
export default {
  name: "SmallPonyCard",
  props: {
    id: Number,
    imgSrc: String,
    name: String
  }
}
</script>

<style scoped>
span.pony_name {
  font-size: 1.2em;
  font-weight: bold;
}
</style>