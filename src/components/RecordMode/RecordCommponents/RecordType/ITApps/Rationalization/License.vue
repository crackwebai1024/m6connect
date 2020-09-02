<template>
  <v-container>
    <v-dialog v-model="createModal" persistent max-width="600px">
      <v-card>
        <v-card-title class="blue darken-3 white--text">
          <span class="headline">Create License</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-select label="Purchase Type" :items="options.purchase_type"></v-select>
            </v-row>
            <v-row>
              <v-select label="License Type" :items="options.license_type"></v-select>
            </v-row>
            <v-row>
              <v-text-field label="Number of Licenses"></v-text-field>
            </v-row>
            <v-row>
              <v-input persistent-hint hint="$ 0.00">Cost per License</v-input> 
              <v-input persistent-hint hint="$ 0.00">Total Licensing Costing</v-input> 
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
      Rationalization License
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
    <v-card class="pt-5">
      <v-data-table :headers="table.headers">

      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    createModal: false,
    table: {
      headers: [
        {
          text: 'Purchase Type'
        },
        {
          text: 'License Type'
        },
        {
          text: 'Number of Licenses'
        },
        {
          text: 'Cost per License'
        },
        {
          text: 'Total Licesing Cost'
        },
        {
          text: 'Notes'
        },
        {
          text: 'Actions'
        },
      ]
    },
    options: {
      purchase_type: ['Lease', 'Other', 'Owned', 'SaaS', 'Subscription'],
      license_type: ['Concurrent License', 'Enterprise License']
    }
  })
}
</script>

<style>

</style>