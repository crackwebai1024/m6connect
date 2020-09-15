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
            <span class="headline">{{ titleDialog }}</span>
            <v-btn icon color="white" @click="deleteItem" v-if="!dialogMode">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-select 
                  label="Cost Category" 
                  :items="options.cost_category"
                  v-model="itemInfo.costCategory"
                  :rules="selectRules"
                ></v-select>
              </v-row>
              <v-row>
                <v-select 
                  label="Cost Type" 
                  :items="options.cost_type"
                  v-model="itemInfo.costType"
                  :rules="selectRules"
                ></v-select>
              </v-row>
              <v-row>
                <v-select 
                  label="Cost Owner" 
                  :items="options.cost_owner"
                  v-model="itemInfo.costOwner"
                  :rules="selectRules"
                ></v-select>
              </v-row>
              <v-row>
                <v-select 
                  label="Period" 
                  :items="options.period"
                  v-model="itemInfo.period"
                  :rules="selectRules"
                ></v-select>
              </v-row>
              <v-row>
                <v-input persistent-hint readonly :hint="'$ ' +  itemInfo.cost.toString()">Cost</v-input> 
              </v-row>
              <v-row>
                <v-textarea v-model="itemInfo.notes" label="Notes"></v-textarea>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeDialog">Close</v-btn>
            <v-btn color="primary" :disabled="!valid" @click="clickAction">{{ titleAction }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-subheader style="position:relative" class="rounded-t primary white--text">
      Rationalization Costs
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
import {items} from "@/mixins/items"
import {validations} from "@/mixins/form-validations"

export default {
  name: "Costs",
  mixins: [items, validations],  
  data: () => ({
    isHover: false,
    itemsName: 'Costs',
    itemInfo: {
      costCategory: null,
      costType: null,
      costOwner: null,
      period: null,
      cost: 0,
      notes: null
    },
    table: {
      headers: [
        {
          text: 'Cost Category',
          value: 'costCategory'
        },
        {
          text: 'Cost Type',
          value: 'costType'
        },
        {
          text: 'Cost Owner',
          value: 'costOwner'
        },
        {
          text: 'Period',
          value: 'period'
        },
        {
          text: 'Cost',
          value: 'cost'
        },
        {
          text: 'Notes',
          value: 'notes'
        },
        {
          text: 'Actions',
          value: 'actions'
        },
      ]
    },
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