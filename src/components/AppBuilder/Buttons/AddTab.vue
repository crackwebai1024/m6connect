<template>
  <v-btn
    class="green lighten-2 ml-6 pa-0 white--text"
    icon
    @click="addNewTab"
  >
    <v-icon size="23">
      mdi-plus
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'AddTab',
  methods: {
    addNewTab() {
      this.$emit('addNewTab')
    }
  }
}
</script>
