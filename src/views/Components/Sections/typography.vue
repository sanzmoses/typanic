<template lang="">
  <div class="q-pa-md q-py-xl">

    <q-chip square size="lg" class="text-weight-bold">
      <q-avatar icon="star" color="accent" text-color="black" />
      Typography
    </q-chip>

    <p class="q-my-xl"></p>
    
    <h6 class="ma-0"> 'JetBrains Mono', monospace <q-chip color="primary" text-color="black" size="md">Global font</q-chip></h6>
    <h6 class="ma-0"> 'Courier Prime', monospace <q-chip color="primary" text-color="black" size="md">Code font</q-chip></h6>

    <h1><span class="text-weight-bold">Sanz</span> loves kaye 12345</h1>

    <h2>Sanz loves kaye 12345</h2>

    <h3>Sanz loves kaye 12345</h3>

    <h4>Sanz loves kaye 12345</h4>

    <h5>Sanz loves kaye 12345</h5>

    <h6>Sanz loves kaye 12345</h6>

    <p>Sanz loves kaye 12345</p>

    <p>Lorem, ipsum dolor sit amet <b>consectetur adipisicing elit.</b> Dicta debitis quasi <i>repellendus rem reprehenderit excepturi omnis aliquam,</i> <code>saepe neque a, dolorum porro nesciunt esse? </code> Totam, nulla. Debitis minus perspiciatis odit!</p>

    <div style="max-width: 500px">
      <blockquote>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex blanditiis ab error consequatur, repellat et veniam aut quidem ut, minus tenetur saepe debitis quaerat dolores optio odit enim nemo amet.
        </span>
        <p>Anonymous</p>
      </blockquote>
    </div>

    <template v-if="pretty_json">
      <highlightjs
        language="javascript"
        :code="pretty_json"
      />
    </template>

  </div>
</template>

<script>
import { getData } from '@/composables/projects.js'

export default {
  setup() {
    const { pretty_json } = getData()
    
    return { pretty_json }
  },
}
</script>

<style lang="scss">  
</style>