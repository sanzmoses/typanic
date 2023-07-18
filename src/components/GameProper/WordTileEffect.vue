<template>
  <div ref="tileEffect" class="tile-overlay">
    <div class="fire-effect">
      <template v-for="particle in particles" :key="'p-'+particle">
        <div :class="['particles', 'particles-'+particle]"></div>
      </template>
    </div>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { getSetup } from '@/composables/setup.js'
import { storeToRefs } from 'pinia'
import { ref, watch, onMounted } from 'vue'
import _ from 'lodash'
import gsap from 'gsap'

export default {
  name: 'Template',
  props: {
    effect: {
      type: String,
      required: true,
    },
    animate: {
      type: Boolean,
      required: true,
    }
  },
  setup(props) {
    const { setup } = getSetup()
    const runtime = useRuntimeStore()
    const particles = ref(20)
    const tileEffect = ref(null)
    const tile_width = ref(null)
    const tile_height = ref(null)

    let animate_particles;

    watch(() => props.effect, (first) => { 
      console.log("props first", first)
      console.log("props first", props.animate)
    })

    onMounted(() => {
      tile_width.value = tileEffect.value.getBoundingClientRect().width;
      tile_height.value = tileEffect.value.getBoundingClientRect().height;

      // gsap.set('.tile-overlay', {
      //   opacity: 1,
      // })

      // const values = {
      //   ease: "power4.out",
      //   opacity: 1,
      //   backgroundColor: '00C2FF',
      //   borderColor: 'white',
      //   duration: .4,
      //   paused: true,
      // }

      console.log("particles.value", particles.value)
      for(let i = 0; i < particles.value; i++) {
        let random_position = {
          x: Math.floor(_.random(0, tile_width.value)),
          y: Math.floor(_.random(0, tile_height.value))
        }

        console.log(random_position)

        gsap.set('.particles-'+i, {
          x: random_position.x,
          y: random_position.y
        })
        
      }

      // ice = gsap.to('.tile-overlay', values)
      // word = gsap.to('.word', {
      //   duration: .4,
      //   color: 'white',
      //   paused: true,
      // })

    })

    return {
      gamebox: setup,
      particles,
      tileEffect
    }
  }
}
</script>

<style lang="scss" scoped>
.tile-overlay {
  position: absolute;
  border-radius: 0px !important;
  overflow: visible !important;
  width: 100% !important;
  height: 100%;
  top: 0;
  left: 0;
}

.particles {
  position: absolute;
  display: block;
  background-color: red;
  width: 5px;
  height: 5px;
}
</style>