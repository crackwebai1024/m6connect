<template>
  <v-container>
    <v-dialog v-model="createModal" persistent max-width="600px">
      <v-card>
        <v-card-title class="blue darken-3 white--text">
          <span class="headline">Create User</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-select label="User Type" :items="['Estimated Concurrent Users', 'Estimated Users']"></v-select>
            </v-row>
            <v-row>
              <v-select label="Users"></v-select>
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
      Rationalization Users
      <v-btn
        color="indigo"
        dark
        small
        absolute
        bottom
        right
        fab
        @click="createModal = true">
          <v-icon>mdi-account-plus-outline</v-icon>
      </v-btn>
    </v-subheader>
    <v-card class="pt-5">
      <v-data-table :headers="table.headers"></v-data-table>
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
          text: 'User Type'
        },
        {
          text: 'Users'
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