<template>
  <div>
    <transition
      appear
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    >
      <q-btn 
        v-if="!seamless"
        @click="seamless = !seammless" 
        icon="format_list_bulleted" 
        text-color="black" 
        color="primary"
        size="md"
        push 
        round 
      />
    </transition>

    <q-dialog 
      v-model="seamless" 
      position="right"
      seamless 
    >
      <q-card style="width: 350px">
        <q-linear-progress :value="progress" color="primary" />

        <q-card-section class="row items-center no-wrap">
          <div>
            <h5 class="q-ma-none">Table of Contents</h5>
          </div>

          <q-space />
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="q-px-lg q-pt-none q-pb-lg">
          <template v-for="link in compagestore.links" :key="'links-'+link">
            <q-btn 
              :outline="compagestore.active == link"
              :flat="compagestore.active != link"
              class="text-capitalize q-ma-xs" 
              color="warning" 
              :label="link"
              @click="handleClick(link)"
            />
          </template>
          
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, watchEffect  } from 'vue'
import { useComponentsPageStore } from '/src/stores/ComponentsPageStore'

export default {
  name: "seamless nav",
  props: {
    is_fixed: {
      type: Boolean
    }
  },
  setup () {
    const compagestore = useComponentsPageStore()
    const setActive = compagestore.SET_ACTIVE
    const setScrollTo = compagestore.SET_SCROLL_TO

    const progress = ref(0)

    watchEffect(async () => {
      if(compagestore.scroll_top) {
        const innerHeight = window.innerHeight;
        const scroll_height = document.documentElement.scrollHeight - innerHeight;
        const current_scroll = compagestore.scroll_top;
        const decimal = (current_scroll / scroll_height).toFixed(2);
        
        progress.value = JSON.parse(decimal)
      }
    })

    return {
      seamless: ref(false),
      compagestore,
      setActive,
      setScrollTo,
      progress
    }
  },
  methods: {
    handleClick(link) {
      this.setActive(link)
      this.setScrollTo(true);
    }
  }
}
</script>

<style lang="">
</style>