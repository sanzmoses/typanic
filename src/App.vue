<template>
  <div id="outer-container">
    <div class="pa-5">
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    
    <PlayerNameDialog />

    <SeamlessNav 
      class="fix center-left"  
      position="left"
      label="How to play" 
      width="600px"
    >
     <Instructions />
    </SeamlessNav>

    <SeamlessNav 
      class="fix upper-right"  
      position="right"
      label="Hall of fame" 
      width="600px"
    >
      <HallOfFame />
    </SeamlessNav>

    <SeamlessNav 
      class="fix upper-left"  
      position="top"
      label="About the game" 
      width="500px"
    >
      <About />
    </SeamlessNav>
  </div>
</template>

<script>
import PlayerNameDialog from "./components/PlayerNameDialog.vue"
import SeamlessNav from "./components/SeamlessNav.vue"
import Instructions from "./components/SeamlessContent/Instructions.vue"
import About from "./components/SeamlessContent/About.vue"
import HallOfFame from "./components/SeamlessContent/HallOfFame.vue"
import { init } from '@/composables/supabase.js'
import { onMounted } from "vue"

export default {
  name: 'App',
  components: {
    PlayerNameDialog,
    SeamlessNav,
    Instructions,
    About,
    HallOfFame,
  },
  setup() {
    const { getUserScores } = init()

    onMounted(() => {
      getUserScores()
    })
  }
}
</script>

<style lang="scss">
body {
  scrollbar-width: thin; /* "auto" or "thin" */
  scrollbar-color: blue orange; /* scroll thumb and track */
  position: relative; 
}

.fix {
  position: fixed;
  top: 0;

  &.center-left {
    top: 50%;
    transform: translateX(-50px) rotate(-90deg);
  }

  &.upper-right {
    right: 0;
    left: auto;
  }
}
</style>
