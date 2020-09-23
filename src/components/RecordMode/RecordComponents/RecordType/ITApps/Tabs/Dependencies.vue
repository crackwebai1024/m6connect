<template>
  <v-container class="px-0 py-0 mt-5">
    <template v-if="items.length === 0">
      <v-container :class="baseColor + ' rounded-lg px-0 py-10 d-flex justify-center align-center flex-column'">
        <p class="white--text text-h5">There are no {{ itemsName }}</p>
        <v-divider class="mt-0 white w-full"></v-divider>
        <a 
          class="w-full pointer d-flex justify-center align-center py-3 white--text text-body-2 border-t-1 border"
          @click="dialog = true, dialogMode = true"
        >
          ADD NEW <v-icon class="white--text">mdi-plus</v-icon>
        </a>
        <v-divider class="mb-3 white w-full"></v-divider>
      </v-container>
    </template>
    <template v-else>
      <v-card>
        <div :class="baseColor + ' card rounded-0 rounded-t-sm px-3 py-4 text-body-1 white--text capitalize'">{{ itemsName}}</div>
        <v-btn 
          :class="baseColor + ' btn-circle-add-item'" 
          fab small dark
          @click="dialog = true, dialogMode = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <div class="licenses-container pa-3">
          <div v-for="(item, index) in items" :key="'item-'+index">
            <div class="d-flex">
              <div>
                <p class="mb-0">{{ item.type }}</p>
                <p class="text-caption mb-0">Version {{ item.version }}</p>
                <p class="text-caption mb-0">App Build {{ item.appBuild }}</p>
              </div>
              <div class="d-flex align-center ml-auto mr-0">
                <v-btn
                  small
                  class="rounded-xl text-caption mr-2 white--text"
                  :color="item.status == 'Active'? 'green':'blue-grey lighten-1'"
                >{{item.status}}</v-btn>
                <v-btn @click="showUpdateDialog(item)" small elevation="0" class="transparent rounded-xl"><v-icon>mdi-pencil</v-icon></v-btn>
              </div>
            </div>
            <div v-if="index !== items.length - 1">
              <v-divider class="my-3 grey lighten-2"></v-divider>
            </div>
          </div>
        </div>
      </v-card>
    </template>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form ref="form" v-model="valid" class="white">
        <v-card-title :class="baseColor + ' white--text d-flex justify-space-between'">
          <span class="headline capitalize white--text">{{ titleDialog }}</span>
          <v-btn icon color="white" @click="deleteItem" v-if="!dialogMode">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-16 py-10 form-labels">
          <v-select
            v-model="itemInfo.type"
            :items="dependencyTypes"
            :rules="selectRules"
            label="Type"
          ></v-select>
          <v-text-field 
            v-model="itemInfo.version"
            label="Version" 
          ></v-text-field>
          <v-select
            v-model="itemInfo.status"
            :items="statusOptions"
            :rules="selectRules"
            label="Status"
          ></v-select>
          <v-select
            v-model="itemInfo.appBuild"
            :items="[]"
            label="App Build"
          ></v-select>
          <v-select
            v-model="itemInfo.edaPackage"
            :items="[]"
            label="EDA Package Build"
          ></v-select>
          <v-select
            v-model="itemInfo.execPath"
            :items="[]"
            label="Updated Exec Path"
          ></v-select>
          <v-select
            v-model="itemInfo.installNotes"
            :items="[]"
            label="Updated Install Notes"
          ></v-select>
          <v-select
            v-model="itemInfo.dctStatus"
            :items="[]"
            label="DCT Status"
          ></v-select>
          <v-select
            v-model="itemInfo.appCompliant"
            :items="[]"
            label="App Compliant"
          ></v-select>
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
                v-model="itemInfo.remDate"
                label="Remeditation Date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="itemInfo.remDate" @input="menu = false"></v-date-picker>
          </v-menu>
          <v-textarea
            v-model="itemInfo.details"
          >
            <template v-slot:label>
              <div>
                Notes <small>(optional)</small>
              </div>
            </template>
          </v-textarea>
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
  name: "Dependencies",
  mixins: [items, validations],
  data: () => ({
    menu: false,
    baseColor: 'red darken-2',
    itemsName: 'dependencies',
    itemInfo: {
      type: null, //Type
      version: null, //Version
      status: null, //Status
      appBuild: null, //App Build
      edaPackage: null, //EDA Package Build
      execPath: null, //Updated Exec Path
      installNotes: null, //Updated install Notes
      dctStatus: null, //DCT Status
      appCompliant: null, //App Compliant
      remDate: null, //Remediation Date
      notes: null //Notes
    },
    dependencyTypes: [
      '.NET',
      'Active X',
      'Android OS (tablet)',
      'cache.ini',
      'Chrome',
      'Dongle',
      'File System',
      'Flash',
      'Internet Explorer',
      'Internet Explorer 11',
      'Java',
      'LDAP',
      'Luminex software by Vendor',
      'MS Exchange',
      'MS Office',
      'MS SQL Server',
      'MS Windows Server',
      'mTilda',
      'Silverlight',
      'Windows OS'
    ],
    statusOptions: ['Active', 'Inactive'],
    appBuildOptions: ['64 Bit', 'N/A'],

  })
};
</script>
<style lang="scss">
.licenses-container {
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