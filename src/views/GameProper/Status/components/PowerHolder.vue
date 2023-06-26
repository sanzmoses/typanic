<template>
  <div class="">
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import _ from 'lodash'

export default {
  name: 'Template',
  setup() {
    const runtime = useRuntimeStore()
    const { level } = storeToRefs(runtime)

    const data = ref(null)

    onMounted(() => {
      
    })

    return {
      level,
      data
    }
  }
}
</script>