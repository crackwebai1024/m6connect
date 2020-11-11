<template>
  <v-dialog
    v-model="show"
    persistent
    width="500"
  >
    <v-card>
      <v-card-title class="headline white px-6 py-4">
        <span class="grey--text text--darken-1">
          Search in {{ where }}
        </span>
      </v-card-title>
      <v-divider class="grey lighten-3" />

      <v-divider class="grey lighten-3" />
      <v-card-text>
        <v-form
          ref="form"
        >
          <v-text-field
            class="mt-6 rounded white search-tag"
            ref="searchTxt"
            v-model="searchTxt"
            :label="where === 'spendings' ? spendingsLabel : commitmentsLabel"
            :rules="[
              v => !!v || 'Please fill this in. It is required to do the search'
            ]"
            @keyup.enter="search"
          />
        </v-form>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          v-if="previousSearch"
          color="red"
          @click.prevent="clear"
        >
          Clear
        </v-btn>
        <v-btn
          color="gray"
          @click.prevent="cancel"
        >
          Close
        </v-btn>
        <v-btn
          color="primary"
          @click.prevent="search"
        >
          Search
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    where: { type: String, default: '' },
    previousSearch: { type: String, default: '' }
  },
  data() {
    return {
      spendingsLabel: 'Search by Invoice number',
      commitmentsLabel: 'Search by PO Number',
      searchTxt: '',
      showLoading: false
    }
  },
  mounted() {
    if (this.previousSearch)
    // if not empty or undefined
    {
      this.searchTxt = this.previousSearch
    }

    this.$nextTick(this.$refs.searchTxt.focus)
  },
  methods: {
    clear() {
      this.$emit('clear')
      this.searchTxt = ''
    },
    cancel() {
      this.searchTxt = ''
      this.$emit('close')
    },
    search() {
      const isValid = this.$refs.form.validate()
      if (!isValid) {
        this.$snotify.error('Please fill in the search box', 'Error')
      } else {
        this.$emit('searching', this.searchTxt)
      }
    }
  }
}
</script>
<style>
.search-tag .v-label {
    background: #fff !important;
    padding: 0 !important;
    border-radius: 0 !important;
}
</style>

