import { ref } from 'vue'

export function getData() {
  const themes = ref([
    'primary',
    'secondary',
    'accent',
    'dark',
    'positive',
    'negative',
    'info',
    'warning'
  ])

  const icons = ref([
    'auto_mode',
    'pest_control',
    'shield_moon',
    'directions_boat',
    'spa',
    'brightness_auto',
    'egg',
    'pest_control_rodent'
  ])

  const sizes = ref([
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '80px',
    'sm',
    'md',
  ])

  const words = ref([
    'typing',
    'setup',
    'seething',
    'looming',
    'devastation',
    'incantation',
    'extravagant',
    'justice',
    'separation',
    'extract',
  ])

  return {
    themes,
    icons,
    sizes,
    words
  }
}