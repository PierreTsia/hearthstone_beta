import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

const unirest = require('unirest');

const baseURL = 'https://omgvamp-hearthstone-v1.p.mashape.com';
const appKEY = 'fbRvKYOi1qmshUcm5ypQkyB4r5ixp1HoMdVjsnbjE0wwcU2Pj0';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: {
      all: null,
      flatten: [],
    },

  },
  mutations: {
    fetchAllCards_SUCCESS(state, payload) {
      state.cards.all = payload
      for (let ext in payload){
        state.cards.flatten.push(...payload[ext].filter(card => card.cost))
      }
    },
  },
  actions: {
    fetchAllCards({ commit }) {
      unirest.get(`${baseURL}/cards?locale=enEN`)
        .header('X-Mashape-Key', appKEY)
        .end((result) => {
          commit('fetchAllCards_SUCCESS', result.body);
        });
    },
    fetchCardById({ commit }, cardId) {
      unirest.get(`${baseURL}/cards/${cardId}`)
        .header('X-Mashape-Key', appKEY)
        .end((result) => {
          console.log(result.body)
        });

    },
  },
  getters: {
    legendaries(state) {
      return state.cards.flatten.filter(card => card.rarity === 'Legendary')
    },
    flattened(state){
      return state.cards.flatten
    }
  },
});
