<template>
  <div :class="['container', 'text-'+color]" :style="{ fontSize: fontSize+'em', height: fontSize+.5+'em' }">
    
    <template v-for="(word, word_index) in list" :key="`word-${word}-${word_index}`">
      <span :class="`letter letter-${word_index}`">{{ word }}</span>
    </template>

  </div>
</template>

<script>
import gsap from 'gsap'
import { ref, onMounted } from 'vue'

export default {
  name: "Typing",
  props: {
    list: {
      type: [Array, String],
      required: true
    },
    fontSize: {
      type: Number,
      default: 1.2,
    },
    repeat: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "white"
    }
  },
  setup(props) {
    const blink = ref(false)

    const { fontSize, repeat, list } = props

    let timeline = gsap.timeline({
      repeat: (repeat)? -1: 0
    })
    
    const displacement = fontSize * 22;

    onMounted(() => {
      list.forEach((item, index) => {
        timeline
        .fromTo(`.letter-${index}`,
        {
          y: -displacement,
        },
        {
          y: 3
          ,
          duration: .5,
          ease: 'Power.easeIn',
        }, "<")
        .to(`.letter-${index}`, {
          y: displacement,
          delay: 2,
          duration: .5,
          ease: 'Power.easeOut',
        })
      })
      
      timeline.play()
    })   
    
    return {
      blink
    }
  }
}
</script>

<style lang="scss">
.container {
  position: relative;
  overflow: hidden;

  .letter {
    position: absolute !important;
    top: 0;
    left: 0;
  }
}

</style>