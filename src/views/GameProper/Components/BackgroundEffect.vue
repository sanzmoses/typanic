<template>
  <div class="bg-overlay"
    :style="{
      width: gamebox.width + 'px',
      height: gamebox.height + 'px'
    }"
  >
  <div class="overlay-effect bg-ice">
      <div class="aftereffect after-freeze"></div>
    </div> 
    <div class="overlay-effect bg-slow"></div> 
    <div class="overlay-effect bg-fire">
      <div class="aftereffect after-burn"></div>
    </div> 
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

    let ice, slow, fire, heal, afterFreeze;

    watch(is_power_ice_active, () => { 
      if(is_power_ice_active.value) {
        ice.restart()
      } else {
        afterFreeze.restart()
      }
    })

    watch(is_power_fire_active, () => { 
      if(is_power_fire_active.value) {
        fire.restart()
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
        ease: "power4.out",
        opacity: 1,
        duration: .4,
        scale: 1.75,
        height: setup.value.width,
        width: setup.value.width,
      }

      slow = gsap.to('.bg-slow', { ...values, paused: true })
      heal = gsap.to('.bg-heal', { ...values, paused: true })
      ice = gsap.to('.bg-ice', { ...values, paused: true })

      afterFreeze = gsap.timeline({ paused: true });
      afterFreeze.to('.after-freeze', {
        ...values,
        ease: "power2.out",
        scale: 1.7,
      })
      afterFreeze.to('.bg-ice, .after-freeze', {
        opacity: 0,
        delay: .4
      })

      fire = gsap.timeline({ paused: true });
      fire.to('.bg-fire',  {...values})
      fire.to('.after-burn', {
        ...values,
        scale: 2,
        delay: .2,
      })
      fire.to('.bg-fire', {
        opacity: 0,
        delay: .1,
      })
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
  width: 0px;
  height: 0px;
  &.bg-ice {
    background: rgb(187,255,255);
    background: linear-gradient(315deg, rgb(154, 255, 242) 0%, rgb(0, 208, 255) 100%);
    border: 3px solid rgb(0, 68, 255);
  }
  &.bg-fire {
    background: #FF6400;
    background: linear-gradient(152deg, #ffcb47 0%, #ff8521 100%);
    border: 3px solid rgb(255, 0, 0);
  }
  &.bg-slow {
    background: #FF6400;
    background: linear-gradient(152deg, #FFF 0%, #FF8AF3 100%);
    border: 3px solid rgb(255, 0, 195);
  }
  &.bg-heal {
    background: #FF6400;
    background: linear-gradient(152deg, #FFF 0%, #9CFFA6 100%);
  }
  .aftereffect {
    opacity: 0;
    position: absolute;
    right: calc(50% - 100px);
    bottom: calc(50% - 100px);
    border-radius: 50%;
    width: 0px;
    height: 0px;
    &.after-burn {
      background: rgb(255, 236, 168);
    }
    &.after-freeze {
      background: rgb(229, 255, 255);
      border: 2px solid rgb(28, 99, 252);
    }
  }
}
</style>