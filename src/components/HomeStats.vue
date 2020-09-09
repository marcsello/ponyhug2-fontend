<template>
  <div>
    <b-card title="A játék állása">
      <p>
        Megölelt pónik
        <b-progress :max="100">
          <b-progress-bar :value="20" label="2/15"/>
        </b-progress>
      </p>
      <p>
        A vezető ölelései
        <b-progress :max="100">
          <b-progress-bar :value="100" label="15/15" variant="warning" class="text-dark"/>
        </b-progress>
      </p>
      <p>
        Hátralévő idő
        <b-progress :max="100">
          <b-progress-bar :value="42" label="01:11:54" variant="danger"/>
        </b-progress>
      </p>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "HomeStats"
}
</script>

<style scoped>

</style>