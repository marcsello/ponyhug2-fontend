<template>
  <b-list-group>
    <small-pony-card v-for="hug in hugs" :id="hug.pony.id" :img-src="hug.pony.image" :name="hug.pony.name" :key="hug.id"/>
  </b-list-group>
</template>

<script>
import SmallPonyCard from "@/components/SmallPonyCard";

export default {
  name: "HerdList",
  components: {
    SmallPonyCard
  },
  props: {
    hugs: Array
  }
}
</script>

<style scoped>

</style>