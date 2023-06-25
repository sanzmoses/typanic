<template lang="">
  <div class="q-pa-md q-py-xl">

    <q-chip square size="lg" class="text-weight-bold">
      <q-avatar icon="star" color="accent" text-color="black" />
      Date Picker
    </q-chip>

    <p class="q-my-xl"></p>

    <div class="q-pa-md q-gutter-sm">
      <q-date
        v-model="date"
        color="accent"
        navigation-min-year-month="2015/01"
        bordered
      />

      <q-date
        v-model="date"
        color="orange"
        text-color="black"
        bordered
      />
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      date: ref('2019/02/01')
    }
  }
}
</script>

<style lang="">  
</style>