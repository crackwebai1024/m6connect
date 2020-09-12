<template>
  <v-container @mouseenter="isHover = true" @mouseleave="isHover = false">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form
        ref="form"
        v-model="valid"
        class="white"
      >
        <v-card>
          <v-card-title class="blue darken-3 white--text d-flex justify-space-between">
            <span class="headline">Create Governance</span>
            <v-btn icon color="white" @click="deleteItem" v-if="!dialogMode">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-select 
                  v-model="itemInfo.respDivision" 
                  :rules="selectRules" 
                  label="Responsible Division" 
                  :items="options.resp_division"
                ></v-select>
              </v-row>
              <v-row>
                <v-select 
                  v-model="itemInfo.respComitte" 
                  :rules="selectRules" label="Responsible Comitee" 
                  :items="options.resp_comittee"
                ></v-select>
              </v-row>
              <v-row>
                <v-select 
                  v-model="itemInfo.respManager" 
                  :rules="selectRules" label="Responsible Manager" 
                  :items="options.resp_manager"
                ></v-select>
              </v-row>
              <v-row>
                <v-select 
                  v-model="itemInfo.respVpDir" 
                  :rules="selectRules" label="Responsible VP/Dir" 
                  :items="options.resp_dir"
                ></v-select>
              </v-row>
              <v-row>
                <v-select 
                  v-model="itemInfo.firstContactGroup" 
                  :rules="selectRules" label="First Contact Group" 
                  :items="options.contact_group"
                ></v-select>
              </v-row>
              <v-row>
                <v-text-field 
                  v-model="itemInfo.primaryCustomerGroup" 
                  :rules="textRules" label="Primary Customer Group"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field 
                  v-model="itemInfo.daysReplace" 
                  :rules="textRules" 
                  label="Estimated Days to Replace"
                ></v-text-field>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeDialog">Close</v-btn>
            <v-btn
              :disabled="!valid"
              text
              color="primary" 
              @click="clickAction"
            >{{ titleAction }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
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
        @click="dialog = true, dialogMode = true">
          <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-subheader>
    
    <v-card class="pt-5">
      <v-data-table 
        :headers="table.headers"
        :items="items"
        :single-select="singleSelect"
        item-key="name"
        class="elevation-0"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            color="blue lighten-1"
            @click="showUpdateDialog(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import {items} from "@/mixins/items";
import {validations} from "@/mixins/form-validations"

export default {
  mixins: [items, validations],
  data: () => ({
    isHover: false,
    createModal: false,
    itemInfo: {
      respDivision: null,
      respComitte: null,
      respManager: null,
      respVpDir: null,
      firstContactGroup: null,
      primaryCustomerGroup: null,
      daysReplace: null,
    },
    table: {
      headers: [
        {
          text: 'Responsible Division',
          value: 'respDivision'
        },
        {
          text: 'Responsible Comittee',
          value: 'respComitte'
        },
        {
          text: 'Responsible Manager',
          value: 'respManager'
        },
        {
          text: 'Responsible VP/Dir',
          value: 'respVpDir'
        },
        {
          text: 'First Contact Group',
          value: 'firstContactGroup'
        },
        {
          text: 'Primary Customer Group',
          value: 'primaryCustomerGroup'
        },
        {
          text: 'Estimated days to Replace',
          value: 'daysReplace'
        },
        {
          text: 'Actions',
          value: 'actions'
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