<template>
  <div class="about-game px-1 text-black">
    <p>Inspired by Typing Maniac Game by MindJolt</p>

    <q-img
      class="col-12 bordered mb-5"
      src="@/assets/typing-maniac.png"
      height="180px"
    />
    
    <p class="text-justify text-body2">Copied almost all the fun features such as power tiles ”Ice”, “Fire” and “Slow” except with a minor change in name but the same function which was “Wind” in Typing Maniac, which I called “Heal” that recovers 50 points of lost HP from ignored tiles.</p>

    <template v-for="logo in logos" :key="logo+'-logo'">
      <q-chip 
        square 
        color="white" 
        class="text-black pr-1 pl-2 rounded-0"
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
$color: white;
.bordered {
  border: 4px solid $color;
  border-right: 1px solid $color;
  border-left: 1px solid $color;
  margin-bottom: 10px;
}
</style>