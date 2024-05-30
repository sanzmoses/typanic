<template>
  <div class="instructions">
    <p>Write instructions here</p>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { ref, onMounted } from 'vue'

export default {
  name: 'Instructions',
  setup() {
    const runtime = useRuntimeStore()

    const data = ref(null)

    onMounted(() => {
      
    })

    return {
      data
    }
  }
}
</script>