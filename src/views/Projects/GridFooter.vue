<template>
  <v-row
    align="center"
    class="mt-2"
    justify="end"
  >
    <span class="grey--text">Items per page</span>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="grey"
          dark
          text
          v-on="on"
        >
          {{ itemsPerPage }}
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(number, index) in options.itemsPerPageOptions"
          :key="index"
          @click="updateItemsPerPage(number)"
        >
          <v-list-item-title>{{ number }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <span class="grey--text">
      {{ page > 1 ? lastItem - itemsPerPage : page }} - {{ lastItem }} of {{ numberOfPages }}
    </span>
    <v-btn
      class="px-2"
      color="grey"
      dark
      text
      @click="formerPage"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn
      class="px-2"
      color="grey"
      dark
      text
      @click="nextPage"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
export default {
  name: 'GridFooter',
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    numberOfPages: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    itemsPerPage: 8,
    page: 1
  }),
  computed: {
    lastItem() {
      return (this.itemsPerPage * this.page) + (this.page - 1)
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) {
        this.page += 1
        this.updatePage()
      }
    },
    formerPage() {
      if (this.page - 1 >= 1) {
        this.page -= 1
        this.updatePage()
      }
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
    updatePage() {
      this.$emit('updatePage', this.page)
    }
  }
}
</script>

<style scoped>
span {
    font-size: 14px;
}
</style>
