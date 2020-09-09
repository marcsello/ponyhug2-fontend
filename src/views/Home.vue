<template>
  <div>
    <b-row>
      <b-col class="my-2 text-center">
        <h1>PonyHug</h1>
        <p>A kaland itt indul...</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-2">
        <home-stats/>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="my-2">
        <h2>Hogyan játszd</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make
          a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
          containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
          versions
          of Lorem Ipsum.
        </p>
        <b-button block variant="primary" to="/hug">Ölelj meg egy pónit!</b-button>
        <b-button block variant="primary" to="/herd">Istálló</b-button>
      </b-col>
    </b-row>
  </div>

</template>

<script>

import HomeStats from "@/components/HomeStats";

export default {
  name: 'Home',
  components: {HomeStats}
}
</script>
