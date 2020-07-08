<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        class="mr-6 rounded-sm"
        :color="colors.blue[600]"
        large
        :width="width"
        v-on="on"
      >
        <div class="align-center d-flex flex-grow-1 justify-space-between">
          <span class="mr-12">Search</span>
          <v-icon>filter_list</v-icon>
        </div>
      </v-btn>
    </template>
    <v-list
      class="mt-2"
      color="#fff"
      :light="true"
      :width="width"
    >
      <v-list-item>
        <v-select
          expand
          :items="['test']"
          label="Regios"
          :light="true"
        />
      </v-list-item>
      <v-list-item>
        <v-select
          expand
          :items="['test']"
          label="Diversity Contractor Credentials"
          :light="true"
        />
      </v-list-item>
      <v-list-item>
        <v-select
          expand
          :items="['test']"
          label="Company Types"
          :light="true"
        />
      </v-list-item>
      <v-list-item>
        <v-select
          expand
          :items="['test']"
          label="Company Credentials"
          :light="true"
        />
      </v-list-item>
      <v-list-item>
        <v-select
          expand
          :items="['test']"
          label="Projects"
          :light="true"
        />
      </v-list-item>
      <v-list-item>
        <v-select
          expand
          :items="['test']"
          label="Project Size Capable Of"
          :light="true"
        />
      </v-list-item>
      <v-list-item>
        <v-select
          expand
          :items="['test']"
          label="Products & Services"
          :light="true"
        />
      </v-list-item>
      <v-list-item>
        <v-select
          expand
          :items="['test']"
          label="NAICs Code(s)"
          :light="true"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import colors from '@/constants/colors'

@Component
export default class SearchDropdown extends Vue {
  colors = colors

  width = 400
}
</script>
