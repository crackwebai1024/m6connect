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
            <span class="headline white--text">{{ titleDialog }}</span>
            <v-btn icon color="white" @click="deleteItem" v-if="!dialogMode">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="form-labels px-16">
            <v-container>
              <v-row>
                <v-select 
                  label="FTE Type"
                  v-model="itemInfo.fteType"
                  :rules="selectRules"
                  :items="['Customer', 'Vendor']"
                ></v-select>
              </v-row>
              <v-row>
                <v-text-field 
                  label="FTE Count"
                  v-model="itemInfo.fteCount"
                  :rules="textRules"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-input persistent-hint readonly :hint="'$ ' + itemInfo.fteCosts.toString()">FTE Costs</v-input>
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
    <v-subheader class="relative rounded-t primary white--text">
      Rationalization FTE
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
  name: "FTE",
  mixins: [items, validations],  
  data: () => ({
    isHover: false,
    itemsName: 'FTE',
    itemInfo: {
      fteType: null,
      fteCount: null,
      fteCosts: 0,
      notes: null,
    },
    table: {
      headers: [
        {
          text: 'FTE Type',
          value: 'fteType'
        },
        {
          text: 'FTE Count',
          value: 'fteCount'
        },
        {
          text: 'FTE Costs',
          value: 'fteCosts'
        },
        {
          text: 'Notes',
          value: 'notes'
        },
        {
          text: 'Actions',
          value: 'actions'
        }
      ]
    }
  })
}
</script>

<style>

</style>