<template>
  <div class="fame-hall">
    <p>Write Datatable here</p>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { ref, onMounted } from 'vue'

export default {
  name: 'Hall of fame',
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