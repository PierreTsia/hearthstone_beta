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
  <section  v-if="flattened.length" class="main_section">
    <div class="container">
    <template>
      <section>
   

        <b-table
            :data="flattened"
            :paginated="isPaginated"
            per-page=20
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :default-sort-direction="defaultSortDirection"
            default-sort="card.name">

            <template slot-scope="props">
                 <b-table-column field="Cost" label="Cost" width="30" sortable>
                    {{props.row.cost}}
                </b-table-column>
                
                <b-table-column field="Set" label="Set" width="30" sortable>
                 <img :src="getCardSetIcon(props.row.cardSet)"/>
                </b-table-column>

                <b-table-column field="card.name" label="Name" sortable>
                    <span :class="{
                      'card_name': true,
                      '--isCommon': props.row.rarity === 'Common',
                      '--isUncommon':  props.row.rarity === 'Uncommon',
                      '--isRare':  props.row.rarity === 'Rare',
                      '--isEpic':  props.row.rarity === 'Epic',
                      '--isLegendary':  props.row.rarity === 'Legendary',
                      }">
                      <b-tooltip v-if="props.row.text" :label="sanitizeCardText(props.row.text)">
                        {{ props.row.name }}
                      </b-tooltip>
                      <span v-else>{{ props.row.name }}</span>
                    </span>
                </b-table-column>
                <b-table-column field="Class" label="Class" sortable>
                    {{ props.row.playerClass }}
                </b-table-column>
                <b-table-column field="type" label="Type" sortable>
                    {{ props.row.type }}
                </b-table-column>

                <b-table-column  label="Actions"  centered>
                    <span 
                      class="tag is-danger"
                      @click="openModal(props.row)">
                       <b-icon 
                        icon="eye"
                        size="is-small">
                        </b-icon>
                    </span>
                </b-table-column>
            </template>
        </b-table>
      </section>
    </template>

   


<template>
    <section>


    
        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
            <div v-if="modalContent" class="card">
                <div class="card-image">
                    <figure class="image">
                        <img v-if="modalContent.img" class="modal_card--img":src="modalContent.img" alt="Image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                  
                        <div class="media-content">
                            <p class="title is-4">{{modalContent.name}}</p>
                            <p class="subtitle is-6"> Class: {{modalContent.playerClass}}</p>
                        </div>
                    </div>

                    <div class="content">
                        <span v-if="modalContent && modalContent.text" v-html="sanitizeModalText(modalContent.text)"></span>
                        <br>
                        <small>{{modalContent.artist}}</small>
                    </div>
                </div>
            </div>
        </b-modal>
    </section>
</template>


    </div>
  </section>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'home',
  components: {
    Navbar,
  },
  data() {
    return {
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 5,
      isCardModalActive: false,
      modalContent:null,
    }
  }, 
  computed: {
    ...mapGetters(['legendaries','flattened'])
  },
  methods: {
    ...mapActions({
      fetchCardById: 'fetchCardById',
    }),
    openModal(card){
      this.modalContent = card;
      this.isCardModalActive = true;
    },
    handleFetchCardDetails(cardId){
      this.fetchCardById(cardId);
    },
    sanitizeCardText(string) {
      return string.replace(/\\n/g, '').replace('_', ' ').replace('[x]', '').replace('<b>', '').replace('</b>', '').replace('$', '')
    },
    sanitizeModalText(string) {
      return string.replace(/\\n/g, '<br>').replace('_', ' ').replace('[x]', '').replace('<b>', '<strong>').replace('</b>', '</strong>').replace('$', '')
    },


    getCardSetIcon(cardSet) {
      switch (cardSet){
        case 'Classic': 
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_Classic.png";
          break;
        case 'Basic':
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Misc_BattleNet.png";
          break;
        case 'Blackrock Mountain':
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_BRM.png";
          break;
        case 'Credits':
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Misc_BattleNet.png";
          break;
        case 'Goblins vs Gnomes':
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_GVG.png";
          break;
        case 'Hall of Fame':
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_HOF.png";
          break;
        case 'Hero Skins':
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Misc_BattleNet.png"
          break;
        case "Journey to Un'Goro":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_Ungoro.png"
          break;
        case "Knights of the Frozen Throne":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_ICC.png";
          break;
        case "Kobolds & Catacombs":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_LOOT.png";
          break;
        case "Mean Streets of Gadgetzan":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_Gadgetzan.png";
          break;
        case "Missions":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Misc_BattleNet.png";
          break;
        case "Naxxramas":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_Naxx.png";
          break;
        case "One Night in Karazhan":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_Kara.png";
          break;
        case "Tavern Brawl":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Misc_BattleNet.png";
          break;
        case "Taverns of Time":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Misc_BattleNet.png";
          break;
        case "The Grand Tournament":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_TGT.png";
          break;
        case "The League of Explorers":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_LOE.png";
          break;
        case "The Witchwood":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_WOOD.png";
          break;
        case "Whispers of the Old Gods":
          return "https://raw.githubusercontent.com/HearthSim/hs-icons/master/PNG/Set_OG.png";
          break;        
      }
    }
  }
};
</script>
<style lang="stylus">
@import '../assets/style/variables'
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


  .main_section  
    margin-top 50px
    .container
      background-color white
      .--isCommon
        color hs-common
      .--isUncommon
        color hs-uncommon
      .--isRare
        color hs-rare
      .--isEpic
        color hs-epic
      .--isLegendary
        color hs-legendary

  .card


    .modal_card--img
      height 400px
      width auto
      margin auto
    .card-content
      p
        text-align center
      .content
        text-align center

</style>