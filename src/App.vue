<template>
  <div id="app">

    <nav-bar/>

    <div id="content">
      <b-container>
        <router-view/>
      </b-container>
    </div>

    <div id="footer">
      <b-container>
        <footer-content/>
      </b-container>
    </div>

  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import FooterContent from "@/components/FooterContent";

import {initialInfoFetchMixin} from '@/mixins'

export default {
  components: {
    FooterContent,
    NavBar
  },
  mixins: [
    initialInfoFetchMixin
  ],
  created() {
    // Recieve player data
    this.smartFetchRequired()
  }
}

</script>


<style>

#content {
  margin-top: 70px;
  margin-bottom: 20px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#footer {
  padding: 1em;
  margin-top: auto;
  background: #E9ECEF;
}

</style>
