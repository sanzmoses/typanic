import { ref } from 'vue'

export function getSetup() {
  const setup = ref({
    height: 500,
    width: 500
  })

  return {
    setup,
  }
}