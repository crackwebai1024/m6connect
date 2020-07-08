<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        class="rounded-sm"
        :color="colors.blue[600]"
        large
        :width="width"
        v-on="on"
      >
        <div class="align-center d-flex flex-grow-1 justify-space-between">
          <span class="mr-12">Grid</span>
          <v-icon>grid_on</v-icon>
        </div>
      </v-btn>
    </template>
    <v-list
      class="mt-2"
      color="#fff"
      :light="true"
      :width="width"
    />
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import colors from '@/constants/colors'

@Component
export default class LayoutDropdown extends Vue {
  colors = colors

  width = 200
}
</script>

<style scoped></style>
