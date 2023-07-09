<template>
  <div class="bg-overlay"
    :style="{
      width: gamebox.width + 'px',
      height: gamebox.height + 'px'
    }"
  >
    <div class="overlay-effect bg-slow"></div> 
    <div class="overlay-effect bg-ice"></div> 
    <div class="overlay-effect bg-fire"></div> 
    <div class="overlay-effect bg-heal"></div> 
    
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { getSetup } from '@/composables/setup.js'
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'
import _ from 'lodash'
import gsap from 'gsap'

export default {
  name: 'Template',
  setup() {
    const { setup } = getSetup()
    const runtime = useRuntimeStore()
    const { 
      is_power_ice_active,
      is_power_slow_active,
      is_power_fire_active,
      is_power_heal_active,
    } = storeToRefs(runtime)

    let ice, slow, fire, heal;

    watch(is_power_ice_active, () => { 
      (is_power_ice_active.value)? ice.play(): ice.reverse();
    })

    watch(is_power_fire_active, () => { 
      if(is_power_fire_active.value) {
        fire.play()

        setTimeout(() => {
          fire.reverse()
        }, 1000)
      }
    })

    watch(is_power_slow_active, () => { 
      (is_power_slow_active.value)? slow.play(): slow.reverse();
    })

    watch(is_power_heal_active, () => { 
      if(is_power_heal_active.value) {
        heal.play()

        setTimeout(() => {
          heal.reverse()
        }, 1000)
      }
    })

    onMounted(() => {
      gsap.set('.overlay-effect', {
        opacity: 0,
      })

      const values = {
        opacity: 1,
        duration: .4,
        scale: 15,
        paused: true,
      }

      ice = gsap.to('.bg-ice', values)
      fire = gsap.to('.bg-fire', values)
      slow = gsap.to('.bg-slow', values)
      heal = gsap.to('.bg-heal', values)
    })

    return {
      gamebox: setup,
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-overlay {
  position: absolute;
  overflow: hidden;
}
.overlay-effect {
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  &.bg-ice {
    background: rgb(187,255,255);
    background: linear-gradient(315deg, rgba(187,255,255,1) 0%, rgba(89,225,255,1) 100%);
  }
  &.bg-fire {
    background: #FF6400;
    background: linear-gradient(152deg, #9F0000 0%, #FF6400 58.33%, #FFE500 100%);
  }
  &.bg-slow {
    background: #FF6400;
    background: linear-gradient(152deg, #FFF 0%, #FF8AF3 100%);
  }
  &.bg-heal {
    background: #FF6400;
    background: linear-gradient(152deg, #FFF 0%, #9CFFA6 100%);
  }
}
</style>