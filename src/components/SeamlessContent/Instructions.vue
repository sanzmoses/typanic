<template>
  <div class="instructions">
    <div class="pr-2">
      <q-list 
        bordered 
        separator 
        class="border-teal"
        style="border-color: black;"
      >
        <q-item 
          :active="section === 1"
          @click="section = 1"
          active-class="section--highlight" 
          class="section"
          clickable 
          v-ripple
        >
          <q-item-section>
            <q-item-label class="section--label mb-2">
              <q-chip 
                square 
                size="sm"
                color="white" 
                class="text-black rounded-0"
              >
                <p class="text-caption mt-1 mb-0">Type away</p>
              </q-chip>
            </q-item-label>

            <q-item-label class="section--label pl-1" caption>
              <p>
                Add name for recording in hall of fame (top scorers), click play and type away.
              </p>

              <p class="mb-0"><b>Objectives:</b> <br/> Clear dropping tiles by typing the words and pressing Enter.</p>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          :active="section === 2"
          @click="section = 2"
          active-class="section--highlight" 
          class="section"
          clickable 
          v-ripple
        >
          <q-item-section>
            <q-item-label class="section--label mb-2">
              <q-chip 
                square 
                size="sm"
                color="white" 
                class="text-black rounded-0"
              >
                <p class="text-caption mt-1 mb-0">Power Tiles</p>
              </q-chip>
            </q-item-label>

            <q-item-label class="section--label pl-1" caption>
              <p class="mb-0">Game starts with default available power tiles, you can store up to 5 power tiles each level and carries on forward, type them during the game to use advantages:</p>
            </q-item-label>
            
            <q-list class="mt-2">
              <template v-for="tile in power_tiles" :key="tile.name+'-tile'">
                <q-item dense>
                  <q-item-section avatar>
                    <div :class="['power-tile', tile.name]">
                      <p class="ma-0">{{ tile.name }}</p>
                    </div>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-black text-overline">
                      {{ tile.description }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-list>

          </q-item-section>
        </q-item>

        <q-item 
          :active="section === 3"
          @click="section = 3"
          active-class="section--highlight" 
          class="section"
          clickable 
          v-ripple
        >
          <q-item-section>
            <q-item-label class="section--label mb-2">
              <q-chip 
                square 
                size="sm"
                color="white" 
                class="text-black rounded-0"
              >
                <p class="text-caption mt-1 mb-0">HP and LVLP</p>
              </q-chip>
            </q-item-label>

            <q-item-label class="section--label pl-1" caption>
              <p>HP (green bar) stands for Hit Points, every level starts with 100 then depletes when a tile is ignored and if hp &lt; 0 then the game will end</p>

              <p class="mb-0">LVLP (blue bar) stands for Level points, every level starts with 0 then adds every time a tile is cleared as each tile consists of points, if lvlp is greater than or equal 100 then the level is cleared</p>
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          :active="section === 4"
          @click="section = 4"
          active-class="section--highlight" 
          class="section"
          clickable 
          v-ripple
        >
          <q-item-section>
            <q-item-label class="section--label mb-2">
              <q-chip 
                square 
                size="sm"
                color="white" 
                class="text-black rounded-0"
              >
                <p class="text-caption mt-1 mb-0">Level</p>
              </q-chip>
            </q-item-label>
            <q-item-label class="section--label pl-1" caption>
              <p>Each level increases both speed and word length and scores are accumulated every clearing of level</p>

              <p class="mb-0">Perfect execution adds extra points and getting tiles while stack is full adds extra points</p>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { ref, onMounted } from 'vue'
import { getSetup } from '@/composables/setup.js'

export default {
  name: 'Instructions',
  components: {
  },
  setup() {
    const runtime = useRuntimeStore()
    const { power_tiles } = getSetup()

    const section = ref(null)

    onMounted(() => {
      
    })

    return {
      section,
      power_tiles
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  border-color: black !important;
  padding: 15px 10px;

  &--label {
    color: black !important;
    margin-bottom: 0px;
  }

  &--highlight {
    background-color: rgba(255, 255, 255, 0.2)
  }
}

.power-tile {
  text-transform: capitalize;
  height: 25px;
}
</style>