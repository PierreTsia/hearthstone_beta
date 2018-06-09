<template>
  <div class="about">
    <div class="about__randomCard" v-if="randomLegendary">
      <button @click="setRandomIndex">Random</button>
      <h1> {{randomLegendary.name}} </h1>
      <span v-html="sanitizeCardText(randomLegendary.text)"></span><br>
      <img @mouseleave="stopHover" @mouseenter="isHovered" class="card__img" :src="randomLegendary.img"/>
    </div>
    <h1 v-else>LOADING....</h1>
    
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default{
  data(){
    return {
      randomIndex: null,
    }
  }, 
  methods: {
    sanitizeCardText(string){
      return string.replace(/\\n/g, '</br>').replace('_', ' ').replace('[x]', '')
    },
    isHovered(e){
      const el = e.path[0]
      el.classList.add('--isHovered')
    },
    stopHover(e){
      const el = e.path[0]
      el.classList.remove('--isHovered')
    },
    setRandomIndex(){
      this.randomIndex = Math.floor(Math.random() *  this.legendaries.length) + 1 
    }
   
    
  },
  computed: {
    ...mapGetters(['legendaries']),
    randomLegendary() {
      if(!this.randomIndex){
        return null
      }
      return this.legendaries[this.randomIndex]
    }
  },
  mounted(){
   
  },
  watch : {
    legendaries: {
      immediate: true,
      handler(){
        if(this.legendaries.length){
          this.setRandomIndex()
        }
      }
    }
    
  } 
}
</script>
<style>
.about__randomCard{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card__img{
  margin-bottom: 30px;
}
.--isHovered {
  transform: scale(1.05);
  transition: 0.3s linear all;
}
</style>
