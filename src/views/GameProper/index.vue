<template>
  <div class="game-proper">
    <div>
      <div class="flex justify-between items-end pb-1"> 
        <div>
          <h4 class="ma-0">Typanic</h4>
          <p class="ma-0">By <a class="portfolio-link" href="http://sanz.ml" target="_blank">Sanz</a></p>
        </div>
        <div>
          <OverallScore />
        </div>
      </div>
      <div 
        class="game-box" 
        :style="{
          width: gamebox.width + 'px',
          height: gamebox.height + 'px'
        }"
      >
        <BackgroundEffect />

        <template v-for="word in dropping_words" :key="word">
          <WordTile :word="word" :input_string="input_string" />
        </template>

        <div class="input-string">
          <template v-for="(letter, index) in input_string" :key="letter+'-'+index">
            <span class="letter">{{ letter }}</span>
          </template>    
        </div>

        <input 
          class="game-input" 
          v-model="input_string" 
          @keyup.enter="submitString"
        />

        <transition
          appear
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
        >
          <template v-if="!start">
            <NewGameOverlay @start="startGame" />
          </template>
        </transition>

        <transition
          appear
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
        >
          <div v-show="counting" class="overlay">
            <p class="counter">{{ counter }}</p>
          </div> 
        </transition>
        
      </div>
    </div>
    <div class="ml-7">
      <Status />
    </div>
  </div>
  
</template>

<script>
import WordTile from "@/components/WordTile.vue"
import Status from "./Status/index.vue"
import NewGameOverlay from "./Components/NewGameOverlay.vue"
import OverallScore from "./Components/OverallScore.vue"
import BackgroundEffect from "./Components/BackgroundEffect.vue"

import { getSetup } from '@/composables/setup.js'

import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'

import { ref, onMounted } from 'vue'
import _ from 'lodash'

export default {
  name: 'GameProper',
  components: {
    WordTile,
    Status,
    NewGameOverlay,
    OverallScore,
    BackgroundEffect,
  },
  setup() {

    const { setup, grabHundredWords } = getSetup()
    const word_display = ref([])

    const runtime = useRuntimeStore()
    const { 
      dropping_words, 
      is_power_ice_active,
      is_level_complete,
    } = storeToRefs(runtime)

    const input_string = ref('')
    const start = ref(false)
    const counter = ref(5)
    const counting = ref(false)

    runtime.setPreparedWords(grabHundredWords())

    onMounted(() => {
      // setTimeout(() => {
      //   addWords();
      // }, 1000)
    })

    const startGame = () => {
      start.value = true;
      startGameCountDown();
    }

    const startGameCountDown = () => {
      counting.value = true;

      const countDown = _.debounce(() => {
        counter.value--;

        if(counter.value === 0) {
          counting.value = false;
          addWords();
        } else {
          countDown();
        }
      }, 1000) 

      countDown()
    }

    const addWords = () => {
      if(is_level_complete.value) {
        return;
      }

      if(runtime.prepared_words.length === 0) return;
      
      if(is_power_ice_active.value) {
        interruptDrop();
        return;
      }
      
      let delay = _.random(
        runtime.spawn.volume * 1000, 
        runtime.spawn.delay * 1000
      );

      runtime.dropWord();

      let debounce = _.debounce(() => {
        addWords();
      }, delay)

      debounce();
    }

    const interruptDrop = () => {
      let checkIfIceActive = _.debounce(() => {
        if(!is_power_ice_active.value) {
          addWords();
          return;
        }

        checkIfIceActive();
      }, 100)

      checkIfIceActive()
    }

    const submitString = () => {
      runtime.setRegisteredWord(input_string.value)
      
      input_string.value = ""
    }
    
    return { 
      word_display,
      dropping_words,
      gamebox: setup,
      input_string,
      submitString,
      startGame,
      start,
      counter,
      counting,
    }
  }
}
</script>

<style lang="scss" scoped>
.counter {
  color: black;
  font-size: 40px;
  font-weight: bold;
}
.game-proper {
  min-width: 768px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.game-box {
  position: relative;
  display: inline-block;
  background-color: #ffffff;
  overflow: hidden;
}

.input-string {
  position: absolute;
  width: 100%;
  bottom: 10px;
  display: flex;
  justify-content: center;
  font-size: 25px;
  color: black;
  font-weight: bold;

  .letter {
    height: 32px;
    width: 32px;
    border: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;

    &:last-child {
      margin-right: 0px;
    }
  }
}

.game-input {
  width: 100%;
  height: 100%;
  opacity: 0;
}

.portfolio-link {
  color: #2f90ff;
  font-style: none;
  text-decoration: none;
}


</style>