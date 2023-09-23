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

          <div class="flex align-center">
            <ScoreCard 
              :from_left="true"
              class="mb-5"
              label="Bonus Points"
              color="teal-6"
              :score="bonus_points"
            >
            </ScoreCard>

            <div class="bonuses ml-3">
              <div class="bonus" style="background-color: #09B0F6;">
                <p class="text-overline">
                  <span>submission success: </span>
                  <span>0</span>
                </p>
              </div>
                <!-- 
                  perfect execution, 
                  no ignored words, 
                  no wrong submissions, 
                  extra power tiles 
                  word streaks
                -->
            </div>
          </div>

          <ScoreCard 
            class="mb-5"
            label="Total Points"
            color="teal-6"
            :score="total_points"
          >
          </ScoreCard>
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
      level_stats,
      level_score,
    } = storeToRefs(runtime)

    const {
      bonus_points
    } = level_stats.value

    const total_points = level_score.value + bonus_points
    const is_ready = ref(true)
    const oi = ['st', 'nd', 'rd', 'th']
    let getBase = 1;

    runtime.processPoints('bonus')

    const nextLevel = () => {
      runtime.processPoints('score')
      emit('start')
    }

    // 1st, 2nd, 3rd
    const ordinalIndicator = computed(() => {
      getBase = level;
      if(level > 9) getBase.value = level % 10

      if((getBase.value > 3 && getBase.value <= 9) || getBase.value == 0) return oi[3]

      return oi[getBase.value - 1]
    })

    onMounted(() => {
      // const timeline = gsap.timeline({
      //   pause: true,
      //   duration: 3,
      //   ease: "power4.out",
      //   delay: 1,
      //   onComplete: () => {
      //     is_ready.value = true
      //   }
      // })

      // timeline
      //   .to("#bonusPoints", { innerText: level_bonus_points.value, snap: "innerText" })
      //   .to("#totalPoints", { innerText: total_points, snap: "innerText" })

      // timeline.play();
    })

    return {
      level,
      nextLevel,
      is_ready,
      ordinalIndicator,
      level_score,
      bonus_points,
      total_points,
    }
  }
}
</script> 

<style lang="scss" scoped>
.start-card {
  width: 450px;
}

.text-overline {
  letter-spacing: 0px;
}

.bonuses {
  .bonus {
    padding: 0px 5px;

    p {
      margin-bottom: 0px;
      color: white;
      line-height:  1.5rem;
    }
  }
}
</style>