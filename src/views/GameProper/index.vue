<template>
  <div class="game-proper">
    <div>
      <h4 class="ma-0">Typanic</h4>
      <p>By <a class="portfolio-link" href="http://sanz.ml" target="_blank">Sanz</a></p>

      <div 
        class="game-box" 
        :style="{
          width: gamebox.width + 'px',
          height: gamebox.height + 'px'
        }"
      >
        <template v-for="word in dropping_words" :key="word">
          <WordTile :word="word" :input_string="input_string" />
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
    <div class="ml-10">
      <Status />
    </div>
  </div>
  
</template>

<script>
import WordTile from "@/components/WordTile.vue"
import Status from "./Status/index.vue"

import { getSetup } from '@/composables/setup.js'

import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'

import { ref, onMounted } from 'vue'
import _ from 'lodash'

export default {
  name: 'GameProper',
  components: {
    WordTile,
    Status
  },
  setup() {

    const { setup, grabHundredWords } = getSetup()
    const word_display = ref([])

    const runtime = useRuntimeStore()
    const { dropping_words } = storeToRefs(runtime)

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

      runtime.dropWord();

      let debounce = _.debounce(() => {
        addWords();
      }, delay)

      debounce();
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
    }
  }
}
</script>

<style lang="scss" scoped>
.game-proper {
  min-width: 768px;
  width: 100%;
  display: flex;
  justify-content: center;
}

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