import { defineStore } from 'pinia'
import _ from 'lodash'

export const useRuntimeStore = defineStore('RuntimeStore', {
  state: () => ({
    count: 100,
    score: 0,
    hp: 100,
    level: 1,
    level_speed: 15, // 20 - 5
    word_difficulty: {
      min: 50000, // 10000
      max: 200000 // 274000
    },
    spawn: {
      volume: 1, // 1 - .01
      delay: 5, // 5 - 1
    },
    prepared_words: [],
    registered_word: "",
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    setPreparedWords(words) {
      this.prepared_words = words
    },
    getWord() {
      if(this.prepared_words.length === 0) return null
      return this.prepared_words.pop()
    },
    setRegisteredWord(word) {
      this.registered_word = word;
    }
  },
})