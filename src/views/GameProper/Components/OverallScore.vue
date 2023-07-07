<template>
  <div class="flex items-end">
    <p class="ma-0 mr-2 mb-1">Score</p>
    <h4 class="ma-0" id="score">0</h4>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import _ from 'lodash'
import gsap from 'gsap'

export default {
  name: 'Score',
  setup() {
    const runtime = useRuntimeStore()
    const { score, } = storeToRefs(runtime)

    watch(score, () => { 
      gsap.to("#score", { innerText: score.value, duration: .4, snap: "innerText" })
    })

    return {
      score,
    }
  }
}
</script>
