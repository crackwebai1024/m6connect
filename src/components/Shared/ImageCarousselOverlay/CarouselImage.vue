<template>
  <div style="height: 90vh; overflow: hidden; position: relative;">
    <div class="d-flex fill-height align-center justify-center">
      <img style="width: 80%;" :src="image.url" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      required: true,
    },
  },
};
</script>

<style scoped>
</style>

