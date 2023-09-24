<template>
  <div :class="['score-card', { left: from_left }]">
    <div 
      :class="['label', `bg-${color}`]"
    >
      <p>{{ label }}</p>
      <div :class="['triangle', { 'triangle-left':from_left }]"
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
    },
    label_bbq() {
      return this.label.toLowerCase().replaceAll(" ", "_")
    },
  },
  methods: {
    runScore() {
      let counter = { value: 0 };

      gsap.to(counter, {
        value: this.score,
        roundProps: "value",
        duration: 1,
        ease: "power4.out",
        onUpdate: () => {
          this._score = counter.value;
        }
      })
    }
  },
  watch: {
    score: function() {
      this.runScore()
    }
  },
  mounted() {
    this.runScore();
  }
}
</script>
<style lang="scss" scoped>
.score-card {
  width: 200px !important;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &.left {
    align-items: flex-end;
  }

  p {
    margin-bottom: 0px;
  }
  .label {
    position: relative;
    padding: 0em 0.5em;
    display: inline-block;
    height: 2em;

    p {
      color: white !important;
      margin-top: 5px;
    }

    .triangle {
      position: absolute;
      top: 0;
      right: -34px;
      width: 0px;
      height: 0px;
      border-left: 0em solid;
      border-right: 2.5em solid transparent;
      border-bottom: 2em solid;

      &-left {
        left: -34px;
        border-right: 0em solid;
        border-left: 2.5em solid transparent;
      }
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