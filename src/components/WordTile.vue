<template>
  <div class="word" :id="word">
    <p class="ma-0">{{ word }}</p>
  </div>
</template>

<script>
import gsap from 'gsap'
import _ from 'lodash'
import { ref, onMounted, computed } from 'vue'
import { getSetup } from '@/composables/setup.js'
import { useRuntimeStore } from '@/stores/RuntimeStore'

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
    const { setup } = getSetup()
    const max_width = setup.value.width
    const max_height = setup.value.height
    const x = ref(null)
    const speed = ref(null)
    const runtime = useRuntimeStore()
    let drop = null;

    speed.value = 20;
    x.value = _.random(1, max_width - 100)

    const own_speed = computed({
      get() {
        return speed.value
      },
      set(val) {
        speed.value = val
      }
    })

    onMounted(() => {
      gsap.set('#'+props.word, {
        x: x.value
      })

      drop = gsap.to('#'+props.word, {
        y: max_height,
        ease: 'none',
        duration: own_speed.value,
        onComplete: () => {
          console.log("word completed", props.word)
        }
      }); 

      if(props.word === 'justice') {
        setTimeout(() => {
          drop.timeScale(2)
        }, 2000)
      }

    })

    return {
      gamebox: setup,
      speed,
      x
    }
  },
}
</script>

<style lang="scss" scoped>
.word {
  position: absolute;
}
</style>