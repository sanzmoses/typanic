<template>
  <div class="item-container" 
    @mouseenter="onHover"
    @mouseleave="onLeave"
    @click="onClick(item.id)"
  >
      <div :id="`seeker-shape-${item.id}`" class="shape"></div>
      <div class="text-container">
        <p :id="`seeker-text-${item.id}`">{{ item.nickname }}</p>
      </div>
    </div>
</template>

<script>
import gsap from 'gsap'

export default {
  name: "SeekerItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    shape: null,
    text: null,
    char_limit: 5,
  }),
  computed: {
    shorten_name() {
      if(this.item.name.length > this.char_limit) {
        return this.item.name.substr(0, this.char_limit)+".."
      }

      return this.item.name
    }
  },
  methods: {
    onHover() {
      this.shape.play();
      this.text.play();
    },
    onLeave() {
      if(!this.active) {
        this.shape.reverse();
        this.text.reverse();
      }
    },
    onClick(index) {
      gsap.fromTo("#seeker-shape-"+this.item.id, {
        scaleY: -1,
      }, {
        scaleY: 1,
      });
    },
  },
  mounted() {
    this.shape = gsap.to("#seeker-shape-"+this.item.id, {
      height: '30px',
      width: '1px',
      marginLeft: '2px',
      borderRadius: '0px',
      duration: .3,
      paused: true
    });

    this.text = gsap.to("#seeker-text-"+this.item.id, {
      x: 10,
      duration: .5,
      paused: true
    });

    if(this.active) {
      this.onHover();
    }

    this.$emit("mounted")
  },
  watch: {
    active: function(value) {
      if(value) {
        this.onHover();
      } else {
        this.onLeave();
      }
    }
  }
}
</script>

<style lang="scss">
.item-container {
  display: flex;
  align-items: center;
  margin: 10px 0px;
  cursor: pointer;
  height: 20px;
  caret-color: transparent;

  .shape {
    height: 5px;
    width: 5px;
    border-radius: 25px;
    background-color: white;
  }

  .text-container {
    width: auto;
    padding-right: 20px;
    overflow: hidden;

    p { 
      margin: 0;
      transform: translateX(-100px);
    }
  }
}


</style>