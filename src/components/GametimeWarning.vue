<template>
  <b-alert variant="danger" :show="(!$store.getters.isInValidTimeframe) && $store.state.timeframe.fetched" class="text-center">
    Nincs aktív játékidő
  </b-alert>
</template>