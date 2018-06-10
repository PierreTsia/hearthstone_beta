<template>
  <div class="home">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
           Hearthstone Deck Builder
          </h1>
          <h2 class="subtitle">
            Busy night... but there's always room for another!
          </h2>
        </div>
      </div>
</section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Navbar,
  },
};
</script>
<style lang="stylus">
.home

  .hero
      background-image url(../../src/assets/img/header-hearthstone_blur.jpg)
      height 380px
      .hero-body
          flex-direction column
          justify-content center
          .title
            color white
          .subtitle
            font-style italic
            color lightgray

</style>