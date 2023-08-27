<template>
  <div class="score-card">
    <div 
      :class="['label', `bg-${color}`]"
    >
      <p>{{ label }}</p>
      <div :class="['triangle']"
        :style="{
          borderBottomColor: paletteColor
        }"
      ></div>
    </div>
    <div 
      :class="['score', `text-${color}`]"
      :style="{
        borderColor: paletteColor
      }"
    >
      <p class="mb-0 font-weight-bold">
        <span class="leading-zero text-teal-2">{{ leading_zeroes }}</span>
        <span>{{ _score }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { colors } from 'quasar'
import gsap from 'gsap'

export default {
  name: "ScoreCard",
  data: () => ({
    _score: 0
  }),
  props: {
    label: {
      type: String,
      default: "Button"
    },
    score: {
      type: [Number, String],
      default: "000000"
    },
    color: {
      type: String,
      default: "bg-black"
    },
    font_size: {
      type: String,
      default: "1em"
    },
    from_left: {
      type: Boolean,
      default: false
    }
  },  
  computed: {
    paletteColor() {
      const { getPaletteColor } = colors
      return getPaletteColor(this.color)
    },
    leading_zeroes() {
      let ans = '';
      let zeroes = 6;
      let score = this._score+''
      
      zeroes -= score.length

      for(let i = 0; i < zeroes; i++) {
        ans += '0'
      }

      return ans
    }
  },
  mounted() {
    let counter = 0;
    gsap.to(counter, {
      value: this.score,
      duration: 1,
      ease: "power4.out",
      delay: 1,
      onUpdate: () => {
        this._score++;
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.score-card {
  width: 200px !important;

  p {
    margin-bottom: 0px;
  }
  .label {
    position: relative;
    padding: .3em .5em 0em;
    display: inline-block;

    p {
      color: white !important;
    }

    .triangle {
      position: absolute;
      top: 0;
      right: -1.8em;
      width: 0px;
      height: 0px;
      border-left: 0em solid;
      border-right: 1.8em solid transparent;
      border-bottom: 1.8em solid;
    }
  }

  .score {
    border: 2px solid;
    padding: .6em .5em 0em;
    text-align: right;

    p {
      font-size: 3.5em;
      line-height: 1em;
    }
  }
}
</style>