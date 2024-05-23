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

    <SeamlessNav class="fix center-left" :label="'How to play'" />
    <SeamlessNav class="fix upper-right" :label="'Hall of fame'" />
    <SeamlessNav class="fix upper-left" :label="'About the game'" />
  </div>
</template>

<script>
import PlayerNameDialog from "./components/PlayerNameDialog.vue"
import SeamlessNav from "./components/SeamlessNav.vue"

export default {
  name: 'App',
  components: {
    PlayerNameDialog,
    SeamlessNav
  },
  setup() { }
}
</script>

<style lang="scss">
body {
  scrollbar-width: thin; /* "auto" or "thin" */
  scrollbar-color: blue orange; /* scroll thumb and track */
  position: relative; 
}

.fix {
  position: absolute;
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
