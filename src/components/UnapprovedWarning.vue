<template>
  <b-alert variant="danger" :show="$store.state.playerdata.registered && (!$store.state.playerdata.is_approved)" class="text-center">
    <b>A regisztrációd még nincs elfogadva!</b><br />
    Keress meg egy szervezőt!
  </b-alert>
</template>