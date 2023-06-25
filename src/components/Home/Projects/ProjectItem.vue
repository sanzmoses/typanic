<template>
  <div class="full-width row justify-center">
    <ProjectCard :project="item" />
  </div>

  <!-- <highlightjs
    language="json"
    :code="formatted"
  /> -->
    <!-- <q-btn  @click="deleteItem" color="deep-orange" glossy label="Delete" /> -->
</template>

<script>
import ProjectCard from "@/components/ProjectCard.vue";

export default {
    name: "Project Item",
    components: {
      ProjectCard,
    },
    props: {
        item: {
          type: Object,
          required: true,
        },
    },
    computed: {
      formatted() {
        return JSON.stringify(this.item, undefined, 2)
      }
    },
    methods: {
        deleteItem() {
          console.log("deleting item", this.item.id)
            // fetch(`http://localhost:3000/projects/${this.item.id}`, {
            //     method: 'DELETE',
            // })
            // .then(response => {
            //     console.log("response", response.json())
            // })
        }
    }
}
</script>