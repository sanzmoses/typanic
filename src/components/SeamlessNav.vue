<template>
  <div>
    <q-btn 
      @click="seamless = !seammless" 
      :label="label"
      text-color="white" 
      color="primary"
      class="text-lowercase"
      flat
    />

    <q-dialog 
      v-model="seamless" 
      position="left"
      seamless 
    >
      <q-card style="width: 350px">
        <q-linear-progress :value="progress" color="primary" />

        <q-card-section class="row items-center no-wrap">
          <div>
            <h5 class="q-ma-none">How to play</h5>
          </div>

          <q-space />
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="q-px-lg q-pt-none q-pb-lg">
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
    }
  },
  setup () {

    const progress = ref(0)
    watchEffect(async () => {
      
    })

    return {
      seamless: ref(false),
      progress
    }
  },
}
</script>

<style lang="scss">
</style>