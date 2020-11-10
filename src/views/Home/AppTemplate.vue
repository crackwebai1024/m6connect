<template>
  <div>
    <div @click="dialog = true">
      <slot name="actionbtn" />
    </div>
    <template>
      <v-dialog
        v-model="dialog"
        class="dont-show-scroll vertical-scroll"
        fullscreen
        hide-overlay
        scrollable
        transition="dialog-bottom-transition"
      >
        <v-card
          class="grey lighten-3 relative"
          tile
        >
          <div class="w-full white">
            <slot name="header" />
            <v-divider class="blue-grey lighten-5 max-w-lg mx-auto w-full" />
            <div class="align-center d-flex justify-space-between max-w-lg mx-auto py-1 w-full">
              <slot name="tabs" />
              <v-spacer />
              <slot name="btns" />
            </div>
          </div>

          <div
            class="details-content grey h-fit lighten-3 min-h-full pt-3"
          >
            <v-row class="align-start d-flex justify-space-between max-w-lg mx-auto pt-1 w-full">
              <slot name="content" />
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppTemplate',
  components: {
  },
  props: {
  },
  data: () => ({
    dialog: false
  }),
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
.spacing-tight {
  letter-spacing: 1px;
}
.links {
  transition: height 5s;
  height: 150px;
  overflow: hidden;
  -webkit-transition: height 0.5s ease;
  -moz-transition: height 0.5s ease;
  -o-transition: height 0.5s ease;
  transition: height 0.5s ease;
}
.active-tab-company {
  border-bottom: 3px solid rgb(49, 174, 220);
}
.v-dialog--scrollable {
  position: absolute;
  top: 60px;
  height: calc(100vh - 60px) !important;
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
}
.v-dialog--scrollable::-webkit-scrollbar {
  width: 0px;
}
.add-field .v-input input {
    border-bottom: 1px solid #F8F3EC;
    margin-bottom: -1px;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border: none;
}
.panel {
    min-height: 300px;
}
.v-tabs-slider {
    color: #2196F3;
}
</style>
