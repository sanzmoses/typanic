<template>
  <div class="browser-card">
    <q-bar dark class="bg-dark text-white">
      <template v-if="project">
        <div class="text-left">
          <!-- <q-badge outline color="primary" :label="project.name" /> -->

          <q-chip
            color="primary"
            text-color="black"
            size="sm"
          >
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="ellipsis">
              {{ project.name }}
              <q-tooltip>{{ project.name }}</q-tooltip>
            </div>
          </q-chip>
          
        </div>
        <div class="col text-center">
          <p class="text-caption q-ma-none">{{ project.link }}</p>
        </div>
      </template>

      <q-btn dense flat round icon="lens" size="7px" color="red" />
      <q-btn dense flat round icon="lens" size="7px" color="yellow" />
      <div class="overlap">
        <q-spinner-puff
          class="spinner-puff"
          color="secondary"
          size="2em"
        />
        <q-btn 
          dense 
          flat 
          round 
          icon="lens" 
          size="7px" 
          color="green" 
          @click="toggleDrawer" 
        />
      </div>
      
    </q-bar>    
    
    <q-card class="no-border-radius" flat :bordered="false">
      <q-card-section horizontal>
        <q-img
          :img-class="`image-ss ${drawer?'on-filter':''}`"
          :class="[drawer?'col-6 col-md-7':'col-12']"
          :src="getImageUrl(project.img)"
          :ratio="16/9"
        />
        <q-card-section v-show="drawer" class="console-section">

          <template v-if="project">

<pre class="text-caption text-weight-thin">
<code v-html="syntaxHighlight(project)"></code>
</pre>
          </template>
          
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { process } from '@/composables/jsonHighlighter.js'

export default {
  name: "BrowserCard",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { syntaxHighlight } = process(props.project)
    const drawer = ref(true)
    const drawer_toggled = ref(false)
    const project = props.project

    const getImageUrl = (name) => {
        return new URL(`../assets/screenshot/a_${name}`, import.meta.url).href
    }

    const toggleDrawer = () => {
      drawer.value = !drawer.value
      drawer_toggled.value = true;
    }

    return {
      drawer,
      project,
      drawer_toggled,
      syntaxHighlight,
      getImageUrl,
      toggleDrawer,
    }
  },
}
</script>

<style lang="scss">
.browser-card {
  max-width: 900px;
  max-height: 600px;
  overflow: hidden;
  border-radius: 5px;

  .console-section {
    max-height: 600px;
    overflow: auto;
    padding: 0px 15px;
    width: 100%;
    background: $grey-10
  }

  .image-ss {
    margin-top: -20px !important;
    transition: all 0.4s ease-in-out;

    &.on-filter {
      filter: grayscale(100%);
    }
  }
}

.overlap {
  position: relative;
  margin-left: 3px !important;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner-puff {
    position: absolute;
  }
}

.flash-animation {
  animation: flashes 3s infinite ease-in-out;
}

@keyframes flashes {
  0%, 20%, 40%, 100% {
    opacity: 0;
  }

  10%, 30%, 50%, 90% {
    opacity: 1;
  }
}
</style>