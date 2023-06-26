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
    const { setup, isRelativelyFaster, isDoubleSpeed, grabPowerTile } = getSetup()
    const runtime = useRuntimeStore()
    const { registered_word } = storeToRefs(runtime)

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
        runtime.processStringSubmission(props.word);
        drop_animation.kill();

        runtime.removeWord(props.word)
        return
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
          runtime.processHP('drop', props.word)
          runtime.removeWord(props.word)
        }
      }); 

      if(is_faster) {
        drop_animation.timeScale(1.5)
      } else if(fastest) {
        drop_animation.timeScale(2)
      }
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