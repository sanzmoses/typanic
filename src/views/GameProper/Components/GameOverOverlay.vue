<template>
<div class="overlay q-pa-lg row items-center justify-center">
  <q-card class="start-card bg-transparent text-red-14" flat>
    <q-card-section class="text-left">
      <div class="flex justify-center title-container">
        <p id="title" class="text-h3 text-uppercase text-bold game-over-title">Game Over</p>
      </div>

      <div>
        <div class="flex justify-center">
          <ScoreCard 
            :fontSize="'1.4em'"
            class="mb-1 mx-1"
            label="Final Score"
            color="teal-6"
            :score="score"
          >
          </ScoreCard>
        </div>
        <div id="score1" class="flex items-center justify-center">
          <template v-for="score in scores" :key="score.name+'-score'">
            <ScoreCard 
              :label_type="'full'"
              class="mb-2 mx-1"
              :label="bonusNameFilter(score.name)"
              :color="score.color"
              :score="score.value"
              font-size=".7em"
            />
          </template>
        </div>
      </div>
    
    </q-card-section>

    <q-card-actions align="center">
      <div id="button">
        <TButton 
          :from_left="true"
          label="PLAY AGAIN" 
          width="200px"
          height="65px"
          font_size="2em"
          color="bg-red-14"
          class="text-bold"
          @click="$emit('newGame')" 
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
import { init } from '@/composables/supabase.js'

export default {
  name: 'GameOverOverlay',
  components: {
    TButton,
    ScoreCard,
  },
  setup() {
    const runtime = useRuntimeStore()
    const {  
      overall,
      score
    } = storeToRefs(runtime)

    const { setup } = getSetup()
    const { level_stats_color } = setup.value
    const scores = ref([]);

    const show = ref(true)

    const { insertOrUpdateUserScore } = init()

    const mapScores = () => {
      Object.keys(overall.value).forEach(key => {
        scores.value.push({
          name: key,
          value: overall.value[key],
          color: level_stats_color[key].name
        })
      })
    }

    const bonusNameFilter = value => {
      return value.replaceAll("_", " ")
    }

    onMounted(() => {
      mapScores();
      insertOrUpdateUserScore()
    })

    return {
      bonusNameFilter,
      scores,
      score,
      show,
    }
  }
}
</script> 

<style lang="scss" scoped>

.start-card {
  width: 450px;
}

.title-container {
  // font-size: 20px;

  p {
    border: 4px solid #d50000;
    padding: 15px 13px 5px;
  }
}
</style>