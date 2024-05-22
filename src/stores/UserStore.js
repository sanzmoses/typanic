import { defineStore } from 'pinia'
import _ from 'lodash'

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    player_name: "TypingManiac"
  }),
  getters: { 
    sample_getter() {
      return this.sample_data
    },
  },
  actions: {
    setUserName(name) { 
      this.player_name = name
    },
  },
})