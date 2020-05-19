<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {

  },
  methods: {
    tasks() {
      return this.$store.getters.getTasks;
    }
  }
};
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700");
  // Variables
  @import "./assets/sass/variables";
  @import "../node_modules/bootstrap/scss/bootstrap";
  @import "./assets/sass/style";

</style>
