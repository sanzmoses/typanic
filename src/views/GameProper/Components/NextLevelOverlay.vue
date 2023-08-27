<template>
  <div class="overlay q-pa-lg row items-center justify-center">
    <q-card class="start-card bg-transparent text-teal-9" flat>
      <q-card-section class="text-left">
        <div class="flex">
          <p class="text-h1 mb-0">{{ level }}</p>
          <div class="flex justify-center align-start column">
            <p class="mb-0">{{ ordinalIndicator }}</p>
            <p class="mb-0 text-white bg-teal-6" style="padding: 3px 4px 0px;">LVL</p>
            <p class="mb-0">Complete</p>
          </div>
        </div>

        <div class="flex align-center justify-center">
          <ScoreCard 
            class="mb-5"
            label="Level Score"
            color="teal-6"
            :score="level_score"
          >
        </ScoreCard>
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
        <TButton 
          :disabled="!is_ready"
          :from_left="true"
          label="NEXT" 
          width="200px"
          height="65px"
          font_size="3em"
          color="bg-teal-6"
          @click="nextLevel"
        />
        <!-- <q-btn 
          :disabled="!is_ready"
          @click="nextLevel" 
          class="px-5" 
          size="22px" 
          color="primary" 
          label="Next Level" 
          flat
        /> -->
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted, computed  } from 'vue'
import gsap from 'gsap'
import TButton from "@/components/TButton.vue"
import ScoreCard from "@/components/ScoreCard.vue"

export default {
  name: 'NextLevelOverlay',
  components: {
    TButton,
    ScoreCard,
  },
  setup(props, { emit }) {
    const runtime = useRuntimeStore()
    const { 
      level, 
      level_bonus_points,
      level_score,
    } = storeToRefs(runtime)

    const is_ready = ref(false)
    const oi = ['st', 'nd', 'rd', 'th']
    let getBase = 1;

    runtime.processPoints('bonus')

    const nextLevel = () => {
      runtime.processPoints('score')
      emit('start')
    }

    const ordinalIndicator = computed(() => {
      getBase = level;
      if(level > 9) getBase.value = level % 10

      if((getBase.value > 3 && getBase.value <= 9) || getBase.value == 0) return oi[3]

      return oi[getBase.value - 1]
    })

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
        .to("#bonusPoints", { innerText: level_bonus_points.value, snap: "innerText" })
        .to("#totalPoints", { innerText: total_points, snap: "innerText" })

      timeline.play();
    })

    return {
      level,
      nextLevel,
      is_ready,
      ordinalIndicator,
      level_score
    }
  }
}
</script> 

<style lang="scss" scoped>

.start-card {
  width: 350px;
}
</style>