<template>
  <div class="container">
    <div class="bar-container">
      <div>
        <div class="vertical-bar hp">
          <div id="hp-bar" class="bar-value" :style="{
            height: '100%',
            backgroundColor: '#00EA7A'
          }"></div>
        </div>
      </div>
      <div class="value-container">
        <h4 class="ma-0" id="hp">100</h4>
        <p class="ma-0 mb-1">hp</p>
      </div>
    </div>
    <div class="bar-container relocate">
      <div>
        <div class="vertical-bar lvlp">
          <div id="lvlp-bar" class="bar-value" :style="{
            height: '0%',
            backgroundColor: '#0066FF'
          }"></div>
        </div>
      </div>
      <div class="value-container">
        <h4 class="ma-0" id="lvlp">0</h4>
        <p class="ma-0 mb-1">lvlp</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'
import _ from 'lodash'
import gsap from 'gsap'

export default {
  name: 'GameValues',
  setup() {
    const runtime = useRuntimeStore()
    const { hp, level_score } = storeToRefs(runtime)

    watch(hp, () => { 
      let bar_color = '#00EA7A', text_color = 'white';
      if(hp.value <= 50 && hp.value >= 30) {
        text_color = '#ffae00'
        bar_color = '#ffae00'
      } else if(hp.value <= 29) {
        bar_color = '#e32626'
        text_color = '#e32626'
      }

      gsap.to("#hp", { 
        innerText: hp.value, 
        duration: .4, 
        snap: "innerText",
        color: text_color
      })
      gsap.to("#hp-bar", { 
        height: hp.value+'%', 
        duration: .4, 
        backgroundColor: bar_color
      })
    })

    watch(level_score, () => { 
      gsap.to("#lvlp", { 
        innerText: level_score.value, 
        duration: .4, 
        snap: "innerText",
      })

      gsap.to("#lvlp-bar", { 
        height: level_score.value+'%', 
        duration: .4, 
      })
    })

    onMounted(() => {
      
    })

    return {
      hp,
      level_score
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  height: 280px;
}

.bar-container {
  display: flex;
  align-items: flex-end;
  width: 100px;
}

.vertical-bar {
  height: 270px;
  width: 8px;
  background-color: #ffffff;
  display: flex;
  align-items: end;
  overflow: hidden;

  .bar-value {
    display: block;
    width: 100%;
  }

  &.lvlp {
    height: 228px;
    width: 7px;
  }
}

.value-container {
  display: flex;
  align-items: flex-end;
  margin-left: 10px;
  margin-bottom: -9px;
}

.relocate {
  transform: translate(-75px, -42px);
}
</style>