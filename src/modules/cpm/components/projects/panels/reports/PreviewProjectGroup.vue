<template>
  <v-card flat>
    <v-card-text>
      <v-container
        fluid
        grid-list-md
      >
        <v-layout
          v-for="(project, indexProject) in projectGroup.projects"
          :key="indexProject"
          row
          wrap
        >
          <v-flex md12>
            <preview-project
              :preview-options="previewOptions"
              :project="project"
              :project-group="projectGroup"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import PreviewProject from './PreviewProject'
export default {
  components: {
    PreviewProject
  },
  props: {
    projectGroup: {
      type: Object,
      required: true
    },
    checkProjectCards: {
      type: Boolean,
      default: false
    },
    previewOptions: {
      type: Object,
      required: true
    }
  }
}
</script>
