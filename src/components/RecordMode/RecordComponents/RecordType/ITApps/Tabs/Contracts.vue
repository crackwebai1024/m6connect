<template>
  <v-container class="px-0 py-0 mt-5">
    <template v-if="items.length === 0">
      <v-container :class="baseColor + ' rounded-lg px-0 py-10 d-flex justify-center align-center flex-column'">
        <p class="white--text text-h5">There are no {{ itemsName }}</p>
        <v-divider class="mt-0 white w-full"></v-divider>
        <a 
          class="add-item-btn d-flex justify-center align-center py-3 white--text text-body-2 border-t-1 border"
          @click="dialog = true, dialogMode = true"
        >
          ADD NEW <v-icon class="white--text">mdi-plus</v-icon>
        </a>
        <v-divider class="mb-3 white w-full"></v-divider>
      </v-container>
    </template>
    <template v-else>
      <v-card>
        <div :class="baseColor + ' card rounded-0 rounded-t-sm px-3 py-4 text-body-1 white--text capitalize'">{{ itemsName }}</div>
        <v-btn 
          :class="baseColor + ' btn-circle-add-item'" 
          fab small dark
          @click="dialog = true, dialogMode = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <div class="contracts-container pa-3">
          <v-data-table
            :headers="headers"
            :items="items"
            :single-select="singleSelect"
            item-key="name"
            class="elevation-0"
          >
            <template v-slot:item.inflatorValue="{ item }">
              <div class="d-flex justify-space-between">
                <p>{{ item.inflatorValue }}</p>
                <v-icon
                  small
                  class="mr-2"
                  color="blue lighten-1"
                  @click="showUpdateDialog(item)"
                >
                  mdi-pencil
                </v-icon>
              </div>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </template>

    <v-dialog v-model="dialog" persistent max-width="1000px">
      <v-form ref="form" v-model="valid" class="white">
        <v-card-title :class="baseColor + ' white--text d-flex justify-space-between'">
          <span class="headline capitalize white--text">{{ titleDialog }}</span>
          <template v-if="dialogMode">
            <v-btn
              color="purple darken-3"
              class="text-none white--text"
              @click="onButtonClick"
            >
              UPLOAD FILES
            </v-btn>
            <input
              multiple
              ref="uploader"
              class="d-none"
              type="file"
              accept="image/*"
              @change="onFileChanged"
            >
          </template>
          <v-btn icon color="white" @click="deleteItem" v-if="!dialogMode">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-16 py-10">
          <v-container>
            <v-row>
              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="itemInfo.number"
                  :rules="nameRules"
                  label="Contract Number" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="itemInfo.name"
                  :rules="nameRules"
                  label="Contract Name" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-select
                  v-model="itemInfo.status"
                  :items="['Active', 'Inactive']"
                  :rules="selectRules"
                  :color="baseColor"
                  label="Status"
                ></v-select>
              </v-col>
              <v-col cols="6" class="py-0">
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
                      v-model="itemInfo.startDate"
                      :rules="textRules"
                      label="Contract Term Start Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="itemInfo.startDate" @input="menu = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="itemInfo.endDate"
                      :rules="textRules"
                      label="Contract Termination Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="itemInfo.endDate" @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="4" class="py-0">
                <v-text-field 
                  v-model="itemInfo.termLength"
                  :rules="quantityRules"
                  :color="baseColor"
                  type="number"
                  label="Term Length" 
                ></v-text-field>
              </v-col>
              <v-col cols="2" class="py-0">
                <v-select
                  v-model="itemInfo.termUnit"
                  :items="['Days','Months','Years']"
                  :rules="selectRules"
                  :color="baseColor"
                  label="Term Unit"
                ></v-select>
              </v-col>

              <v-col cols="6" class="py-0">
                <v-text-field 
                  v-model="itemInfo.termPeriod"
                  :rules="quantityRules"
                  :color="baseColor"
                  type="number"
                  label="Term Notice Period" 
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="itemInfo.decisionDate"
                      :rules="textRules"
                      label="Critical Decision Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="itemInfo.decisionDate" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="itemInfo.inflator"
                  :rules="nameRules"
                  label="Capped Inflator" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <v-text-field
                  v-model="itemInfo.inflatorValue"
                  :rules="nameRules"
                  label="Capped Inflator Value" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" class="py-0">
                <p class="text-center text-h6 mt-8 mb-0">Attachments</p>
                <v-data-table
                  :headers="fileHeaders"
                  :items="itemInfo.files"
                  :single-select="singleSelect"
                  item-key="name"
                  class="elevation-0"
                >
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="baseColor" text @click="closeDialog">Cancel</v-btn>
          <v-btn :disabled="!valid" :color="baseColor" text @click="clickAction">{{ titleAction }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-dialog>
  </v-container>
</template>
<script>
import {items} from "@/mixins/items";
import {validations} from "@/mixins/form-validations"

export default {
  name: "Contracts",
  mixins: [items, validations],
  data: () => ({
    menu: false,
    menu1: false,
    menu2: false,
    baseColor: 'purple darken-1',
    itemsName: 'contracts',
    itemInfo: {
      number: null, // Contract Number
      name: null, // Contract Name
      status: null, // Status
      startDate: null, // Contract Term Start Date
      endDate: null, // Contrac Termination Date
      termLength: null, // Term Length
      termUnit: null, // Term Unit
      termPeriod: null, // Term Notice Period
      decisionDate: null, //Critical Decision Date
      inflator: null, // Capped Inflator
      inflatorValue: null, //Capped Inflator Value
      files: []
    },
    singleSelect: false,
    headers: [
      { text: 'Contract Number', value: 'number' },
      { text: 'Contract Name', value: 'name' },
      { text: 'Status', value: 'status' },
      { text: 'Contract Term Start Date', value: 'startDate' },
      { text: 'Contrac Termination Date', value: 'endDate' },
      { text: 'Term Length', value: 'termLength' },
      { text: 'Term Unit', value: 'termUnit' },
      { text: 'Term Notice Period', value: 'termPeriod' },
      { text: 'Critical Decision Date', value: 'decisionDate' },
      { text: 'Capped Inflator', value: 'inflator' },
      { text: 'Capped Inflator Value', value: 'inflatorValue' },
    ],
  }),
  methods: {
  }
};
</script>
<style lang="scss">
.v-divider, .add-item-btn {
  width: 100%;
  cursor: pointer;
}
.contracts-container {
  min-height: 180px;
  overflow-x: auto;
  overflow-y: auto;
}
.btn-circle-add-item {
  position: absolute;
  top: 35px;
  right: 15px;
}
.edit-license {
  position: absolute;
  top: 65px;
  right: 20px;
}
</style>