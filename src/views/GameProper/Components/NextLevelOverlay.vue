<template>
  <div class="overlay q-pa-lg row items-center justify-center">
    <q-card class="start-card" flat>
      <q-card-section class="text-center">
        <div class="text-h5 mt-2 mb-3">Level {{ level }} complete</div>
        
        <div>
          <p class="text-caption text-grey">Level Score:</p>
          <p id="levelScore" class="text-h4 blue-6 font-weight-bold">0</p>
        </div>
        <div>
          <!-- 
            perfect execution, 
            no ignored words, 
            no wrong submissions, 
            extra power tiles 
            word streaks
          -->
          <p class="text-caption text-grey">Bonus Points:</p>
          <p id="bonusPoints" class="text-h4 blue-6 font-weight-bold">0</p>
        </div>
        <div>
          <p class="text-caption text-grey">Total Points:</p>
          <p id="totalPoints" class="text-h4 blue-6 font-weight-bold">0</p>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn 
          :disabled="!is_ready"
          @click="nextLevel" 
          class="px-5" 
          size="22px" 
          color="primary" 
          label="Next Level" 
          flat
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

export default {
  name: 'NextLevelOverlay',
  setup(props, { emit }) {
    const runtime = useRuntimeStore()
    const { 
      level, 
      level_bonus_points,
      level_score,
    } = storeToRefs(runtime)

    const is_ready = ref(false)

    runtime.processPoints('bonus')

    const nextLevel = () => {
      runtime.processPoints('score')
      emit('start')
    }

    onMounted(() => {
      const total_points = level_score.value + level_bonus_points.value
      const timeline = gsap.timeline({
        pause: true,
        duration: 3,
        ease: "power4.out",
        delay: 1,
        onComplete: () => {
          is_ready.value = true
        }
      })

      timeline
        .to("#levelScore", { innerText: level_score.value, snap: "innerText" })
        .to("#bonusPoints", { innerText: level_bonus_points.value, snap: "innerText" })
        .to("#totalPoints", { innerText: total_points, snap: "innerText" })

      timeline.play();
    })

    return {
      level,
      nextLevel,
      is_ready
    }
  }
}
</script> 

<style lang="scss" scoped>

.start-card {
  width: 350px;
}
</style>