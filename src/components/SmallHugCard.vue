<template>
  <router-link v-if="hugData != null" :to="{name: 'Pony', params: {id: hugData.id}}">
      <b-img fluid rounded :src="hugData.pony.image"/>
  </router-link>
  <b-img rounded v-else src="@/assets/placeholder.png" />
</template>

<script>
export default {
  name: "SmallPonyCard",
  props: {
    hugData: Object
  }
}
</script>