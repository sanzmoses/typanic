import { defineStore } from 'pinia'
import _ from 'lodash'

export const useRuntimeStore = defineStore('RuntimeStore', {
  state: () => ({
    count: 100,
    score: 0,
    hp: 100,
    level: 1,
    level_speed: 20, // 20 - 5
    word_difficulty: {
      min: 50000, // 10000
      max: 200000 // 274000
    },
    spawn: {
      volume: 1, // 1 - .01
      delay: 5, // 5 - 1
    },
    prepared_words: [],
    dropping_words: [],
    registered_word: "",
    success: 0,
    ignored: 0,
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
    dropWord() {
      if(this.prepared_words.length === 0) return null
      this.dropping_words.push(this.prepared_words.pop())
    },
    removeWord(word) {
      const index = this.dropping_words.findIndex(x => x === word)
      
      if(index >= 0) {
        this.dropping_words.splice(index, 1)
      }
    },
    setRegisteredWord(word) {
      this.registered_word = word;
    },
    processStringSubmission(word) {
      this.score += word.length;
      this.success++;
    },
    processHP(cue, word) {
      let hp_deduction = word.length - 10;
      switch(cue) {
        case 'heal': 
          this.hp = 100;
          break;
        case 'drop':
          this.ignored++;
          this.hp += hp_deduction
          break;
        default: 
      }
    }
  },
})