import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'

import { Quasar } from 'quasar'
import { Dark } from 'quasar'

// import VueHighlightJS from 'vue-highlightjs'
// import VueHighlightJS from 'vue3-highlightjs'
// import 'highlight.js/styles/solarized-light.css'
import 'highlight.js/styles/tokyo-night-dark.css';
import hljs from 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

// import 'animate.css/animate.min.css'
import 'animate.css/animate.compat.css';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import Gsap
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

createApp(App)
  .use(router)
  .use(Quasar, {
    plugins: { }, 
  })
  .use(hljsVuePlugin)
  .use(createPinia())
  .mount('#app')

Dark.set(true)