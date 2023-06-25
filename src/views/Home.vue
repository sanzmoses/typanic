<template>
  <div class="game-proper">
    <h4 class="ma-0">Typanic</h4>
    <p>By <a class="portfolio-link" href="http://sanz.ml" target="_blank">Sanz</a></p>

    <div 
      class="game-box" 
      :style="{
        width: gamebox.width + 'px',
        height: gamebox.height + 'px'
      }"
    >
      <template v-for="word in word_display" :key="word">
        <WordTile :word="word" :input_string="input_string" @removeWord="removeWordFromDisplay" />
      </template>

      <div class="input-string">
        <span>{{ input_string }}</span>
      </div>

      <input 
        class="game-input" 
        v-model="input_string" 
        @keyup.enter="submitString"
      />
    </div>
  </div>
</template>

<script>
import Projects from "../components/Home/Projects/index.vue"
import WordTile from "@/components/WordTile.vue"

import { getSetup } from '@/composables/setup.js'

import { useRuntimeStore } from '@/stores/RuntimeStore'
import { ref, onMounted } from 'vue'
import _ from 'lodash'

export default {
  name: 'Home',
  components: {
    Projects,
    WordTile
  },
  setup() {

    const { setup, grabHundredWords } = getSetup()
    const word_display = ref([])
    const runtime = useRuntimeStore()

    const input_string = ref('')

    runtime.setPreparedWords(grabHundredWords())

    onMounted(() => {
      setTimeout(() => {
        addWords();
      }, 1000)
    })

    const addWords = () => {
      if(runtime.prepared_words.length === 0) return;
      
      let delay = _.random(runtime.spawn.volume * 1000, runtime.spawn.delay * 1000);
      
      word_display.value.push(runtime.getWord())

      let debounce = _.debounce(() => {
        addWords();
      }, delay)

      debounce();
    }

    const submitString = () => {
      removeWordFromDisplay(input_string.value)
      
      runtime.setRegisteredWord(input_string.value)
      input_string.value = ""
    }

    const removeWordFromDisplay = (word) => {
      const index = word_display.value.findIndex(x => {
        return x === word
      })
      
      if(index >= 0) {
        word_display.value.splice(index, 1)
      }
    }
    
    return { 
      word_display,
      gamebox: setup,
      input_string,
      submitString,
      removeWordFromDisplay
    }
  }
}
</script>

<style lang="scss" scoped>
.game-box {
  position: relative;
  display: inline-block;
  background-color: #000000;
  overflow: hidden;
}

.input-string {
  position: absolute;
  width: 100%;
  bottom: 10px;
  display: flex;
  justify-content: center;
  font-size: 25px;
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