<template>
  <div class="power-holder">
    <TransitionGroup name="list">
      <template v-for="(tile, index) in power_tiles" :key="tile.name + index">
        <div :class="['power-tile', tile.name]">
          <p class="ma-0">{{ tile.name }}</p>
        </div>
      </template>
    </TransitionGroup>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import _ from 'lodash'

export default {
  name: 'PowerHolder',
  setup() {
    const runtime = useRuntimeStore()
    const { power_tiles } = storeToRefs(runtime)

    const data = ref(null)

    onMounted(() => { })

    return {
      power_tiles,
      data
    }
  }
}
</script>

<style lang="scss" scoped>
.power-holder {
  width: 100px;
  height: 190px;
  border-left: 2px solid white;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.power-tile {
  width: 60px;
  height: 30px;
  padding: 7px;
  margin: 10px 0px 0px 10px;
  display: flex;
  align-items: center;
  justify-content: start;

  p {
    font-size: 14px;
    height: 17px; 
  }

  &.ice {
    background-color: #379FFF;
    border: 1px solid #00D1FF;
  }

  &.fire {
    background-color: #F00;
    border: 1px solid #FF8A00;
  }

  &.slow {
    background-color: #C0F;
    border: 1px solid #E789FF;
  }

  &.heal {
    background-color: #00D06C;
    border: 1px solid #00FF85;
  }
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>