<template>
  <div class="">
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { getSetup } from '@/composables/setup.js'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import _ from 'lodash'
import gsap from 'gsap'

export default {
  name: 'Template',
  setup() {
    const { setup } = getSetup()
    const runtime = useRuntimeStore()
    const { level } = storeToRefs(runtime)

    const data = ref(null)

    onMounted(() => {
      gsap.set('#'+props.word, {
        x: x.value,
        y: -40,
      })
    })

    return {
      level,
      data
    }
  }
}
</script>