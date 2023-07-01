<template>
  <div class="power-holder">
    <template v-for="(tile, index) in power_tiles" :key="tile.name + index">
      <div>
        <q-chip :color="tile.color" text-color="white">
          <q-avatar :icon="tile.icon" color="white" :text-color="tile.color" />
          {{ tile.name }}
        </q-chip>
      </div>
    </template>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import _ from 'lodash'

export default {
  name: 'Template',
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
  min-width: 100px;
  min-height: 200px;
}
</style>