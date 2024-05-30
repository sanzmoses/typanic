<template>
  <div class="about-game px-1">
    <p>Inspired by Typing Maniac Game by MindJolt</p>

    <q-img
      class="col-12 bordered mb-5"
      src="@/assets/typing-maniac.png"
    />
    
    <p class="text-justify">Copied almost all the fun features such as power tiles ”Ice”, “Fire” and “Slow” except with a minor change in name but the same function which was “Wind” in Typing Maniac, which I called “Heal” that recovers 50 points of lost HP from ignored tiles.</p>

    <template v-for="logo in logos" :key="logo+'-logo'">
      <q-chip 
        square 
        color="white" 
        class="text-black pr-1 pl-2"
      >
        <q-avatar size="xs">
          <img :src="getImageUrl(logo)">
        </q-avatar>
        {{ logo }}
      </q-chip>
    </template>
    
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { useRoute  } from 'vue-router';
import { ref, onMounted } from 'vue'

export default {
  name: 'About game',
  setup() {
    const runtime = useRuntimeStore()
    const vueRoute = useRoute()

    const logos = ref([
      "vue", 
      "vite",
      "quasar",
      "gsap",
      "supabase",
    ])

    const getImageUrl = (name) => {
      return new URL(`/src/assets/logo/${name}.svg`, import.meta.url).href
    }

    onMounted(() => {
      
    })

    return {
      logos,
      getImageUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.bordered {
  border: 3px solid white;
  border-right: 5px solid white;
  border-left: 5px solid white;
  margin-bottom: 10px;
}
</style>