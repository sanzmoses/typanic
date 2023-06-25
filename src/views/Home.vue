<template>
  <div class="">
    <h3>Typing game</h3>

    <div 
      class="game-box" 
      :style="{
        width: gamebox.width + 'px',
        height: gamebox.height + 'px'
      }"
    >
      <template v-for="word in word_display" :key="word">
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
</template>

<script>
import Projects from "../components/Home/Projects/index.vue"
import WordTile from "@/components/WordTile.vue"

import { getData } from '@/composables/themes.js'
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
    const { setup } = getSetup()
    const { words } = getData()
    const word_display = ref([])
    const runtime = useRuntimeStore()

    const { count, spawn } = runtime;

    const input_string = ref('')

    runtime.setPreparedWords([
      'typing',
      'setup',
      'seething',
      'looming',
      'devastation',
      'incantation',
      'extravagant',
      'justice',
      'separation',
      'extract',
    ])

    onMounted(() => {
      addWords();
    })

    const addWords = () => {
      if(word_display.value.length >= count) return;

      let delay = _.random(spawn.volume * 1000, spawn.delay * 1000);
      
      word_display.value.push(runtime.getWord())

      let debounce = _.debounce(() => {
        addWords();
      }, delay)

      debounce();
    }

    const submitString = () => {
      const index = word_display.value.findIndex(x => {
        return x === input_string.value
      })
      
      console.log(index, 'index')

      if(index >= 0) {
        // find if theres
        word_display.value.splice(index, 1)
      }
      
      runtime.setRegisteredWord(input_string.value)
      input_string.value = ""
    }
    
    return { 
      word_display,
      gamebox: setup,
      words,
      input_string,
      submitString
    }
  }
}
</script>

<style lang="scss" scoped>
.game-box {
  position: relative;
  display: inline-block;
  background-color: #000000;
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
</style>