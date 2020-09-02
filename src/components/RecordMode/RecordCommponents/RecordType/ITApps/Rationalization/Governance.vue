<template>
  <v-container @mouseenter="isHover = true" @mouseleave="isHover = false">
    <v-dialog v-model="createModal" persistent max-width="600px">
      <v-card>
        <v-card-title class="blue darken-3 white--text">
          <span class="headline">Create Governance</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-select label="Responsible Division" :items="options.resp_division"></v-select>
            </v-row>
            <v-row>
              <v-select label="Responsible Comitee" :items="options.resp_comittee"></v-select>
            </v-row>
            <v-row>
              <v-select label="Responsible Manager" :items="options.resp_manager"></v-select>
            </v-row>
            <v-row>
              <v-select label="Responsible VP/Dir" :items="options.resp_dir"></v-select>
            </v-row>
            <v-row>
              <v-select label="First Contact Group" :items="options.contact_group"></v-select>
            </v-row>
            <v-row>
              <v-text-field label="Primary Customer Group"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field label="Estimated Days to Replace"></v-text-field>
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
      Rationalization Governance
      <v-btn
        :color="isHover ? 'orange' : 'blue'"
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
      <v-data-table :headers="table.headers"></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    isHover: false,
    createModal: false,
    table: {
      headers: [
        {
          text: 'Responsible Division',
          value: 'name'
        },
        {
          text: 'Responsible Comittee',
          value: 'a'
        },
        {
          text: 'Responsible Manager',
          value: 'b'
        },
        {
          text: 'Responsible VP/Dir',
          value: 'eee'
        },
        {
          text: 'First Contact Group',
          value: 'dddd'
        },
        {
          text: 'Primary Customer Group',
          value: 'ss'
        },
        {
          text: 'Estimated days to Replace',
          value: 'aa'
        },
        {
          text: 'Actions',
          value: 'namebb'
        },
      ]
    },
    options: {
      resp_division: [
        'Ambulatory Community',
        'Ancillary Services',
        'Enterprise Solutions',
        'Inpatient Systems',
        'Revenue Management & ERM'
      ],
      resp_comittee: [
        'Cardiology',
        'Clinical Imaging',
        'CNO Council',
        'Data Governance',
        'Document Imaging',
        'Emergency Department (ED) IS',
        'Enterprise Analytics',
        'Enterprise Resource Management (ERM)',
        'Health Information Exchange (HIE)',
        'Home Health/Hospice',
        'HR/Workforce',
        'Information Security Advisory Comittee',
        'Inpatient Pharmacy (IP)',
        'IS Ambulatory Electronic Health Record (AEHR)',
      ],
      resp_manager: [
        'Amy Betterton',
        'Brad Odenkirk',
        'Danielle Noe-griego'
      ],
      resp_dir: [
        'Bob Marzullo',
        'Debbie Coates',
        'Debbie Ochs'
      ],
      contact_group: [
        'ACCESS',
        'AMBULATORY COMMUNITY SYSTEMS SUPPORT'
      ]
    }
  })
}
</script>

<style>

</style>