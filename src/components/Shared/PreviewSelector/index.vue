<template>
  <div>
    <project-preview v-if="type === 'project'" :data="data"></project-preview>
    <image-preview v-if="type === 'image'" :data="data"></image-preview>
  </div>
</template>

<script>
import ProjectPreview from "@/components/PreviewMode/ProjectPreview";
import ImagePreview from "@/components/PreviewMode/ImagePreview";

export default {
  components: {
    ProjectPreview,
    ImagePreview,
  },
  props: {
    type: String,
    data: Object,
  },
};
</script>

<style lang="scss">
</style>