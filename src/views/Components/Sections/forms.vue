<template>
  <div class="q-pa-md q-py-xl">

    <q-chip square size="lg" class="text-weight-bold">
      <q-avatar icon="star" color="accent" text-color="black" />
      Forms
    </q-chip>

    <p class="q-my-xl"></p>

    <div class="row">
      <div class="col-12 col-md-6">
        <div class="q-gutter-sm">
          <template v-for="(theme, index) in themes" :key="theme">
            <q-radio 
              v-model="shape" 
              :color="theme" 
              :size="sizes[index]"         
              :val="sizes[index]" 
              :label="sizes[index]+'-'+theme" 
            />
          </template>
        </div>

        <div class="q-px-sm">
          Your selection is: <strong>{{ shape }}</strong>
        </div>

        <div class="q-gutter-sm">
          <template v-for="(theme, index) in themes" :key="theme">
            <q-checkbox
              v-model="shape" 
              :color="theme" 
              :size="sizes[index]"         
              :val="sizes[index]" 
              :label="sizes[index]+'-'+theme" 
            />
          </template>
        </div>
      </div>

      <div class="col-12 col-md-6 pl-15">
        <div class="q-gutter-y-md column" style="max-width: 300px">
          <div>
            <q-toggle v-model="readonly" label="Readonly" />
            <q-toggle v-model="disable" label="Disable" />
          </div>

          <q-field dark :readonly="readonly" :disable="disable">
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>

            <template v-slot:control>
              <div class="self-center full-width no-outline" :tabindex="tabindex">{{text}}</div>
            </template>
          </q-field>

          <q-field dark filled :readonly="readonly" :disable="disable">
            <template v-slot:prepend>
              <q-icon name="event" />
            </template>

            <template v-slot:control>
              <div class="self-center full-width no-outline" :tabindex="tabindex">{{text}}</div>
            </template>
          </q-field>

          <q-field outlined :readonly="readonly" :disable="disable">
            <template v-slot:control>
              <div class="self-center full-width no-outline" :tabindex="tabindex">{{text}}</div>
            </template>

            <template v-slot:append>
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg">
              </q-avatar>
            </template>
          </q-field>

          <q-input  
            standout 
            bottom-slots 
            stack-label 
            counter 
            label="Labels" 
            v-model="text"
            :disable="disable"
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>

            <template v-slot:control>
              <div class="self-center full-width no-outline" :tabindex="tabindex">
                {{text}}</div>
            </template>

            <template v-slot:append>
              <q-icon name="close" @click="text = ''" class="cursor-pointer" />
            </template>

            <template v-slot:hint>
              Field hint
            </template>
          </q-input>

          <q-field dark borderless :readonly="readonly" :disable="disable">
            <template v-slot:control>
              <div class="self-center full-width no-outline" :tabindex="tabindex">{{text}}</div>
            </template>

            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-field>

          <q-input 
            standout 
            v-model="text" 
            label="Standout" 
          />
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref, computed  } from 'vue'
import { getData } from '@/composables/themes.js'

export default {
  setup () {
    const { themes, sizes } = getData()

    const field_focus = ref(false)
    const readonly = ref(false)
    const disable = ref(false)

    return {
      tabindex: computed(() => disable.value === true || readonly.value === true ? -1 : 0),
      shape: ref('line'),
      text: ref('Field content'),
      field_focus,
      themes,
      sizes,
      readonly,
      disable,
    }
  }
}
</script>

<style lang="">  
</style>