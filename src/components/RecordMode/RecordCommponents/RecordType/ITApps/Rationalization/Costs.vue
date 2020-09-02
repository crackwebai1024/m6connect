<template>
  <v-container>
    <v-dialog v-model="createModal" persistent max-width="600px">
      <v-card>
        <v-card-title class="blue darken-3 white--text">
          <span class="headline">Create Costs</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-select label="Cost Category" :items="options.cost_category"></v-select>
            </v-row>
            <v-row>
              <v-select label="Cost Type" :items="options.cost_type"></v-select>
            </v-row>
            <v-row>
              <v-select label="Cost Owner" :items="options.cost_owner"></v-select>
            </v-row>
            <v-row>
              <v-select label="Period" :items="options.period"></v-select>
            </v-row>
            <v-row>
              <v-input persistent-hint hint="$ 0.00">Cost</v-input> 
            </v-row>
            <v-row>
              <v-textarea label="Notes"></v-textarea>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="createModal = false">Close</v-btn>
          <v-btn color="primary" @click="createModal = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-subheader style="position:relative" class="rounded-t primary white--text">
      Rationalization Costs
      <v-btn
        color="indigo"
        dark
        small
        absolute
        bottom
        right
        fab
        @click="createModal = true">
          <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-subheader>
    <v-card>
      <v-data-table>

      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    createModal: false,
    options: {
      cost_category: ['Initial Capital', 'Initial Operating', 'One-time Capital'],
      cost_type: ['Consulting', 'Contract Staffing'],
      cost_owner: ['Customer', 'IT', 'Other'],
      period: ['Annual', 'Annual pd Monthly', 'Annual pd Quarterly']
    }
  })
}
</script>

<style>

</style>