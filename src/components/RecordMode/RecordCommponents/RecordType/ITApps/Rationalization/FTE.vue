<template>
  <v-container>
    <v-dialog v-model="createModal" persistent max-width="600px">
      <v-card>
        <v-card-title class="blue darken-3 white--text">
          <span class="headline">Create FTE</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-select label="FTE Type" :items="['Customer', 'Vendor']"></v-select>
            </v-row>
            <v-row>
              <v-text-field label="FTE Count"></v-text-field>
            </v-row>
            <v-row>
              <v-input persistent-hint hint="$ 0.0">FTE Costs</v-input>
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
      Rationalization FTE
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
          text: 'FTE Type'
        },
        {
          text: 'FTE Count'
        },
        {
          text: 'FTE Costs'
        },
        {
          text: 'Notes'
        },
        {
          text: 'Actions'
        }
      ]
    }
  })
}
</script>

<style>

</style>