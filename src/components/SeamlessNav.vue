<template>
  <div>
    <q-btn 
      @click="toggle" 
      :label="label"
      class="text-lowercase"
      text-color="white" 
      color="primary"
      square
      flat
    />

    <q-dialog 
      v-model="seamless" 
      :position="position"
      seamless 
      square
    >
      <q-card dark :style="{ width }">
        <q-card-section class="pa-0">
          <slot>
          </slot>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, watchEffect  } from 'vue'

export default {
  name: "seamless nav",
  props: {
    label: {
      type: String
    },
    position: {
      type: String,
    },
    width: {
      type: String,
      default: "400px"
    }
  },
  setup (props) {
    const progress = ref(0)
    const dark = ref(false)
    const bg = props.bgColor
    const text_black = ["orange-4", "white"]
    const seamless = ref(false)

    dark.value = text_black.includes(bg)

    watchEffect(async () => {})

    const toggle = () => {
      seamless.value = !seamless.value
    }

    return {
      seamless,
      toggle,
      progress,
      dark
    }
  },
}
</script>

<style lang="scss">
</style>