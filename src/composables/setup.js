import { ref } from 'vue'
import wordList from "word-list-json"
import _ from 'lodash'
import { useRuntimeStore } from '@/stores/RuntimeStore'

export function getSetup() {
  const runtime = useRuntimeStore()

  const setup = ref({
    height: 600,
    width: 500,
    highlight: '#d63845'
  })

  // 10,000 - 100,000 < - level 1
  // Add 20,000 minimum every level
  // Add 50,000 per 5 levels
  // 274,907 <- level 10 +
  const grabHundredWords = () => {
    // get from word-list-json
    let min = runtime.word_difficulty.min
    let max = runtime.word_difficulty.max
    let words = []

    for (let i = 0; i < runtime.count; i++) {
      words.push(wordList[_.random(min, max)])
    }

    return words
  }

  return {
    setup,
    grabHundredWords,
  }
}