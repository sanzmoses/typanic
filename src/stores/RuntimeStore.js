import { defineStore } from 'pinia'
import _ from 'lodash'

export const useRuntimeStore = defineStore('RuntimeStore', {
  state: () => ({
    ice_duration: 5, //seconds
    slow_duration: 10, //seconds
    count: 500,
    score: 0,
    hp: 100,
    level: 1,
    level_speed: 25, // 25 - 5
    level_score: 0, // to 100
    word_difficulty: {
      min: 10000, // 10000
      max: 50000 // 274000
    },
    spawn: {
      volume: 1, // 1 - .01
      delay: 5, // 5 - 1
    },
    prepared_words: [],
    dropping_words: [],
    registered_word: "",
    power_tiles: [],
    active_power_tile: [],
    success: 0,
    ignored: 0,
    streak: 0,
    level_bonus_points: 0,
    set_on_fire: false,
  }),
  getters: {
    is_power_ice_active() {
      return !!_.find(this.active_power_tile, { name: 'ice'})
    },
    is_power_slow_active() {
      return !!_.find(this.active_power_tile, { name: 'slow'})
    },
    is_power_fire_active() {
      return !!_.find(this.active_power_tile, { name: 'fire'}) 
      || this.set_on_fire
    },
    is_power_heal_active() {
      return !!_.find(this.active_power_tile, { name: 'heal'})
    },
    is_power_active() {
      return this.active_power_tile.length > 0
    },
    is_level_complete() {
      return this.level_score >= 100
    },
    is_game_over() {
      return this.hp <= 0
    }
  },
  actions: {
    setOnFire() {
      this.set_on_fire = true

      const endFire = _.debounce(() => {
        this.set_on_fire = false
      }, 1)

      endFire();
    },
    heal(points) {
      const futureHp = this.hp + points;
      if(futureHp > 100) {
        this.hp = 100;
        return;
      }

      this.hp += points;
    },
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

      // check for power tile
      this.checkAndUsePowerTile(word)
    },
    processStringSubmission(word) {
      const potential_score = this.level_score + word.length

      if((potential_score >= 100)) {
        this.setOnFire()
        this.level_score = 100
      } else {
        this.level_score = potential_score
      }

      this.success++
      this.streak++
    },
    missedWord(word) {
      let hp_deduction = word.length - 20
      const limit_deduction = 8
      // limit to 10
      if(hp_deduction <= limit_deduction) {
        hp_deduction = -limit_deduction
      }

      this.hp += hp_deduction
      this.ignored++
      this.streak = 0

      if(this.hp <= 0) {
        this.setOnFire()
      }
    },
    cleanDroppingWords() {
      this.dropping_words = [];
    },
    checkAndUsePowerTile(word) {
      if(this.power_tiles.length > 0) {
        const index = this.power_tiles.findIndex(x => x.name === word)

        /** use power tile */
        if(index >= 0) this.usePowerTile(index)
      }
    },
    usePowerTile(index) {
      const power_tile = this.power_tiles[index]
      this.active_power_tile.push(power_tile)
      this.power_tiles.splice(index, 1)

      const endBurn = _.debounce(() => {
        this.clearActivePowerTile('fire')
      }, 1)

      const endHeal = _.debounce(() => {
        this.clearActivePowerTile('heal')
      }, 1)

      const endSlow = _.debounce(() => {
        this.clearActivePowerTile('slow')
      }, this.slow_duration * 1000)

      const endFreeze = _.debounce(() => {
        this.clearActivePowerTile('ice')
      }, this.ice_duration * 1000)
      
      switch(power_tile.name) {
        case 'heal': 
          this.heal(50)
          endHeal()
          break;
        case 'fire': 
          endBurn()
          break;
        case 'ice': endFreeze()
          break;
        case 'slow': endSlow()
          break;
        default: break;
      }
    },
    storePowerTile(tile) {
      if(this.power_tiles.length >= 5) return
      this.power_tiles.push(tile)
    },
    clearActivePowerTile(power_name) {
      const index = this.active_power_tile.findIndex(x => x.name === power_name)
      this.active_power_tile.splice(index, 1)
    },
    processPoints(point) {
      // bonus/score

      if(point === 'bonus') {
        if(this.success >= 0) {
          this.level_bonus_points += (this.success + this.level) * this.level
        }
  
        if(this.streak >= 0) {
          this.level_bonus_points += (this.streak + this.level) * this.level
        }
      }
      
      if(point === 'score') {
        this.score += this.level_bonus_points + this.level_score
      }
    },
    prepareNextLevel() {
      const limits = {
        word_diff_max: 274000,
        word_diff_min: 100000,
        level_speed: 5, // 25 - 5
        spawn_volume: 0.5, // 1 - 0.1
        spawn_delay: 1, // 5 - 1
      }

      this.level_bonus_points = 0;
      this.success = 0
      this.ignored = 0
      this.streak = 0
      this.hp = 100
      this.level_score = 0
      this.level++;
      
      if(this.level_speed <= 5) {
        this.level_speed = limits.level_speed
      } else {
        this.level_speed -= 2
      }

      if(this.word_difficulty.min >= limits.word_diff_min) {
        this.word_difficulty.min = limits.word_diff_min
      } else {
        this.word_difficulty.min += 20000
      }

      if(this.word_difficulty.max >= limits.word_diff_max) {
        this.word_difficulty.max = limits.word_diff_max
      } else {
        this.word_difficulty.max += 20000
      }

      if(this.spawn.volume <= limits.spawn_volume) {
        this.spawn.volume = limits.spawn_volume
      } else {
        this.spawn.volume -= 0.05
      }

      if(this.spawn.delay <= limits.spawn_delay) {
        this.spawn.delay = limits.spawn_delay
      } else {
        this.spawn.delay -= 0.5
      }
    },
  },
})