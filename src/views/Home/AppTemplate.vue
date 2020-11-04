<template>
    <div>
        <div @click="dialog = true">
            <slot name="actionbtn"></slot>
        </div>
        <template>
            <v-dialog
                class="vertical-scroll dont-show-scroll"
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
            >
            <v-card class="relative grey lighten-3" tile>
                <div class="w-full white">
                    <slot name="header"/>
                    <v-divider class="max-w-lg w-full mx-auto blue-grey lighten-5"></v-divider>
                    <div class="max-w-lg py-1 w-full mx-auto d-flex justify-space-between align-center">
                        <slot name="tabs"/>
                        <v-spacer></v-spacer>
                        <slot name="btns"/>
                    </div>
                </div>

                <div
                    class="details-content grey lighten-3 h-fit min-h-full pt-2"
                >
                    <v-row class="max-w-lg w-full pt-1 mx-auto d-flex justify-space-between align-start">
                        <slot name="content"></slot>
                    </v-row>
                </div>
            </v-card>
            </v-dialog>
        </template>
    </div>
</template>

<script>
export default {
  name: "AppTemplate",
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
};
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
</style>