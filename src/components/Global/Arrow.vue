<template>
  <div 
    @mouseenter="onHover" 
    @mouseleave="onLeave" 
    @click="$emit('arrowClicked')" 
    ref="arrow" 
    class="arrow"
  >
    <div ref="line" class="line"></div>
    <div ref="head" class="head"></div>
  </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: "Arrow",
  data: () => ({
    arrow_line: null,
    arrow_head: null
  }),
  methods: {
    onHover() {
      this.arrow_line.play();
      this.arrow_head.play();
    },
    onLeave() {
      this.arrow_line.reverse();
      this.arrow_head.reverse();
    }
  },
  mounted() {
    const { line, head } = this.$refs
    
    gsap.to(line, {
      y: '0px',
      opacity: 1,
      duration: .5,
      delay: 2,
      ease: 'ease-in'
    })

    gsap.to(head, {
      y: '-5px',
      opacity: 1,
      duration: .5,
      delay: 2.1,
      ease: 'ease-in'
    })

    this.arrow_line = gsap.to(line, {
      height: '100px',
      ease: 'power2.out',
      duration: .5,
      paused: true,
    })

    this.arrow_head = gsap.to(head, {
      y: '0px',
      opacity: 0,
      duration: .5,
      repeat: -1,
      repeatDelay: .5,
      ease: 'power2.out',
      duration: .5,
      paused: true,
    })
  }
}
</script>

<style lang="scss" scoped>
  .arrow {
    height: 100px;
    width: 5px;
    display: flex;
    align-items: center;
    justify-content: end;
    flex-direction: column;
    cursor: pointer;

    .line {
      height: 50px;
      opacity: 0;
      border-left: 1px solid white;
      transform: translateY(-30px);
    }

    .head {
      width: 10px;
      height: 10px;
      border-bottom: 1px solid white;
      border-right: 1px solid white;
      transform: rotate(45deg);
      opacity: 0;
    }
  }
</style>