<template>
  <b-nav-text v-if="$store.state.factions_fetched">
    <b-img :src="$store.getters.myFactionData.icon_sm" height="30px" :alt="$store.getters.myFactionData.name"/>
  </b-nav-text>
</template>