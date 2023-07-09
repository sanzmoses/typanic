import { ref } from 'vue'
import wordList from "word-list-json"
import _ from 'lodash'
import { useRuntimeStore } from '@/stores/RuntimeStore'

export function getSetup() {
  const runtime = useRuntimeStore()

  const power_tiles = [
    { name: 'slow', color: 'purple-8', icon: 'hourglass_empty' },
    { name: 'ice', color: 'blue-9', icon: 'ac_unit' },
    { name: 'fire', color: 'red-10', icon: 'whatshot' },
    { name: 'heal', color: 'green-14', icon: 'health_and_safety' },
  ]

  const setup = ref({
    height: 600,
    width: 500,
    highlight: '#FF6F00',
    tile_color: 'transparent',
    tile_text: 'black',
    chances: {
      power_tile: 90,
      faster_tile: 20,
      double_speed: 10,
    },
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

  const grabPercent = (percentage) => {
    return _.random(1, 100) < percentage
  }

  const grabPowerTile = () => {
    const is_power_tile = grabPercent(setup.value.chances.power_tile)

    if(is_power_tile) {
      return power_tiles[_.random(0, 3)]
    }

    return null;
  }

  const isRelativelyFaster = () => {
    return grabPercent(setup.value.chances.faster_tile)
  }

  const isDoubleSpeed = () => {
    return grabPercent(setup.value.chances.double_speed)
  }

  return {
    setup,
    grabHundredWords,
    grabPowerTile,
    isDoubleSpeed,
    isRelativelyFaster
  }
}