<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    left
    offset-y
    :value="showing"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        :color="filtering ? 'amber' : 'primary'"
        dark
        v-on="on"
        @click="loadFilters"
      >
        Filters {{ counter ? '( ' + counter + ' )' : '' }}

        <v-icon
          dark
          right
        >
          mdi-filter-menu
        </v-icon>
      </v-btn>
    </template>

    <v-row
      class="pa-3 white"
      column
    >
      <v-row>
        <v-btn
          v-show="filtering"
          class="ma-0 mb-2"
          color="warning"
          @click="clearFilters"
        >
          Clear Filters
        </v-btn>

        <v-spacer />

        <v-btn
          v-show="counter"
          class="ma-0 mb-2"
          color="success"
          @click="applyFilters"
        >
          Apply
        </v-btn>
      </v-row>

      <v-col>
        <v-select
          v-model="campusOption"
          clearable
          item-text="name"
          :items="items.campusOptions"
          label="Campus"
          return-object
        />
      </v-col>

      <v-col>
        <v-select
          v-model="pmOption"
          clearable
          item-text="label"
          :items="items.pmOptions"
          label="Project Manager"
          return-object
        />
      </v-col>

      <v-col v-if="!isPlanned">
        <v-select
          v-model="searchOption"
          chips
          clearable
          deletable-chips
          :items="items.searchOptions"
          label="Status"
          multiple
        />
      </v-col>
    </v-row>
  </v-menu>
</template>

<script>
import { db } from '@/utils/Firebase'

export default {
  name: 'ListFiltering',

  props: {
    defaultFiltersValues: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    loaded: false,
    filtersChanged: false,
    pmOption: {},
    campusOption: {},
    searchOption: [],
    showing: false
  }),

  computed: {
    isPlanned() {
      return this.$route.name === 'cpm.forecasting.index'
    },
    counter() {
      let counter = 0
      if (this.pmOption !== 'All') counter++
      if (this.campusOption !== 'All') counter++
      if (this.searchOption.length) counter++
      return counter
    },
    filtering() {
      return (
        this.pmOption !== 'All' ||
        this.campusOption !== 'All' ||
        this.searchOption.length
      )
    }
  },

  watch: {
    filter(newVal) {
      this.$emit('filtered', newVal)
    },

    filtering(v) {
      if (!v) {
        this.clearFilters()
      }
    }
  },

  mounted() {
    db.collection('m6user')
      .doc(window.Drupal.settings.m6_platform.uid)
      .collection('search')
      .doc(this.isPlanned ? 'planned' : 'projects')
      .get()
      .then(res => {
        const data = res.data()

        this.campusOption = this.$h.dg(data, 'campusOption', 'All')
        this.pmOption = this.$h.dg(data, 'pmOption', 'All')

        let status = this.$h.dg(data, 'searchOption', [])

        if (typeof status === 'string') {
          status = [status]
        }

        this.searchOption = status.filter(f => f !== 'All')

        this.$emit('filtered', {
          pmOption: this.pmOption,
          campusOption: this.campusOption,
          searchOption: this.searchOption
        })
      })
  },

  methods: {
    clearFilters() {
      this.campusOption = 'All'
      this.pmOption = 'All'
      this.searchOption = []
      this.applyFilters()
    },
    resizeMenu() {
      for (let index = 0; index < 10; index++) {
        this.$refs.menu.updateDimensions()
      }
    },
    applyFilters() {
      const { pmOption, campusOption, searchOption } = this

      db.collection('m6user')
        .doc(window.Drupal.settings.m6_platform.uid)
        .collection('search')
        .doc(this.isPlanned ? 'planned' : 'projects')
        .set({
          pmOption: pmOption || 'All',
          campusOption: campusOption || 'All',
          searchOption: searchOption || []
        })
        .then(() => {
          this.$emit('filtered', { pmOption, campusOption, searchOption })
          this.showing = false
        })
    },
    loadFilters() {
      db.collection('m6user')
        .doc(window.Drupal.settings.m6_platform.uid)
        .collection('search')
        .doc(this.isPlanned ? 'planned' : 'projects')
        .get()
        .then(snapshot => {
          const data = snapshot.data()
          this.campusOption = data.campusOption || 'All'
          this.pmOption = data.pmOption || 'All'
          this.searchOption = data.searchOption || []
          this.showing = true
        })
    }
  }
}
</script>
