<template>
  <div ref="tileEffect" class="tile-overlay">
    <div :class="['fire-effect', 'fire-effect-'+word]">
      <template v-for="particle in particles" :key="'p-'+particle">
        <div :class="['particles', 'particles-'+word+'-'+particle]"></div>
      </template>
    </div>
    <div :class="['ice-effect', 'ice-effect-'+word]">
      <div :class="['ice-blade', 'ice-blade-'+word]"></div>  
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
    },
    word: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const { setup } = getSetup()
    const runtime = useRuntimeStore()
    const particles = ref(1)
    const tileEffect = ref(null)
    const tile_width = ref(null)
    const tile_height = ref(null)

    const word = props.word

    particles.value = Math.floor(_.random(15, 20))
    let animate_particles, animate_blade, fire_effect, ice_effect;

    watch(() => props.effect, (first) => { 
      if(first === 'fire') {
        fire_effect.play()
        animate_particles.play()
      }

      if(first.includes("ice+") || first === "ice") {
        ice_effect.play()
        animate_blade.play()

        let again = _.debounce(() => {
          animate_blade.restart();
          again();
        }, 4000)

        again();
      }

      if(first === 'ice-end') {
        ice_effect.reverse()
        animate_blade.reverse();
      }
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

      animate_blade = gsap.to('.ice-blade-'+word, {
        duration: 0.8, 
        keyframes: {
          x: [tile_width.value+20, -20]
        },
        paused: true, 
        ease: 'circ.out',
        repeat: true,
      })

      ice_effect = gsap.to('.ice-effect-'+word, {
        opacity: 1,
        duration: 0.4,
        paused: true, 
        ease: 'circ.out',
      })

      animate_particles = gsap.timeline({
        paused: true, 
        duration: 2, 
        ease: 'circ.out',
      })
      
      fire_effect = gsap.to('.fire-effect', {
        duration: .1,
        opacity: 1,
        ease: 'Power4.out',
        paused: true
      })

      for(let i = 1; i <= particles.value; i++) {
        let random_values = {
          x: Math.floor(_.random(0, tile_width.value)),
          y: Math.floor(_.random(0, tile_height.value)),
          scale: Math.floor(_.random(3, 5))
        }

        gsap.set('.particles-'+word+'-'+i, {
          opacity: 0,
          x: random_values.x,
          y: random_values.y,
          width: random_values.scale,
          height: random_values.scale
        })

        let post_rand_pos = {
          x: Math.floor(_.random(-10, 10)),
          y: Math.floor(_.random(0, tile_height.value)),
        }
        
        let rand_duration = _.random(.1, 1)

        animate_particles.to('.particles-'+word+'-'+i, {
          keyframes: {
            "20%": {
              x: random_values.x += post_rand_pos.x,
              opacity: 1,
            },
            "50%": {
              x: random_values.x += post_rand_pos.x,
            },
            "80": {
              x: random_values.x += post_rand_pos.x,
            },
            "100%": {
              backgroundColor: "yellow",
              x: random_values.x += post_rand_pos.x,
              y: post_rand_pos.y - 80,
              width: 1,
              height: 1,
              opacity: 0,
            }
          }
        }, rand_duration)
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
      tileEffect,
      word,
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
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.fire-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid rgb(255, 213, 121);
  opacity: 0;
}
.ice-effect {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 2px solid white;
  opacity: 0;
  background-color: #00D1FF;

  .ice-blade {
    height: 120%;
    width: 5px;
    background-color: #ffffff;
    transform: rotate(20deg) scale(1.5);
    top: 0;
    left: -20px;
  }
}
</style>