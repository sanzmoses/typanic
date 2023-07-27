<template>
  <div class="overlay q-pa-lg row items-center justify-center">
    <q-card class="start-card" flat>
      <q-card-section>
        <div class="text-h5 mt-2 mb-3">Game Over!</div>
        
        <div class="text-caption text-grey">
          Total Score:
        </div>
        <div class="text-overline text-orange-9">- Sanz</div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn 
          flat 
          class="px-5" 
          size="22px" 
          color="primary" 
          label="Play Again" 
          @click="$emit('newGame')" 
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import _ from 'lodash'

export default {
  name: 'GameOverOverlay',
  setup() {
    const runtime = useRuntimeStore()
    const { level } = storeToRefs(runtime)

    const show = ref(true)

    onMounted(() => {
      
    })

    return {
      level,
      show
    }
  }
}
</script> 

<style lang="scss" scoped>

.start-card {
  width: 350px;
}
</style>