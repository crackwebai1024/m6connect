<template>
  <div>
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
    type: String,
    data: Object,
  },
};
</script>

<style lang="scss">
</style>