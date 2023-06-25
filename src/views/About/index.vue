<template>
  <div class="q-pa-xl">
    <h3 class="q-mt-none">{{ '<About/>' }}</h3>

    <div class="row">
      <div class="col-4">
        <p class="text-h5 text-primary">Skills</p>
        <div class="q-pa-md text-white">
          <q-icon color="white" name="fab fa-html5" />
          <q-tree
            :nodes="skills_on_tree"
            node-key="label"
            v-model:expanded="expanded"
            dark
          />
        </div>
      </div>
      <div class="col-8">
        <p class="text-h5 text-primary">Experience</p>

        <ExperienceTimeline />
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref } from 'vue'
import { useSkillsStore } from '@/stores/SkillsStore'
import _ from 'lodash'  
import ExperienceTimeline from "./Components/ExperienceTimeline.vue"

export default {
  name: 'About',
  components: {
    ExperienceTimeline
  },
  setup () {
    const skills_store = useSkillsStore()
    const expanded = ref([ 'Satisfied customers (with avatar)', 'Good food (with icon)' ])

    const skills_on_tree = skills_store.skills.map(skill => {
      const tag_children = skill.tags.map(tag => {
        return { 
          label: `Tag : ${tag}` 
        }
      })

      const children = [
        { label: `Skill level : ${skill.skillLevel}` },
        { label: `Experience : ${skill.exp} months` },
        { label: 'Tags', children: tag_children  }
      ]

      return {
        label: skill.name,
        icon: skill.logo,
        iconColor: skill.color,
        children: children,
      }
    })

    return {
      expanded,
      skills_store,
      skills_on_tree
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
