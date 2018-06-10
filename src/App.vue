<template>
  <div id="app">
  <Navbar></Navbar>
    
    <router-view/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Navbar from '@/components/Navbar.vue';

export default{
  components: {
    Navbar
  },
  methods: {
    ...mapActions({ fetchAllCards: 'fetchAllCards' }),
  },
  computed: {
    ...mapGetters(['legendaries']),
  },

  mounted() {
    this.fetchAllCards();
  },
};
</script>
<style lang="stylus">
@import '../src/assets/style/variables'


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100vh;
  background-color: hs-gray;

}
</style>

