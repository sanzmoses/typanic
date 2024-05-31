import { ref } from 'vue'
import wordList from "word-list-json"
import _ from 'lodash'
import { useRuntimeStore } from '@/stores/RuntimeStore'

export function getSetup() {
  const runtime = useRuntimeStore()

  const power_tiles = [
    { name: 'ice', description: "Freezes the dropping tiles" },
    { name: 'fire', description: "Burns all dropping tiles" },
    { name: 'slow', description: "Slows dropping tiles" },
    { name: 'heal', description: "Heal HP" },
  ]

  const setup = ref({
    height: 600,
    width: 500,
    highlight: '#FF6F00',
    tile_color: 'transparent',
    tile_text: 'black',
    chances: {
      power_tile: 20,
      faster_tile: 20,
      double_speed: 10,
    },
    level_stats_color: {
      power_tile: {
        code: "#FF5C01",
        name: "green-6"
      },
      success: {
        code: "#09B0F6",
        name: "blue-7"
      },
      ignored: {
        code: "#00BE9C",
        name: "amber-9"
      },
      streak: {
        code: "#DB01FF",
        name: "purple-8"
      },
      mistakes: {
        code: "#F60059",
        name: "pink-9"
      },
      perfect: {
        code: "#29CD00",
        name: "light-green-8"
      },
      words_per_min: {
        code: "#FF5C01",
        name: "orange-10"
      }
    }
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

  const getPowerTiles = () => {
    return power_tiles
  }

  return {
    setup,
    grabHundredWords,
    grabPowerTile,
    isDoubleSpeed,
    isRelativelyFaster,
    power_tiles
  }
}