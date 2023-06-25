<template lang="">
  <q-timeline :layout="layout" color="accent">
    <q-timeline-entry heading>
      Experience
      <!-- ({{$q.screen.lt.sm ? 'Dense' : ($q.screen.lt.md ? 'Comfortable' : 'Loose')}}  -->
    </q-timeline-entry>

    <template v-for="(exp, index) in expStore.experience">
      <q-timeline-entry
        :title="exp.company"
        :subtitle="formatDate(exp.datestamp.start)"
        :side="(index%2==0)?'left':'right'"
      >
        <div>
          <p class="mb-0 text-bold">{{ '<'+exp.experience.description+'/>' }}</p>
        <p>{{formatDate(exp.datestamp.start)}}</p>
          <p class="text-caption">{{ exp.role }}</p>
          <p class="text-caption mt-2">
            {{ exp.description }}
          </p>
        </div>
      </q-timeline-entry>
    </template>  
  </q-timeline>
</template>

<script>
import { useExpStore } from '@/stores/ExperienceStore'
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import moment from 'moment'

export default {
  setup() {
    const expStore = useExpStore();
    const $q = useQuasar()
    const layout = computed(() => {
      return $q.screen.lt.sm ? 'dense' : ($q.screen.lt.md ? 'comfortable' : 'loose')
    })

    const formatDate = (d) => {
      return moment(d).format("MMMM YYYY")
    }

    return {
      expStore,
      layout,
      formatDate
    }
  },
}
</script>

<style lang="">  
</style>