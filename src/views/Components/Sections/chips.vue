<template lang="">
  <div class="q-pa-md q-py-xl">

    <q-chip square size="lg" class="text-weight-bold">
      <q-avatar icon="star" color="accent" text-color="black" />
      Chips
    </q-chip>

    <p class="q-my-xl"></p>

    <p>Circular</p>
    <template v-for="(theme, index) in themes" :key="theme">
      <q-chip 
        outline 
        :color="theme"
        text-color="white"
        :icon="icons[index]"
      >
        {{ theme }}
      </q-chip>
    </template>
    
    <q-chip color="primary" text-color="black" icon="event">
      Add to calendar
    </q-chip>
    <q-chip color="teal" text-color="white" icon="bookmark">
      Bookmark
    </q-chip>
    <q-chip class="glossy" color="orange" text-color="white" icon-right="star">
      Star
    </q-chip>
    <q-chip color="red" text-color="white" icon="alarm" label="Set alarm" />
    <q-chip color="deep-orange" text-color="white" icon="directions">
      Get directions
    </q-chip>
    <q-chip>
      <q-avatar icon="bookmark" color="red" text-color="white" />
      Bookmark
    </q-chip>
    <q-chip>
      <q-avatar color="red" text-color="white">50</q-avatar>
      Emails
    </q-chip>
    <q-chip>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar5.jpg">
      </q-avatar>
      John
    </q-chip>

    <p class="mt-5">Square</p>
    <q-chip square color="primary" text-color="black" icon="event">
      Add to calendar
    </q-chip>
    <q-chip class="glossy" square color="teal" text-color="white" icon="bookmark">
      Bookmark
    </q-chip>
    <q-chip square color="orange" text-color="white" icon-right="star">
      Star
    </q-chip>
    <q-chip square color="red" text-color="white" icon="alarm" label="Set alarm" />
    <q-chip square color="deep-orange" text-color="white" icon="directions">
      Get directions
    </q-chip>
    <q-chip square>
      <q-avatar icon="bookmark" color="red" text-color="white" />
      Bookmark
    </q-chip>
    <q-chip square>
      <q-avatar color="red" text-color="white">50</q-avatar>
      Emails
    </q-chip>
    <q-chip square>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
      </q-avatar>
      John
    </q-chip>
    
    <p class="mt-5">Sizes</p>

    <q-chip size="xl" icon="bookmark">
      Bookmark
    </q-chip>
    <q-chip size="lg" icon="bookmark">
      Bookmark
    </q-chip>
    <q-chip size="md" icon="bookmark">
      Bookmark
    </q-chip>
    <q-chip size="sm" icon="bookmark">
      Bookmark
    </q-chip>
    <q-chip size="xs" icon="bookmark">
      Bookmark
    </q-chip>
    
  </div>
</template>

<script>
import { ref } from 'vue'
import { getData } from '@/composables/themes.js'

export default {
  name: 'chips',
  setup () {
    const { themes, icons } = getData()

    return {
      drawer: ref(false),
      themes,
      icons
    }
  },
  data: () => ({
  }),
}
</script>


<style lang="scss" scoped>
</style>