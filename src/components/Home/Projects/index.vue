<template>
    <div class="row justify-center">
        <div class="col-xs-12 col-sm-9">
          <div class="relative-position">
            <template v-for="project in projects" :key="project.name">
              <template v-if="project.id === show" >
                <ProjectItem 
                  :id="'project-'+project.id" 
                  :item="project" 
                  class="project" 
                />
              </template>
            </template>
          </div>
        </div>

        <div class="col-sm-2 gt-xs pl-3">
          <SideSeeker :items="projects" @seekerClicked="setShow" />
        </div> 
    </div>
</template>

<script>
import { ref } from 'vue'
import ProjectItem from "./ProjectItem.vue"
import { getData } from '@/composables/projects.js'
import SideSeeker from "@/components/Global/SideSeeker/index.vue";
import gsap from 'gsap'

export default {
  name: "Projects",
  components: {
      ProjectItem,
      SideSeeker
  },
  setup() {
    const { projects } = getData()
    const show = ref(1)

    console.log("show", show.value)

    const setShow = (item) => {
      show.value = item.id
    }

    return { 
      projects,
      show,
      setShow,
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.projects.forEach(project => {
    //     gsap.from("#project-"+project.id, {
    //       x: -100,
    //       opacity: 0,
    //     });
    //   })
    // }, 100)
  }
}
</script>

<style lang="scss" scoped>
.absolute-side {
  position: absolute;
  top: 0;
  right: -10px;
}
</style>