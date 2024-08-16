<template>
  <div>
    <b-row align-h="between">
      <b-col cols="auto p-0">

        <div><b>Created by PonyHug Team</b></div>
        <div>
          <router-link :to="{name: 'About'}">Rólunk</router-link>
        </div>
        <div><a href="https://hunbrony.hu">Hunbrony.hu</a></div>

      </b-col>
      <b-col cols="auto p-0">
        <div class="text-center">
          <div>2019 - 2024</div>
          <div class="text-monospace">/)*(\</div>
        </div>

      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "FooterContent"
}
</script>

<style scoped>

</style>