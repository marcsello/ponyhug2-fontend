<template>
  <div id="app">

    <navbar/>

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
import Navbar from "@/components/Navbar";
import FooterContent from "@/components/FooterContent";

import {initialInfoFetchMixin} from '@/mixins'

export default {
  components: {
    FooterContent,
    Navbar
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
