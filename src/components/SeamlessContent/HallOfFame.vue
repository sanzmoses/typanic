<template>
  <div class="fame-hall">
    <q-table
      color="primary"
      flat
      dark
      row-key="name"
      :rows="rows"
      :columns="columns"
      :separator="separator"
    />
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { ref, onMounted } from 'vue'
import * as dayjs from 'dayjs'

export default {
  name: 'Hall of fame',
  setup() {
    const runtime = useRuntimeStore()
    const data = ref(null)

    const columns = [
    {
        name: 'date',
        required: true,
        label: 'Date',
        align: 'left',
        field: row => row.created_at,
        format: val => dayjs(new Date(val)).format('MMM D YY'),
        sortable: true
      },
      {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
      { name: 'score', align: 'center', label: 'Score', field: 'score', sortable: true },
    ]

    const rows = [
      {
        created_at: "5/31/2024 16:12:14",
        name: "John",
        score: "100"
      },
      {
        created_at: "5/1/2024 8:12:14",
        name: "Jane",
        score: "263"
      },
    ]

    onMounted(() => {})

    return {
      separator: ref('horizontal'),
      columns,
      rows,
    }
  }
}
</script>