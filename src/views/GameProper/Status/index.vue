<template>
  <div class="stats pt-11">
    <h1 class="level-num">{{ level }}</h1>
    <p class="level-word">Level</p>
    
    <PowerHolder />

    <p class="ma-0">HP</p>
    <h4 class="mt-0">{{ hp }}</h4>

  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'

import { ref, onMounted } from 'vue'
import _ from 'lodash'

import PowerHolder from "./Components/PowerHolder.vue"

export default {
  name: 'Status',
  components: {
    PowerHolder
  },
  setup() {
    const word_display = ref([])
    const runtime = useRuntimeStore()
    const { level, hp, success, ignored, prepared_words } = storeToRefs(runtime)

    return {
      hp,
      success,
      ignored,
      prepared_words,
      level
    }
  }
}
</script>

<style lang="scss" scoped>
.level-num {
  margin: 0px 0px 0px -7px;
}
.level-word {
  margin-top: -20px;
}
</style>