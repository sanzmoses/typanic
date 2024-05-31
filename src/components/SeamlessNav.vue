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
      <q-card dark :style="{ width }" :class="`bg-${bgColor}`">
        <q-linear-progress :value="progress" color="primary" />

        <q-card-section class="row items-center no-wrap q-px-lg q-pb-sm">
          <h6 :class="[`q-ma-none ${dark ? 'text-black':''}`]">{{ cardTitle }}</h6>
          <q-space />
          <q-btn 
            :color="dark ? 'black': 'white'" 
            icon="close" 
            size="md" 
            v-close-popup  
            round 
            flat
          />
        </q-card-section>

        <q-card-section class="q-px-lg q-pt-none q-pb-lg">
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
    cardTitle: {
      type: String,
    },
    bgColor: {
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