<template>
  <v-layout column>
    <v-img
      :aspect-ratio="16 / 9"
      class="sidebar-image"
      max-width="100%"
      src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
    >
      <v-layout
        align-end
        fill-height
        ma-0
      >
        <v-flex
          class="lightbox white--text"
          pl-2
          pt-2
          xs12
        >
          <v-menu
            offset-y
            open-on-hover
            top
          >
            <template v-slot:activator="{ on }">
              <p
                class="subheading text-truncate"
                v-on="on"
              >
                {{ $h.dg(capitalPlan, 'name', 'N/A') }}
              </p>
            </template>

            <div class="pa-2 white">
              {{ $h.dg(capitalPlan, 'name', 'N/A') }}
            </div>
          </v-menu>

          <v-layout ma-0>
            <v-flex xs12>
              <p class="body-2 ma-0 text-truncate">
                {{ projectsCount }}
              </p>
              <span class="caption">Projects Count</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-img>

    <div class="text-xs-center">
      <v-btn
        color="blue"
        dark
        @click="showProjects"
      >
        Edit Plan
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import DefaultCapital from '../DefaultCapital'
import Eventbus from '../../../../Eventbus'

export default {
  extends: DefaultCapital,
  methods: {
    showProjects() {
      Eventbus.$emit('show-projects-capital-plan', true)
    }
  }
}
</script>

<style lang="scss">
.sidebar-image {
  .lightbox {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .v-responsive__content {
    max-width: 100%;
  }
}
</style>
