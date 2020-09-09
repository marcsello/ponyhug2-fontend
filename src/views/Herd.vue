<template>
  <div>
    <b-row>
      <b-col>
        <herd-stats/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <herd-list/>
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
  }
}
</script>

<style scoped>

</style>