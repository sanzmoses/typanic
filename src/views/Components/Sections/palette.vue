<template lang="">
  <div class="q-pa-md q-py-xl">

    <q-chip square size="lg" class="text-weight-bold">
      <q-avatar icon="star" color="accent" text-color="black" />
      Color Palette
    </q-chip>

    <div class="row mt-5">
      <div class="col-1">
        <q-chip color="primary" text-color="black" size="md">Note: </q-chip>
      </div>
      <div class="col pl-2">
        <p>  You can change the colors by clicking and picking a color from the picker and it will update that color theme accross the app where themes are being used. Refresh the page to revert back the original palette</p>
      </div>
      
    </div>
    
    <div class="row mt-5">
      <template v-for="(theme, index) in themes" :key="theme">
        <div class="px-5 py-2 text-center">

          <q-avatar 
            size="9rem" 
            font-size="16px"
            text-color="black"
            :color="theme" 
            style="cursor: pointer"
          >
            {{ themes_value[theme] }}

            <q-menu
              anchor="center middle"
              self="center middle"
            >
              <q-color 
                :default-value="themes_value[theme]"
                @change="setThemeValue($event, theme)"
                no-header-tabs
              />
            </q-menu>
          </q-avatar>

          <p :class="['mt-5 text-'+theme]">{{ theme }}</p>
        </div>
      </template>
    </div>
    

  </div>
</template>

<script>
import { ref  } from 'vue'
import { getData } from '@/composables/themes.js'
import { getCssVar, setCssVar, colors } from 'quasar'

export default {
  name: 'About',
  setup () {
    const { themes } = getData()
    const themes_value = ref({})

    for (const theme of themes.value) {
      themes_value.value[theme] = getCssVar(theme)
    }

    const setThemeValue = (value, theme) => {
      setCssVar(theme, value)
    }

    return {
      themes,
      themes_value,
      setThemeValue
    }
  },
  data: () => ({
  }),
}
</script>

<style lang="">
</style>