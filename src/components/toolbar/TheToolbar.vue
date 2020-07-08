<template>
  <dir>
    <v-toolbar
      class="m6_toolbar"
      dark
      flat
      height="52"
    >
      <!-- Brand image -->
      <slot name="logo">
        <v-img
          contain
          max-width="160"
          src="https://www.m6connect.com/sites/default/files/m6-home-logo.png"
        />
      </slot>

      <v-divider
        class="mx-3"
        inset
        vertical
      />
      <v-btn text>
        + Invite to M6
      </v-btn>

      <v-spacer />

      <v-toolbar-items class="align-center d-flex hidden-sm-and-down">
        <!-- comment  -->
        <v-btn
          icon
          size="20"
        >
          <v-icon>comment</v-icon>
        </v-btn>
        <!-- notification  -->
        <v-btn
          icon
          size="20"
        >
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn
          icon
          size="20"
        >
          <v-icon>view_module</v-icon>
        </v-btn>
        <!-- user  -->
        <v-btn
          icon
          size="20"
        >
          <v-avatar
            rounded
            size="36"
          >
            <v-img src="/assets/imgs/dog.png" />
          </v-avatar>
        </v-btn>
        <!-- company  -->
        <v-btn
          icon
          size="20"
        >
          <v-avatar
            rounded
            size="36"
          >
            <v-img src="/assets/imgs/company.png" />
          </v-avatar>
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-side-icon
        v-if="showSideIcon"
        class="hidden-md-and-up"
        @click="emitSideIcon"
      />
    </v-toolbar>
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
  </dir>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import colors from '@/constants/colors'

@Component({
  props: {
    pageName: {
      type: String,
      required: true
    },
    showSideIcon: {
      type: Boolean,
      default: false
    }
  }
})
export default class TheToolbar extends Vue {
  public colors = colors


  emitSideIcon() {
    this.$emit('sideIcon')
  }
}
</script>

<style lang="scss" scoped>
.m6_toolbar {
  background-color: #0277bd !important;
  .v-image {
    cursor: pointer;
  }
}
</style>

