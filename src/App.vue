<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        <b-icon
          icon="home"
          size="is-small">
        </b-icon>
        Home
      </router-link>

       |
      <router-link to="/about">
        <b-icon
                icon="account"
                size="is-small">
        </b-icon>
        About
      </router-link>
       |
      <router-link to="/deckbuilder">
        <b-icon
            icon="cards"
            size="is-small">
        </b-icon>
        Deck Builder
      </router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default{
  methods: {
    ...mapActions({fetchAllCards: "fetchAllCards"})
  },
  computed: {
    ...mapGetters(['legendaries'])
  },

  mounted(){
    this.fetchAllCards()
    
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

