import Vue from 'vue'
import Vuex from 'vuex'
const unirest = require('unirest');
const baseURL = "https://omgvamp-hearthstone-v1.p.mashape.com";
const appKEY = "fbRvKYOi1qmshUcm5ypQkyB4r5ixp1HoMdVjsnbjE0wwcU2Pj0"




Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: {
      all: null,
      total: null,
    }

  },
  mutations: {

    fetchAllCards_SUCCESS(state, payload){
      state.cards.all = payload;
    }

  },
  actions: {
    fetchAllCards({commit}) {
      unirest.get(`${baseURL}/cards?locale=enEN`)
      .header("X-Mashape-Key", appKEY)
      //.header("X-Mashape-Host", API_HOST)
      .end(result => {
        commit('fetchAllCards_SUCCESS', result.body)
      });
    }

  },
  getters: {
    legendaries(state) {
     let result =[]
       for(let ext in state.cards.all) {
          let filtered = state.cards.all[ext].filter(card => card.rarity === "Legendary")
          result.push(...filtered)
       }
       return result
      
    }
  }
})
