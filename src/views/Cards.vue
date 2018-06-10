<template>
  <div class="about columns">
    <div class="about__randomCard column is-6 columns">
      <div v-if="legendaries && randomLegendary" class="column is-10 is-offset-1">
        <h1> {{randomLegendary.name}} </h1>
        <span v-html="sanitizeCardText(randomLegendary.text)"></span><br>
        <img @mouseleave="stopHover" @mouseenter="isHovered" class="card__img" :src="randomLegendary.img"/>
      </div>
      <button class="button is-rounded is-danger" @click="setRandomIndex">Random</button>
    </div>



    <div class="columns column is-6">
    
<div class="control column columns is-12">
  <input ref="input" class="input" type="text" placeholder="Card Name">
  <button @click="handleSearchCardName" class="button is-primary is-rounded">Search</button>
</div>    
    </div>
    <h1 v-if="!legendaries">LOADING....</h1>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import _ from 'lodash'

export default{
  data() {
    return {
      randomIndex: null,
      queryCardName: '',
      results:[]
    };
  },
  methods: {
    sanitizeCardText(string) {
      return string.replace(/\\n/g, '</br>').replace('_', ' ').replace('[x]', '');
    },
    isHovered(e) {
      const el = e.path[0];
      el.classList.add('--isHovered');
    },
    stopHover(e) {
      const el = e.path[0];
      el.classList.remove('--isHovered');
    },
    setRandomIndex() {
      this.randomIndex = Math.floor(Math.random() * this.legendaries.length) + 1;
    },
    handleSearchCardName(){
      this.queryCardName = this.$refs.input.value
    }
  },
  computed: {
    ...mapGetters({
        legendaries:'legendaries', 
        flattened: 'flattened',
    }),
    queryCard(){
      return _.find(this.flattened, {name: this.queryCardName})
    },
    randomLegendary() {
      if (!this.randomIndex) {
        return null;
      }
      return this.legendaries[this.randomIndex];
    },
  },
  mounted() {

  },
  watch: {
    legendaries: {
      immediate: true,
      handler() {
        if (this.legendaries.length) {
          this.setRandomIndex();
          
        }
      },
    },
    queryCardName: {
      immediate: true, 
      handler(){
        console.log(this.queryCardName)
      }
    }

  },
};
</script>
<style lang="stylus">
.about
  padding-top 100px
  .about__randomCard
    display flex
    flex-direction column
    align-items center
 

    .card__img
      margin-bottom: 30px;
      &.--isHovered 
        transform: scale(1.05);
        transition: 0.3s linear all;

</style>
