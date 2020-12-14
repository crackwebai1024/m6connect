<template>
  <v-card
    class="mt-5 pa-3"
    height="500px"
  >
    <project-social-media
      class="pa-0"
      :read-only="true"
    />
  </v-card>
</template>

<script>
import ProjectSocialMedia from '@/views/Home/ProjectSocialMedia'

export default {
  name: 'RecordPostListPreview',
  components: {
    ProjectSocialMedia
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
  }),
  computed: {
  }
}
</script>
