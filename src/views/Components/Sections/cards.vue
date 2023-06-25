<template lang="">
  <div class="q-pa-md q-py-xl">

    <q-chip square size="lg" class="text-weight-bold">
      <q-avatar icon="star" color="accent" text-color="black" />
      Cards
    </q-chip>

    <p class="q-my-xl"></p>

    <div class="row q-gutter-md">

      <div class="col-6">
        <q-card :dark="false" class="my-card" flat bordered>
          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />

          <q-card-section>
            <div class="text-overline text-orange-9">Overline</div>
            <div class="text-h5 q-mt-sm q-mb-xs text-black">Overture</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-actions>
            <q-btn flat color="dark" label="Share" />
            <q-btn flat color="primary" label="Book" />

            <q-space />

            <q-btn
              color="grey"
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </q-card-actions>

          <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subitle2">
                {{ lorem }}
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>

      <div class="col-5">
        <q-card class="my-card bg-accent q-pa-lg">
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 mt-15">
        <template v-if="project">
          <BrowserCard class="mb-10" :project="project" />

          <ProjectCard :project="project" />
        </template>
      </div>

    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import BrowserCard from "@/components/BrowserCard.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { getData } from '@/composables/projects.js'

export default {
  components: {
    BrowserCard,
    ProjectCard
  },
  setup () {
    const { project } = getData()

    return {
      project,
      expanded: ref(false),
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 350px;
}
  
</style>
