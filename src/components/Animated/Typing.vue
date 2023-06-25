<template>
  <div :class="['flex', 'text-'+color]" :style="{ fontSize }">
    
    <template v-for="(word, word_index) in processed_list" :key="`word-${word}-${word_index}`">
      <template v-for="(letter, letter_index) in word" :key="`animate-${letter}-${letter_index}`">
        <span :class="`letter letter-${word_index}`">{{ letter }}</span>
      </template>
      <div :class="[`blinker-${word_index} text-blinker`, { 'blink': blink }]"></div>
      <span :class="[`opacity-0 extra-${word_index}`]">|</span>
    </template>
    <span class="opacity-0">|</span>

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
      type: String,
      default: "16px",
    },
    reverse: {
      type: Boolean,
      default: true
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

    const { reverse, repeat, list } = props
    let processed_list;

    if(Array.isArray(list)) {
      processed_list = list.map(item => {
        return item.split("")
      });    
    } else {
      processed_list = [].concat([list])
    }

    let timeline = gsap.timeline({
      repeat: (repeat)? -1: 0
    })
    
    onMounted(() => {
      processed_list.forEach((item, index) => {
        timeline
        .to(`.blinker-${index}`, {
          keyframes: [
            { opacity: 0, visibility:"hidden", duration: .2, ease: "none" },
            { opacity: 1, visibility:"visible", duration: .2 },
          ],
          duration: .5,
          repeatDelay: .3,
          repeat: .5,
          ease: "none"
        })
        .to(`.letter-${index}`, {
          display: "inline-block",
          duration: .5,
          stagger: .1,
          ease: 'elastic',
        })
        .to(`.blinker-${index}`, {
          keyframes: [
            { opacity: 0, visibility:"hidden", duration: .2, ease: "none" }, // BLINK VISIBILITY
            { opacity: 1, visibility:"visible", duration: .2 },
          ],
          duration: .5,
          repeatDelay: .3,
          repeat: (reverse)? 1: -1,
          ease: "none"
        })
        .to(`.letter-${index}`, {
          display: "none",
          duration: .5,
          stagger: -0.1, // REVERSE STAGGER
          ease: 'elastic',
        })
        .to(`.blinker-${index}`, {
          display: "none",
        })
        .to(`.letter-${index}`, {
          display: "none",
        }, "<")
        .to(`.extra-${index}`, {
          display: "none",
        }, "<")
      })
      
      timeline.play()
    })   
    
    return {
      processed_list,
      blink
    }
  }
}
</script>

<style lang="scss">
.letter {
  display: none;
}

.text-blinker {
  display: block;
  width: .8em;
  background-color: white;
  opacity: 0;
  
  &.blink {
    animation: cursor-blink 1.5s steps(2) infinite;
  }
}

@keyframes cursor-blink {
  0% {
    opacity: 0;
  }
}

.opacity-0 {
  opacity: 0;
}
</style>