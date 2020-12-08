<template>
  <v-menu offset-y open-on-hover >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        color="primary"
        text 
        v-on="on"
      >
        View Option
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(choice, index) in choices"
        :key="index"
      >
        <v-list-item-title >
          <v-btn text @click="$emit('input', choice.value)" >
            <v-icon class="black--text" >{{ choice.icon }}</v-icon> {{ choice.text }}
          </v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>


<script>
export default {
  name: "GeneralListDropDown",
  data: () => ({
    choices: [
      { icon: 'mdi-table', text: 'Table View', value: true },
      { icon: 'mdi-arrange-bring-forward', text: 'Card View', value: false }
    ]
  })
}
</script>
