<template>
  <div>
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      max-width="290px"
      min-width="290px"
      offset-y
      transition="scale-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          outlined
          filled
          v-model="dateFormatted"
          v-bind="attrs"
          hint="MM/DD/YYYY format"
          label="Date"
          persistent-hint
          prepend-icon="mdi-calendar"
          v-on="on"
          @blur="date = parseDate(dateFormatted)"
        />
      </template>
      <v-date-picker
        v-model="date"
        no-title
        @input="menu1 = false"
      />
    </v-menu>
  </div>
</template>

<script>
const today = new Date().toISOString().substr(0, 10)
export default {
  props: {
    value: {
      type: String,
      default: today
    }
  },

  data: vm => ({
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false
  }),

  computed: {
    computedDateFormatted() {
      const formatedDate = this.formatDate(this.date)
      console.log('formatedDate')
      console.log(formatedDate)
      this.$emit('input', formatedDate)
      return formatedDate
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
    value(val) {
      this.date = val
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
