<template>
  <div class="overlay q-pa-lg row items-center justify-center">
    <q-card class="start-card bg-transparent text-teal-9" flat>
      <q-card-section class="text-left">
        <div class="flex">
          <p id="level" class="text-h1 mb-0">0</p>
          <div class="flex justify-center align-start column">
            <p id="level1" class="mb-0">{{ ordinalIndicator }}</p>
            <p id="level2" class="mb-0 text-white bg-teal-6" style="padding: 3px 4px 0px;">LVL</p>
            <p id="level3" class="mb-0">Complete</p>
          </div>
        </div>

        <div>
          <div id="score1" class="flex justify-center full-width">
            <ScoreCard 
              class="mb-5"
              label="Level Score"
              color="teal-6"
              :score="level_score2"
            >
            </ScoreCard>
          </div>
          

          <div id="score2" class="flex items-center justify-center">
            <ScoreCard 
              :from_left="true"
              class="mb-5"
              label="Bonus Points"
              color="teal-6"
              :score="bonus_points"
            >
            </ScoreCard>

            <div v-if="bonuses.length > 0" class="bonuses">
              <template v-for="bonus in bonuses" :key="bonus.key+'-bonus'" >
                <div
                  class="bonus" 
                  :style="{ backgroundColor: bonus.color }"
                >
                  <p class="text-overline">
                    <span>{{ bonusNameFilter(bonus.name) }}</span>
                    <span v-if="bonus.value != null">: {{ bonus.value }}</span>
                  </p>
                </div>
              </template>  
            </div>
          </div>

          <div id="score3" class="flex justify-center full-width">
            <ScoreCard 
              class="mb-1"
              label="Total Points"
              color="teal-6"
              :score="total_points"
            >
            </ScoreCard>
          </div>
        </div>
      
      </q-card-section>

      <q-card-actions align="right">
        <div id="button">
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
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { getSetup } from '@/composables/setup.js'
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted, onBeforeMount, computed  } from 'vue'
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

    const { setup } = getSetup()
    const { level_stats_color } = setup.value

    const {
      ignored,
      mistakes,
    } = level_stats.value

    const bonus_points = ref(0)
    const level_score2 = ref(0)
    const total_points = ref(0)
    const bonuses = ref([]);
    
    const is_ready = ref(true)
    const oi = ['st', 'nd', 'rd', 'th']
    let getBase = 1;

    runtime.processPoints('bonus')

    const nextLevel = () => {
      runtime.processPoints('score')
      emit('start')
    }

    const processBonuses = () => {
      Object.keys(level_stats.value).forEach(key => {
        if(key === "bonus_points") return;

        bonuses.value.push({
          name: key,
          value: level_stats.value[key],
          color: level_stats_color[key]
        })
      })

      if(ignored == 0 && mistakes == 0) {
        bonuses.value.push({
          name: 'perfect execution!',
          value: null,
          color: level_stats_color.perfect
        })
      }
    }
    
    const bonusNameFilter = value => {
      return value.replaceAll("_", " ")
    }

    // 1st, 2nd, 3rd
    const ordinalIndicator = computed(() => {
      getBase = level;
      if(level > 9) getBase.value = level % 10

      if((getBase.value > 3 && getBase.value <= 9) || getBase.value == 0) return oi[3]

      return oi[getBase.value - 1]
    })

    onBeforeMount(() => {
      processBonuses();
    })

    onMounted(() => {
      gsap.set(".bonus", {width: 0, height: 22, opacity: 0});
      gsap.set("#level1", {width: 0, x: -10, opacity: 0});
      gsap.set("#level2", {width: 0, x: -10, opacity: 0});
      gsap.set("#level3", {height: 0, y: -10, opacity: 0});

      gsap.set(["#score1", "#score2", "#score3"], { y: -10, opacity: 0 });
      gsap.set("#button", {y: -10, opacity: 0});

      const timeline = gsap.timeline({
        pause: true,
        duration: .4,
        ease: "power4.out",
        onComplete: () => {
          is_ready.value = true
        }
      })

      timeline
      .to("#level", { innerText: level.value, snap: "innerText" })
      .to("#level1", { width: 'auto', x: 0, opacity: 1 })
      .to("#level2", { width: 'auto', x: 0, opacity: 1  }, "<")
      .to("#level3", { height: 'auto', y: 0, opacity: 1  })
      .to("#score1", { y: 0, opacity: 1, onComplete: () => {
        level_score2.value = level_score.value
      }})
      .to("#score2", { y: 0, opacity: 1  })
      .to(".bonus", {
        stagger: .2,
        width: 'auto',
        opacity: 1,
        onComplete: () => {
          bonus_points.value = level_stats.value.bonus_points
        }
      }, "<")
      .to("#score3", { y: 0, opacity: 1, onComplete: () => {
        total_points.value = level_score.value + bonus_points.value
      }})
      .to("#button", { y: 0, opacity: 1  })

      // timeline
      //   .to("#bonusPoints", { innerText: level_bonus_points.value, snap: "innerText" })
      //   .to("#totalPoints", { innerText: total_points, snap: "innerText" })

      timeline.play();      
    })

    return {
      nextLevel,
      bonusNameFilter,
      level,
      is_ready,
      ordinalIndicator,
      level_score2,
      bonus_points,
      total_points,
      bonuses
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 3px;
  .bonus {
    padding: 0px 5px;
    margin-bottom: 1px;
    
    p {
      margin-bottom: 0px;
      color: white;
      line-height:  1.5rem;
    }
  }
}
</style>