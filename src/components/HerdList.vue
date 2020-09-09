<template>
  <b-list-group>
    <small-pony-card/>
    <small-pony-card/>
    <small-pony-card/>
    <small-pony-card/>
    <small-pony-card/>
  </b-list-group>
</template>

<script>
import SmallPonyCard from "@/components/SmallPonyCard";

export default {
  name: "HerdList",
  components: {
    SmallPonyCard
  }
}
</script>

<style scoped>

</style>