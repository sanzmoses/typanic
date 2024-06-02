import { defineStore } from 'pinia'
import _ from 'lodash'

export const useUserStore = defineStore('UserStore', {
  state: () => ({
    player_name: "Player 1",
    users_scores: [],
    player_exists: null
  }),
  getters: { 
    is_player_exists() {
      return this.player_exists.length > 0
    },
  },
  actions: {
    SET_USERNAME(name) { 
      this.player_name = name
    },
    SET_USERS_SCORES(data) { 
      this.users_scores = data
    },
    SET_PLAYER_EXISTS(data) { 
      this.player_exists = data
    },
  },
})