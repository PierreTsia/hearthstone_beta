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
  <section class="main_section">
    <div class="container">
    <template>
      <section>
        <b-field grouped group-multiline>
            <b-select v-model="defaultSortDirection">
                <option value="asc">Default sort direction: ASC</option>
                <option value="desc">Default sort direction: DESC</option>
            </b-select>
            <b-select v-model="perPage" :disabled="!isPaginated">
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="20">20 per page</option>
            </b-select>
            <div class="control">
                <button class="button" @click="currentPage = 2" :disabled="!isPaginated">Set page to 2</button>
            </div>
            <div class="control is-flex">
                <b-switch v-model="isPaginated">Paginated</b-switch>
            </div>
            <div class="control is-flex">
                <b-switch v-model="isPaginationSimple" :disabled="!isPaginated">Simple pagination</b-switch>
            </div>
        </b-field>

        <b-table
            :data="flattened"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :default-sort-direction="defaultSortDirection"
            default-sort="card.name">

            <template slot-scope="props">
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
                      }">{{ props.row.name }}</span>
                </b-table-column>

                <b-table-column field="user.last_name" label="Last Name" sortable>
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="date" label="Date" sortable centered>
                    <span class="tag is-success">
                       pouet
                    </span>
                </b-table-column>

                <b-table-column label="Gender">
                    <b-icon pack="fas"
                        icon="cards">
                    </b-icon>
                    gender
                </b-table-column>
            </template>
        </b-table>
      </section>
    </template>








      
    </div>
  
  
  </section>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
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
      perPage: 5
    }
  }, 
  computed: {
    ...mapGetters(['legendaries','flattened'])
  },
  methods: {
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

</style>