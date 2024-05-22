<template>
  <div>
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
  </div>
</template>

<script>
import Header from './components/Header.vue'
import PlayerNameDialog from "./components/PlayerNameDialog.vue"

export default {
  name: 'App',
  components: {
    PlayerNameDialog
  },
  setup() {
  }
}
</script>

<style lang="scss">
body {
  scrollbar-width: thin;          /* "auto" or "thin" */
  scrollbar-color: blue orange;   /* scroll thumb and track */ 
}
</style>
