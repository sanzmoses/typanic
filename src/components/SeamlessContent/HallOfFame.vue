<template>
  <div class="fame-hall bg-red-9">
    <div class="flex align-center justify-between px-3 py-2">
      <div class="flex text-white align-center justify-start">
        <p style="min-width: 170px;" class="text-h6 ma-0 mt-1 mr-2">HALL OF {{ proper_title }}</p>

        <q-btn 
          @click="switchSort"
          :icon="switch_sort ? 'arrow_downward': 'arrow_upward'" 
          color="white" 
          size="sm" 
          round
          flat
        />
      </div>
      
      <div>
        <q-btn 
          class="mt-2"
          color="white" 
          icon="close" 
          size="sm" 
          v-close-popup  
          round 
          flat
        />
      </div>
    </div>

    <q-table
      dark
      ref="table"
      class="bg-red-9"
      row-key="name"
      :rows="users_scores"
      :columns="columns"
      :separator="separator"
      :rows-per-page-options="[10,20,50,100]"
      column-sort-order="ad"
    />
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { ref, onMounted, computed } from 'vue'
import * as dayjs from 'dayjs'
import { init } from '@/composables/supabase.js'
import { useUserStore } from '@/stores/UserStore'

export default {
  name: 'Hall of fame',
  setup() {
    const runtime = useRuntimeStore()
    const { users_scores } = useUserStore()
    const switch_sort = ref(null)
    const table = ref(null)
    const proper_title = computed(() => switch_sort.value ? "SHAME": "FAME");
    const { getUserScores } = init()

    const switchSort = () => {
      switch_sort.value = !switch_sort.value
      table.value.sort("score")
    }

    const columns = [
    {
        name: 'date',
        required: true,
        label: 'Date',
        align: 'left',
        field: row => row.created_at,
        format: val => dayjs(new Date(val)).format('MMM D YY'),
        style: 'width: 150px',
      },
      {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
      },
      { name: 'score', align: 'center', label: 'Score', field: 'score', },
    ]

    const pagination = {
      sortBy: 'asc',
      descending: false,
      page: 1,
      rowsPerPage: 10
      // rowsNumber: xx if getting data from a server
    }

    onMounted(() => {})

    return {
      separator: ref('horizontal'),
      columns,
      proper_title,
      switch_sort,
      pagination,
      users_scores,
      switchSort,
      table
    }
  }
}
</script>