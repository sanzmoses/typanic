<template>
  <q-chip class="tile border-none" square :id="word" :color="setup.tile_color" :text-color="setup.tile_text">
    <q-avatar class="border-none" v-if="power_tile" :icon="power_tile.icon" :color="power_tile.color" text-color="white" />
    <p class="word ma-0" v-html="parse_word"></p>
  </q-chip>
</template>

<script>
import gsap from 'gsap'
import _ from 'lodash'
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { getSetup } from '@/composables/setup.js'
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { is } from 'quasar'

export default {
  name: "WordTile",
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

    let drop_animation = null;
    const max_width = setup.value.width
    const max_height = setup.value.height
    const x = ref(null)
    // x position in the plane
    x.value = _.random(1, max_width - 130)

    // tile prop
    const is_faster = isRelativelyFaster()
    const fastest = isDoubleSpeed()
    const power_tile = grabPowerTile()

    let word_hits = 0;
    let word_try = 0;

    const parse_word = computed(() => {
      let html_string = props.word
      
      if(html_string.includes(props.input_string)) {
        return html_string.replace(
          props.input_string, 
        `<span style='color: ${setup.value.highlight}; font-weight: bold;'>${props.input_string}</span>`
        )
      }

      return html_string
    })

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
        drop_animation.pause()
      } else {
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
        console.log("pausing and killing")
        drop_animation.pause()
        drop_animation.kill()
      }
    })

    watchEffect(() => {
      if(props.input_string.length > 0) {
        if(props.word.includes(props.input_string)) {
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

        runtime.removeWord(props.word)
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
        drop_animation.totalDuration(5)
      }
    })

    onMounted(() => {
      gsap.set('#'+props.word, {
        x: x.value,
        y: -40,
      })

      drop_animation = gsap.to('#'+props.word, {
        y: max_height - 30,
        ease: 'none',
        duration: runtime.level_speed,
        onComplete: () => {
          // missed words
          console.log("missed words", props.word)
          runtime.processHP('drop', props.word)
          runtime.removeWord(props.word)
        }
      }); 

      setInitialSpeed()
    })

    return {
      x,
      setup,
      parse_word,
      power_tile,      
    }
  },
}
</script>

<style lang="scss" scoped>
.tile {
  position: absolute;
}

.border-none {
  border-radius: 0px !important;
}

.word {
  font-size: 15px;
}

</style>