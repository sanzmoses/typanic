<template>
  <div class="flex items-end">
    <p class="ma-0 mr-2 mb-1">Score</p>
    <h4 class="ma-0">{{ score }}</h4>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'

import _ from 'lodash'

export default {
  name: 'Score',
  setup() {
    const runtime = useRuntimeStore()
    const { score, } = storeToRefs(runtime)

    return {
      score,
    }
  }
}
</script>
