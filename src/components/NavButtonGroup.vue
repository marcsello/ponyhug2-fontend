<template>
<div>
  <b-button :variant="variant" v-for="(title, route) in buttonsNotThisPage" :key="route" block :to="{name:route}">{{title}}</b-button>
</div>
</template>

<script>
export default {
  name: "NavButtonGroup",
  props: {
    variant: {
      type: String,
      default: "secondary"
    }
  },
  data() {
    return {
      buttons: {
        "Home": "Főoldal",
        "Hug": "Ölelj meg egy pónit!",
        "Herd": "Istálló"
      }
    }
  },
  computed: {
    buttonsNotThisPage() {
      return Object.keys(this.buttons)
          .filter(key => key !== this.$route.name)
          .reduce((obj, key) => {
            obj[key] = this.buttons[key];
            return obj;
          }, {}) // Stack-overflow > lodash... literally
    }
  }
}
</script>

<style scoped>

</style>