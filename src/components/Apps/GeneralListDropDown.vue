<template>
  <v-menu
    offset-y
    open-on-hover
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        color="primary"
        class="text-capitalize"
        text
        v-on="on"
      >
        {{ currentChoice }}
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(choice, index) in choices"
        :key="index"
      >
        <v-list-item-title>
          <v-btn
            text
            @click="pickingView(choice)"
          >
            <v-icon class="black--text">
              {{ choice.icon }}
            </v-icon> {{ choice.text }}
          </v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>


<script>
export default {
  name: 'GeneralListDropDown',
  data: () => ({
    currentChoice: 'Card View',
    choices: [
      { icon: 'mdi-table', text: 'Table View', value: true },
      { icon: 'mdi-arrange-bring-forward', text: 'Card View', value: false }
    ]
  }),
  methods: {
    pickingView(choice) {
      this.currentChoice = choice.text
      this.$emit('input', choice.value)
    }
  }
}
</script>
