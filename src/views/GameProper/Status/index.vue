<template>
  <div class="stats pt-11">
    <p class="ma-0">Level</p>
    <h4 class="mt-0">{{ level }}</h4>

    <p class="ma-0">HP</p>
    <h4 class="mt-0">{{ hp }}</h4>

    <p class="ma-0">Score</p>
    <h4 class="mt-0">{{ score }}</h4>

    <PowerHolder />

  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'

import { ref, onMounted } from 'vue'
import _ from 'lodash'

import PowerHolder from "./components/PowerHolder.vue"

export default {
  name: 'Status',
  components: {
    PowerHolder
  },
  setup() {
    const word_display = ref([])
    const runtime = useRuntimeStore()
    const { level, hp, score, success, ignored, prepared_words } = storeToRefs(runtime)

    return {
      hp,
      score,
      success,
      ignored,
      prepared_words,
      level
    }
  }
}
</script>