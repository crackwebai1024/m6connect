<template>
  <div>
    <div>{{data.title}}</div>
    <img width="100%" height="100px" :src="data.url" alt />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
</style>