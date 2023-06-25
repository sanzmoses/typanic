import { defineStore } from 'pinia'
import _ from 'lodash'

export const useRuntimeStore = defineStore('RuntimeStore', {
  state: () => ({
    speed: 20,
    count: 10,
    score: 0,
    hp: 100,
    score_per_word: 10,
    level: 1,
    spawn: {
      volume: 1,
      delay: 5,
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