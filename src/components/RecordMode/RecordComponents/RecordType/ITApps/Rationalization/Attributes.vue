<template>
  <v-container>
    <v-subheader class="primary rounded-t white--text">Rationalization Attributes</v-subheader>
    <v-card class="px-3">
      <v-row>
        <v-col cols="6">
          <v-select v-model="this.itemInfo.meetingNeeds" :rules="selectRules" label="Meeting customer needs" :items="['Yes', 'No']"></v-select>
        </v-col>
        <v-col cols="6">
          <v-select 
            v-model="this.itemInfo.rationalization"
            :rules="selectRules"
            label="Rationalization"
            :items="['Eliminate', 'Invest', 'Migrate', 'Tolerate']"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-input :hint="'$ ' + this.itemInfo.totalAnnualCost" persistent-hint>Total Annual Cost</v-input>
        </v-col>
        <v-col cols="6">
          <!-- <v-input :hint="this.itemInfo.estimatedUsers" persistent-hint>Estimated Users</v-input> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-input :hint="'$ ' + this.itemInfo.totalAnnualCost/this.itemInfo.estimatedUsers" persistent-hint>Ratio of Cost to User</v-input>
        </v-col>
        <v-col cols="6">
          <v-select v-model="this.itemInfo.capabilities" label="Capabilities"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select v-model="this.itemInfo.applicationValue" label="Application Value" multiple chips :items="application_value"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="itemInfo.retire"
                :rules="textRules"
                label="Retire"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="itemInfo.retire" @input="menu = false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import {items} from "@/mixins/items"
import {validations} from "@/mixins/form-validations"

export default {
  mixins: [items, validations],
  data: () => ({
    menu: false,
    application_value: [
      'Financial/Revenue',
      'Only Vendor',
      'Additional Comments',
      'Quality',
      'Regulatory/Compliance',
      'Safety/Reliability',
      'Service/Productivity'
    ],
    itemInfo: {
      meetingNeeds: null,
      rationalization: null,
      totalAnnualCost: 312540,
      estimatedUsers: 5,
      capabilities: null,
      applicationValue: null,
      retire: null
    }
  })
}
</script>

<style>

</style>