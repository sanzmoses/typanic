<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="show" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-teal text-white" style="width: 300px" square>
        <q-card-section>
          <div class="text-caption">Enter your name to continue</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input 
            @keyup.enter="submit"
            v-model="name" 
            :hint="hint"
            maxlength="12"
            label="Name" 
            ref="input"
            standout 
            counter 
            square
          />
          
        </q-card-section>

        <q-card-actions align="right" class="text-teal q-pa-md">
          <q-btn 
            @click="submit"
            class="full-width text-bold submit-btn" 
            icon-right="keyboard"
            text-color="teal" 
            label="submit" 
            color="white" 
            square
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/UserStore'

export default {
  setup () {
    const name = ref("")
    const show = ref(false)
    const input = ref(null)
    const hint = ref("")

    const user = useUserStore()

    const submit = () => {
      if(name.value.length < 2 || name.value > 12) {
        hint.value = "Provide a name to continue"
        return;
      }

      user.setUserName(name.value)
      show.value = false;
    }

    onMounted(() => {
      show.value = true
    })

    return {
      show,
      name,
      submit,
      input,
      hint
    }
  }
}
</script>

<style lang="scss">
.submit-btn {
  span {
    margin-top: 2px;
  }
}
</style>