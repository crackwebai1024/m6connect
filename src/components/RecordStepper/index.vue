<template>
  <div>
    <v-dialog
      v-model="dialog"
      class="dont-show-scroll vertical-scroll"
      fullscreen
      hide-overlay
      persistent
      scrollable
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-text>
          <v-stepper v-model="stepperStep">
            <v-stepper-header>
              <template v-for="(tab, i) in filteredTabList" >
                <v-stepper-step
                  :complete="stepperStep > i"
                  :key="`stepper-step-${i}`"
                  :step="i"
                >
                  {{tab.title}}
                </v-stepper-step>
                <v-divider v-if="i < app.tabs.length - 1" :key="`stepper-divider-${i}`" />
              </template>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content v-for="(tab, i) in filteredTabList" :key="`stepper-content-${i}`" :step="i">
                <v-card class="pa-2" style="height: 60vh" >
                  <form-show-generator
                    inheritedEditMode
                    :fields="$h.dg(tab, 'panels.0.fields', [])"
                    :panel="$h.dg(tab, 'panels.0', [])"
                    stepperShow
                    :activateStepperSave=" i == stepperStep ? activateSave : false"
                    :filledInFields="false"
                    :showOuterLabels="false"
                    @closing="goingToNextStep"
                  />
                </v-card>

                <div class="flex-center pt-2" >
                  <v-btn text @click="stepperStep = i - 1; finished = false" v-show="stepperStep > 0" >
                    back
                  </v-btn>

                  <v-btn
                    v-if="!finished"
                    color="primary"
                    outlined
                    @click="continueToNextStep(i, tab)"
                  >
                    Continue <v-icon>mdi-arrow-right-thick</v-icon>
                  </v-btn>

                  <v-btn
                    v-else
                    color="green darken-2"
                    outlined
                    class="white--text"
                    @click="emptySave"
                  >
                    Save
                  </v-btn>
                </div>
              </v-stepper-content>

            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FormShowGenerator from '@/components/AppBuilder/Form/FormShowGenerator.vue'

export default {
  data: () => ({
    dialog: true,
    e1: 1,
    stepperStep: 0,
    activateSave: false,
    finished: false
  }),

  components: {
    FormShowGenerator
  },

  computed: {
    ...mapState('AppBuilder', {
      app: 'app',
    }),

    filteredTabList() {
      return this.$h.dg(this.app, 'tabs', []).filter( t => t.title.toLowerCase() != "home" )
    }
  },

  methods: {
    ...mapMutations('SnackBarNotif', {
      notifDanger: 'notifDanger',
      notifSuccess: 'notifSuccess'
    }),
    emptySave() {
      this.notifSuccess('Saved!')
    },
    continueToNextStep(i,tab) {
      if(i === this.stepperStep) this.activateSave = true
    },
    goingToNextStep() {
      if( this.stepperStep < this.filteredTabList.length - 1) {
        this.stepperStep = this.stepperStep + 1
      } else {
        this.finished = true
      }
      this.activateSave = false
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
  display: -webkit-flex;
  display: -ms-flexbox;
  justify-content: center;
}
</style>