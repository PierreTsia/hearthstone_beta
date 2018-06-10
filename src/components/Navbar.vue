<template>
    <nav class="navbar is-fixed">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="https://blizzworldbg.com/resources/img/icons/hearthstone.svg" alt="logo" width="112" height="58">
            </a>
            <div @click="toggleMenu" 
                :class="{
                    'burger': true,
                    'navbar-burger': true,
                    'is-active': navIsActive,
                }" 
                data-target="mainNav">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="mainNav" 
            :class="{
                'navbar-end': true, 
                'navbar-menu': true, 
                'is-active': navIsActive
            }">
            <div class="navbar-item">
                <div class="field is-grouped">
                    <div v-for="item in menuItems" 
                        class="navbar-item"
                        @click="handleMenuItemClick(item.link)">
                        <span>
                            <b-icon
                                :icon="item.icon">
                            </b-icon>
                            {{item.name}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    data(){
        return {
            menuItems: [
                {
                    link: '/',
                    name: 'Home',
                    icon: 'home'
                },
                {
                    link: '/cards',
                    name: 'Cards',
                    icon: 'cards',
                },
                {
                    link: '/decks',
                    name: 'Decks',
                    icon: 'stackoverflow'
                }

            ],
            navIsActive: false,
        }
    },
    methods: {
        handleMenuItemClick(link){
            this.$router.push(link)
        },
        toggleMenu(){
            this.navIsActive = !this.navIsActive
        }
    }
}
</script>

<style lang="stylus">
@import '../assets/style/variables'
.navbar-item
    cursor pointer
    margin 0px 10px
    &:hover
        color hs-legendary


</style>