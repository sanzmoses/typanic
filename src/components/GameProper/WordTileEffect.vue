<template>
  <div class="tile-overlay">
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

    let ice, slow, fire, heal, word;

    watch(is_power_ice_active, () => { 
      if(is_power_ice_active.value) {
        ice.play()
        word.play()
      } else {
        ice.reverse()
        word.reverse()
      }
    })

    // watch(is_power_fire_active, () => { 
    //   if(is_power_fire_active.value) {
    //     fire.restart()
    //   }
    // })

    // watch(is_power_slow_active, () => { 
    //   (is_power_slow_active.value)? slow.play(): slow.reverse();
    // })

    // watch(is_power_heal_active, () => { 
    //   if(is_power_heal_active.value) {
    //     heal.play()

    //     setTimeout(() => {
    //       heal.reverse()
    //     }, 1000)
    //   }
    // })

    onMounted(() => {
      gsap.set('.tile-overlay', {
        opacity: 0,
      })

      const values = {
        ease: "power4.out",
        opacity: 1,
        backgroundColor: '00C2FF',
        borderColor: 'white',
        duration: .4,
        paused: true,
      }

      ice = gsap.to('.tile-overlay', values)
      word = gsap.to('.word', {
        duration: .4,
        color: 'white',
        paused: true,
      })

    })

    return {
      gamebox: setup,
    }
  }
}
</script>

<style lang="scss" scoped>
.tile-overlay {
  position: absolute;
  overflow: hidden;
  top: -2px;
  left: -2px;
  width: 104%;
  height: 115%;
  border: 2.5px solid;
  z-index: 1;
}
</style>