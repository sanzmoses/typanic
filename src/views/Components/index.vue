<template>
  <div ref="scrollAreaRef">
    <q-scroll-observer @scroll="onScroll" />

    <div class="row">
      <div class="col-12 col-sm-10 offset-sm-1">
        
        <div class="row justify-between">
          <h2 id="title" class="text-primary">Style Guide</h2>

          <div class="row flex-center">
            <SeamlessNav 
              style="z-index: 99"
              class="fixed" 
              :is_fixed="is_fixed"
            />
          </div>
        </div>

        <q-separator />
        
        <template v-for="link in compagestore.links" :key="'links-'+link">
          <div 
            :id="link" 
            v-intersection="intersect" 
            style="min-height: 100vh;" 
            class="flex flex-center"
          >
            <component :is="link"></component>
          </div>
        </template>
        
      </div>
    </div>

  </div>
</template>

<script>
import { debounce } from 'quasar'
import SeamlessNav from "@/components/SeamlessNav.vue"
import buttons from "./Sections/buttons.vue"
import chips from "./Sections/chips.vue"
import cards from "./Sections/cards.vue"
import banners from "./Sections/banners.vue"
import dialogs from "./Sections/dialogs.vue"
import forms from "./Sections/forms.vue"
import typography from "./Sections/typography.vue"
import datepicker from "./Sections/datepicker.vue"
import others from "./Sections/others.vue"
import palette from "./Sections/palette.vue"
import { useComponentsPageStore } from '/src/stores/ComponentsPageStore'
import { ref } from 'vue'
import gsap from 'gsap'

export default {
  name: 'Components',
  components: {
    SeamlessNav,
    buttons,
    cards,
    banners,
    dialogs,
    forms,
    typography,
    chips,
    datepicker,
    others,
    palette,
  },
  setup () {
    const thresholds = []
    for (let i = 0; i <= 1.0; i += 0.01) {
      thresholds.push(i)
    }

    const position = ref(300)
    const scrollAreaRef = ref(null)

    const compagestore = useComponentsPageStore()

    const setActive = compagestore.SET_ACTIVE
    const setScrollTo = compagestore.SET_SCROLL_TO
    const setScrollTop = compagestore.SET_SCROLL_TOP

    const is_fixed = ref(false)

    const onScroll = (evt) => {
      setScrollTop(Math.floor(evt.position.top))
      if(evt.position.top > 50) {
        is_fixed.value = true;
      } else {
        is_fixed.value = false;
      }
    }

    return { 
      onScroll: debounce(onScroll, 100),
      compagestore,
      setActive,
      setScrollTo,
      setScrollTop,
      is_fixed,
      position,
      scrollAreaRef,
      intersect: {
        handler (entry) {
          if(entry.isIntersecting) { setActive(entry.target.id) }
        },
        cfg: {
          threshold: thresholds
        }
      },
    }
  },
  data: () => ({
    toggle: false,
  }),
  watch: {
    toggle: function (value) {
      if(value) {
        setTimeout(() => {
          this.toggle = false
        }, 3000)
      }
    },
    'compagestore.scroll_to': function (value) {
      if(value) {
        const element = document.getElementById(this.compagestore.active)

        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

        setTimeout(() => {
          this.setScrollTo(false)
        }, 500)
      }
    }
  },
  mounted() {
    gsap.fromTo("#typography",  {
      opacity: 0,
      x: "-200px",
    },
    {
      duration: 1,
      opacity: 1,
      ease: "power3.inOut",
      x: 0,
    });
  }
}
</script>


<style lang="scss" scoped>
</style>