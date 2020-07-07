<template>
  <v-card
    class="align-center d-flex flex-column hit justify-center mb-4"
    height="13rem"
    light
    ripple
    width="100%"
  >
    <div>
      <v-avatar
        :color="colors.blue[600]"
        rounded
        :size="60"
      >
        <v-icon
          color="#fff"
          :size="28"
        >
          add
        </v-icon>
      </v-avatar>
    </div>
    <span class="mt-2">Add new</span>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import colors from '@/constants/colors'

@Component
export default class AddItemButton extends Vue {
  public colors = colors
}
</script>
