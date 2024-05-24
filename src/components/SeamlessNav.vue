<template>
  <div>
    <q-btn 
      @click="seamless = !seammless" 
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
      <q-card dark style="width: 400px" :class="`bg-${bgColor}`">
        <q-linear-progress :value="progress" color="primary" />

        <q-card-section class="row items-center no-wrap">
          <h6 :class="[`q-ma-none text-bold ${dark ? 'text-black':''}`]">{{ cardTitle }}</h6>
          <q-space />
          <q-btn 
            :color="dark ? 'black': 'white'" 
            v-close-popup  
            round 
            flat
            size="md" 
            icon="close" 
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
      default: "accent"
    }
  },
  setup (props) {
    const progress = ref(0)
    const dark = ref(false)
    const bg = props.bgColor
    const text_black = ["positive", "warning"]

    dark.value = text_black.includes(bg)

    console.log("test ", bg, dark.value)

    watchEffect(async () => {})

    return {
      seamless: ref(false),
      progress,
      dark
    }
  },
}
</script>

<style lang="scss">
</style>