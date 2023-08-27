<template>
  <button 
    class="custom-btn"
    :style="{
      color,
      height,
      width,
      fontSize: font_size
    }"
  >
    <q-card :class="['shape rounded-0', color, {
      'left': from_left
    }]"
      :flat="true"
      :style="{
        width: `calc(${width} - 95%)`,
      }"
    ></q-card>
    <p class="label">{{ label }}</p>
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    label: {
      type: String,
      default: "Button"
    },
    color: {
      type: String,
      default: "bg-black"
    },
    height: {
      type: [Number, String],
      default: '100%'
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    font_size: {
      type: String,
      default: "1em"
    },
    from_left: {
      type: Boolean,
      default: false
    }
  }
  
}
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 10px;
  transition: all 0.2s ease-out;

  &.left {
    left: 0 !important;
  }
}

.label {
  position: relative;
  margin: 0px;
  transition: all 0.2s ease-out;
}

.custom-btn {
  &:hover {
    .shape {
      width: 100% !important;
    }

    .label {
      color: white;
    }
    
  }
}
</style>