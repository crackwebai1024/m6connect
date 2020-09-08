<template>
  <div style="height: 100%;">
    <record-container :record_data="data"></record-container>
  </div>
</template>

<script>
import RecordContainer from "@/components/RecordMode/RecordContainer";

export default {
  components: {
    RecordContainer,
  },
  props: {
    data: Object,
  },
};
</script>

<style lang="scss">
</style>