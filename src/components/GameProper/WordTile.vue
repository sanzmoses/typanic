<template>
  <q-chip 
    ref="el"
    square
    :class="['tile', (power_tile?.name)? power_tile.name+'-tile' : '']" 
    :id="word" 
    :color="setup.tile_color" 
    :text-color="power_tile?.color?? setup.tile_text"
  >
    <!-- <q-avatar 
      v-if="power_tile" 
      :icon="power_tile.icon" 
      :color="power_tile.color" 
      text-color="white" 
    /> -->

    <p class="word ma-0">
      <span class="highlighted">{{ highlighted_letters }}</span>{{ remaining_letters }}      
    </p>

    <WordTileEffect 
      :word="word"
      :effect="effect" 
      :animate="animate" 
    />
  </q-chip>
</template>

<script>
import gsap from 'gsap'
import _ from 'lodash'
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { getSetup } from '@/composables/setup.js'
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import WordTileEffect from "./WordTileEffect.vue"

export default {
  name: "WordTile",
  components: {
    WordTileEffect
  },
  props: {
    word: {
      type: String,
      required: true
    },
    input_string: {
      type: String,
    }
  },
  setup (props) {
    const { 
      setup, 
      isRelativelyFaster, 
      isDoubleSpeed, 
      grabPowerTile,
    } = getSetup()
    const runtime = useRuntimeStore()
    const { 
      registered_word, 
      active_power_tile, 
      is_power_ice_active, 
      is_power_slow_active,
      is_power_fire_active,
      is_power_heal_active
    } = storeToRefs(runtime)

    let drop_animation = null, fire_animation = null, end_animation = null, ice_animation = null;
    const max_width = setup.value.width
    const max_height = setup.value.height
    const x = ref(null)
    const el = ref(null)

    // tile effect
    const effect = ref("")
    const animate = ref(false)

    // x position in the plane
    x.value = _.random(1, max_width - 130)

    // tile prop
    const is_faster = isRelativelyFaster()
    const fastest = isDoubleSpeed()
    const power_tile = grabPowerTile()

    let word_hits = 0;
    let word_try = 0;

    const highlighted_letters = computed(() => {      
      let string = props.word;
      if(
        string.includes(props.input_string) 
        && (string.indexOf(props.input_string) === 0)) {
        return props.input_string
      }

      return ''
    })

    const remaining_letters = computed(() => {
      let string = props.word;
      if(string.includes(props.input_string) 
      && (string.indexOf(props.input_string) === 0)) {
        return string.replace(
          props.input_string, 
          ''
        )
      }
      return string
    })

    const toggleTileEffect = value => {
      effect.value = value.effect;
      animate.value = value.animate;
    }

    const setInitialSpeed = () => {
      if(is_power_ice_active.value) {
        drop_animation.pause()

        let checkIfIceActive = _.debounce(() => {
          if(!is_power_ice_active.value) {
            setInitialSpeed();
            return;
          }
          checkIfIceActive();
        }, 100)

        checkIfIceActive();
        return
      }

      if(is_power_slow_active.value) {
        drop_animation.timeScale(.5)

        let checkIfSlowActive = _.debounce(() => {
          if(!is_power_slow_active.value) {
            setInitialSpeed();
            return;
          }
          checkIfSlowActive();
        }, 100)

        checkIfSlowActive();
        return
      }

      if(is_faster) {
        drop_animation.timeScale(1.5)
      } else if(fastest) {
        drop_animation.timeScale(2)
      } else {
        drop_animation.timeScale(1)
      }
    }

    watch(is_power_ice_active, () => { 
      if(is_power_ice_active.value) {
        toggleTileEffect({
          effect: "ice",
          animate: true,
        })
        ice_animation.play();
        drop_animation.pause()
      } else {
        toggleTileEffect({
          effect: "ice-end",
          animate: false,
        })
        ice_animation.reverse();
        drop_animation.resume()
        setInitialSpeed()
      }
    })

    watch(is_power_slow_active, () => { 
      if(is_power_slow_active.value) {
        drop_animation.timeScale(.5)
      } else {
        setInitialSpeed()
      }
    })

    watch(is_power_fire_active, () => { 
      if(is_power_fire_active.value) {
        drop_animation.pause()
        drop_animation.kill()

        fire_animation.play();

        toggleTileEffect({
          effect: "fire",
          animate: true,
        })
      }
    })

    watchEffect(() => {
      if(props.input_string.length > 0) {
        if(props.word.includes(props.input_string) && (props.word.indexOf(props.input_string) === 0)) {
          word_hits++;
        }
      }
    })

    watch(registered_word, () => {
      // typed word correctly
      if(registered_word.value === props.word) {
        if(power_tile) runtime.storePowerTile(power_tile)

        runtime.processStringSubmission(props.word);
        drop_animation.kill();

        end_animation.play()
        
        return
      }

      if(active_power_tile.value.length > 0) {
        return;
      }

      if(word_hits >= 5) {
        drop_animation.timeScale(2)
        word_hits = 0;
        word_try++;
      }

      if(word_try > 1) {
        runtime.addMistakes();
        drop_animation.totalDuration(5)
      }
    })

    onMounted(() => {
      gsap.set('#'+props.word, {
        x: x.value,
        y: -40,
        borderWidth: 2,
      })

      drop_animation = gsap.to('#'+props.word, {
        y: max_height - 30,
        ease: 'none',
        duration: runtime.level_speed,
        onComplete: () => {
          runtime.missedWord(props.word)
          runtime.removeWord(props.word)
        }
      }); 

      fire_animation = gsap.timeline({ 
        paused: true, 
        duration: .2, 
        ease: 'power4.out',
        onComplete: () => {
          runtime.removeWord(props.word)
        },
      });
      fire_animation.to('#'+props.word, {
        borderColor: 'red',
        borderWidth: 0,
      })
      .to('#'+props.word+' .word', {
        color: 'red',
      }, "<")
      .to('#'+props.word, {
        borderColor: 'white',
        opacity: 0
      }); 

      end_animation = gsap.timeline({ 
        paused: true, 
        duration: .1, 
        ease: "bounce.out",
        onComplete: () => {
          runtime.removeWord(props.word)
        },
      });
      end_animation.to('#'+props.word, {
        keyframes: {
          opacity: [0, 1, 0, 1]
        },
      })

      ice_animation = gsap.timeline({ 
        paused: true, 
        duration: 0.1, 
        ease: 'power4.out',
      });
      ice_animation.to('#'+props.word, {
        borderColor: 'white',
        borderWidth: 0,
      })
      .to('#'+props.word+' .word', {
        color: 'white',
      }, "<")
      .to('#'+props.word, {
        borderColor: 'white',
      }); 

      setInitialSpeed()
    })

    return {
      x,
      setup,
      power_tile,      
      highlighted_letters,
      remaining_letters,
      el,
      effect,
      animate,
    }
  },
}
</script>

<style lang="scss" scoped>
.tile {
  position: absolute;
  border-radius: 0px !important;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: #000000;
  overflow: visible !important;
  .word {
    font-size: 15px;
    z-index: 99;
  }

  .highlighted {
    color: #FF6F00 !important; 
    font-weight: bold;
  }
  
  &.ice-tile {
    border-image-source: linear-gradient(to bottom, #0057FF, #00D1FF);

    .word {
      color: #0066C5;
    }

    .highlighted {
      color: #0066C5 !important; 
    }
  }

  &.fire-tile {
    border-image-source: linear-gradient(to left, #FFC700, #FF0000);

    .word {
      color: #FF0000;
    }
    .highlighted {
      color: #930000 !important; 
    }
  }
  
  &.slow-tile {
    border-image-source: #00CD6B;

    .word {
      color: #6700A6;
    }

    .highlighted {
      color: #6700A6 !important; 
    }
  }
  
  &.heal-tile {
    border-image-source: #9E00FF;

    .word {
      color: #009D52;
    }

    .highlighted {
      color: #009D52 !important; 
    }
  }
}
</style>