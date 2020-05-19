<template>
  <div class="home">
    <div class="container">
      <section class="main-section">
        <div class="row">
          <div class="col-md-12">
            Sample Testing
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {
  },
  data() {
    return {
      isLoading: false,
      message: ""
    };
  }
};
</script>

<style lang="scss" scoped>
  @import '../assets/sass/variables';

  @media (min-width: 1024px) {
    .home {
      min-height: calc(100vh - 334px);
    }
  }
  .main-section {
    margin-top: 4em;
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
