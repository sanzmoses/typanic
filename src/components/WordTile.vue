<template>
  <div class="tile" :id="word">
    <p class="word ma-0" v-html="parse_word"></p>
  </div>
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
  setup (props, { emit }) {
    const { setup } = getSetup()
    const runtime = useRuntimeStore()
    const { registered_word } = storeToRefs(runtime)

    let drop_animation = null;

    const max_width = setup.value.width
    const max_height = setup.value.height
    const x = ref(null)
    const speed = ref(null)

    x.value = _.random(1, max_width - 100)
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
      if(registered_word.value === props.word) {
        drop_animation.kill();
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
        y: max_height - 40,
        ease: 'none',
        duration: runtime.level_speed,
        onComplete: () => {
          console.log("destroyed")
          emit('removeWord', props.word)
        }
      }); 
    })

    return {
      gamebox: setup,
      speed,
      parse_word,
      x
    }
  },
}
</script>

<style lang="scss" scoped>
.tile {
  position: absolute;  
  background-color: white;
  padding: 5px 10px;
}

.word {
  color: black;
}

</style>