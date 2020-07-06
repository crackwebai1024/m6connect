<template>
  <v-toolbar
    class="px-3 toolbar"
    color="#1D2947"
    dense
  >
    <v-row
      align="center"
      class="fill-height"
    >
      <v-avatar
        :color="colors.blue[400]"
        :size="30"
      >
        <span class="font-weight-medium">M6</span>
      </v-avatar>
      <p class="mb-0 ml-2">
        {{ pageName }}
      </p>
      <v-spacer />
      <v-btn
        class="m6_btn_xs"
        color="green darken-2"
        fab
      >
        <v-icon class="m6_icon_bold">
          add
        </v-icon>
      </v-btn>
    </v-row>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import colors from '@/constants/colors'

@Component({
  props: {
    pageName: {
      type: String,
      required: true
    }
  }
})
export default class TheToolbar extends Vue {
  public colors = colors

  mounted(): void {
    // eslint-disable-next-line no-console
    console.log(this.colors)
  }
}
</script>
