<template>
  <div class="overlay q-pa-lg row items-center justify-center">
    <div class="ng-container">
      
      <p class="text-h5 text-black">Welcome to Typanic!</p>

      <div class="text-container text-black ">
        <p class="text-body2 text-weight-medium">
          This is my attempt <br> 
          to recreate one of <br> 
          my favorite game: <br>
          "Typing Maniac" <br> 
          by Mindjolt <br> 
          which sadly I <br> 
          could not find <br> 
          in the web <br> 
          anymore. 
        </p>
        <p class="text-body2 text-weight-medium">Enjoy! :)</p>
        <p class="text-body1 text-weight-medium">- sanz</p>
      </div>

      <div class="text-right flex items-end justify-end">
        <TButton 
          label="PLAY" 
          width="200px"
          height="65px"
          font_size="3em"
          color="bg-amber-6"
          @click="$emit('start')"
        />
      </div>
      
    </div>
  </div>
</template>

<script>
import { useRuntimeStore } from '@/stores/RuntimeStore'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import _ from 'lodash'
import TButton from "@/components/TButton.vue"

export default {
  name: 'NewGameDialog',
  components: {
    TButton,
  },
  setup() {
    const runtime = useRuntimeStore()
    const { level } = storeToRefs(runtime)

    const show = ref(true)

    onMounted(() => {
      
    })

    return {
      level,
      show
    }
  }
}
</script> 

<style lang="scss" scoped>
.ng-container {
  width: 350px;
}

.text-container {
  border-left: 2px solid black;
  padding-left: 2em;
}
</style>