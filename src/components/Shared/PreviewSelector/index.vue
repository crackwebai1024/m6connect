<template>
  <div>
    <project-record v-if="type === 'project'" :data="data"></project-record>
  </div>
</template>

<script>
import ProjectRecord from "@/components/RecordMode/ProjectRecord";

export default {
  components: {
    ProjectRecord,
  },
  props: {
    type: String,
    data: Object,
  },
};
</script>

<style lang="scss">
</style>