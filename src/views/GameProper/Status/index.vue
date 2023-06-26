<template>
  <div class="stats">
    <h4>Stats</h4>

    <p class="ma-0">HP</p>
    <h4 class="mt-0">{{ hp }}</h4>

    <p class="ma-0">Score</p>
    <h4 class="ma-0">{{ score }}</h4>

    <p class="ma-0">Word Count</p>
    <h4 class="ma-0">{{ success }}</h4>

    <p class="ma-0">Ignored</p>
    <h4 class="ma-0">{{ ignored }}</h4>

    <template v-for="word in prepared_words" :key="word">
      <q-chip color="primary" text-color="black" icon="event">
       {{ word }}
      </q-chip>
    </template>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'

import { ref, onMounted } from 'vue'
import _ from 'lodash'

export default {
  name: 'Status',
  setup() {
    const word_display = ref([])
    const runtime = useRuntimeStore()
    const { hp, score, success, ignored, prepared_words } = storeToRefs(runtime)

    return {
      hp,
      score,
      success,
      ignored,
      prepared_words
    }
  }
}
</script>