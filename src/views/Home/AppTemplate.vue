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
        :persistent="isPersistent"
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
            class="details-content grey h-fit lighten-3 min-h-full pt-3 relative"
          >
            <v-row class="align-start d-flex justify-space-between max-w-lg mx-auto pt-1 w-full">
              <slot name="content" />
            </v-row>
            <v-badge
              class="absolute left-0 ml-5 mt-5 top-0 w-fit"
              color="blue"
              offset-x="17"
              offset-y="17"
              overlap
              style="z-index: 203;"
            >
              <v-btn
                class="darken-2 grey ml-auto pa-6 white--text"
                color="white"
                depressed
                icon
                rounded
                @click="actionOverlay = !actionOverlay"
              >
                <v-icon>mdi-menu</v-icon>
              </v-btn>
              <template v-slot:badge>
                12
              </template>
            </v-badge>
            <v-overlay
              class="record-overlay"
              :value="actionOverlay"
            >
              <v-row
                class="central-content flex flex-nowrap justify-space-between max-w-container mx-auto relative top-6 transparent0 w-full"
                no-gutters
              >
                <v-col
                  class="dont-show-scroll vertical-scroll"
                  cols="4"
                >
                  <div
                    class="w-full"
                    style="height: 310px;"
                  />
                  <action-feed />
                </v-col>
              </v-row>
            </v-overlay>
          </div>
        </v-card>
        <v-badge
          class="absolute bottom-0 mb-5 mr-5 right-0 w-fit"
          color="green"
          offset-x="17"
          offset-y="17"
          overlap
          style="z-index: 203;"
        >
          <v-btn
            class="blue ml-auto pa-6 white--text"
            color="white"
            depressed
            icon
            rounded
            @click="chatOverlay = !chatOverlay"
          >
            <v-icon>mdi-message</v-icon>
          </v-btn>
          <template v-slot:badge>
            6
          </template>
        </v-badge>
        <v-overlay :value="chatOverlay" />
      </v-dialog>
    </template>
  </div>
</template>

<script>
import ActionFeed from '@/views/Home/ActionFeed'

export default {
  name: 'AppTemplate',
  components: {
    ActionFeed
  },
  props: {
    propsDialog: {
      type: Boolean,
      default: false
    },
    isPersistent: {
      type: Boolean,
      default: false
    },
    openDialog: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: false,
    chatOverlay: false,
    actionOverlay: false
  }),

  watch: {
    propsDialog(val) {
      this.dialog = val
    }
  },
  created() {
    this.dialog = this.openDialog
    this.isPersistent = this.openDialog
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
.panel {
    min-height: 300px;
}
.v-tabs-slider {
    color: #2196F3;
}
.record-overlay .v-overlay__content {
  width: 100%;
  height: 100%;
  top: 60px;
}
</style>
