<template>
  <v-container class="px-0 py-0 mt-5" v-if="!loading">
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
        <div :class="baseColor + ' card rounded-0 rounded-t-sm px-3 py-4 text-body-1 white--text text-capitalize'">{{ itemsName}}</div>
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
                <p class="mb-0">{{ item.type.value }}</p>
                <p class="text-caption mb-0">Version {{ item.version }}</p>
                <p class="text-caption mb-0">App Build {{ item.appBuild.value }}</p>
              </div>
              <div class="d-flex align-center ml-auto mr-0">
                <v-btn
                  small
                  class="rounded-xl text-caption mr-2 white--text"
                  :color="item.status == 'Active' || item.status == 1 ? 'green':'blue-grey lighten-1'"
                >{{item.status == 1 ? 'Active': item.status == 0 ? 'Inactive': item.status}}</v-btn>
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
          <span class="headline text-capitalize">{{ titleDialog }}</span>
          <v-btn icon color="white" @click="deleteItem" v-if="!dialogMode">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-16 py-10">
          <v-select
            v-model="itemInfo.type"
            :items="dependencyTypes"
            :rules="selectRules"
            :item-value="Object"
            item-text="value"
            label="Type"
          ></v-select>
          <v-text-field 
            v-model="itemInfo.version"
            label="Version" 
          ></v-text-field>
          <v-select
            v-model="itemInfo.status"
            :items="statusOptions"
            :rules="selectBool"
            item-value="value"
            item-text="label"
            label="Status"
          ></v-select>
          <v-select
            v-model="itemInfo.appBuild"
            :items="appBuildOptions"
            :item-value="Object"
            item-text="value"
            label="App Build"
          ></v-select>
          <v-select
            v-model="itemInfo.edaPackage"
            :items="edaPackageBuild"
            :item-value="Object"
            item-text="value"
            label="EDA Package Build"
          ></v-select>
          <v-select
            v-model="itemInfo.execPath"
            :items="updatedExecPath"
            :item-value="Object"
            item-text="value"
            label="Updated Exec Path"
          ></v-select>
          <v-select
            v-model="itemInfo.installNotes"
            :items="updatedinstallNotes"
            :item-value="Object"
            item-text="value"
            label="Updated Install Notes"
          ></v-select>
          <v-select
            v-model="itemInfo.dctStatus"
            :items="dctStatus"
            :item-value="Object"
            item-text="value"
            label="DCT Status"
          ></v-select>
          <v-select
            v-model="itemInfo.appCompliant"
            :items="appCompliant"
            :item-value="Object"
            item-text="value"
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
            v-model="itemInfo.notes"
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
  <v-container v-else>
    <v-progress-circular
      style="margin-left: 45%;"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-container>
</template>
<script>
import {items} from "@/mixins/items";
import {validations} from "@/mixins/form-validations";
import {mapActions} from "vuex";

export default {
  name: "Dependencies",
  mixins: [items, validations],
  props:{
    info: Object
  },
  data: () => ({
    menu: false,
    loading: true,
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
    statusOptions: [
      {label:'Active', value: 1}, {label:'Inactive', value: 0}
    ],
    updatedinstallNotes:[],
    dependencyTypes: [],
    appBuildOptions: [],
    edaPackageBuild: [],
    updatedExecPath: [],
    appCompliant:[],
    dctStatus:[]
  }),
  methods: {
    ...mapActions("ITAppsModule", 
      ["get_selects", "post_dependencie", "get_dependencies", "put_dependencies", "delete_dependencie"]
    ),
    post(){
      this.post_dependencie({
        dependency_update_install_notes: this.itemInfo['installNotes']['id'],
        dependency_app_compliant: this.itemInfo['appCompliant']['id'],
        dependency_update_exec_path: this.itemInfo['execPath']['id'],
        status: this.itemInfo['status'] == 1 ? true : false,
        dependency_dct_status: this.itemInfo['dctStatus']['id'],
        dependency_app_build: this.itemInfo['appBuild']['id'],
        dependency_eda: this.itemInfo['edaPackage']['id'],
        dependency_type: this.itemInfo['type']['id'],
        remediation_date: this.itemInfo['remDate'],
        version: this.itemInfo['version'],
        notes: this.itemInfo['notes'],
        app_id: this.info.id
      });
    },
    put(){
      this.put_dependencies(this.itemInfo);
    },
    delete(){
      this.delete_dependencie(this.itemInfo.id);
    }
  },
  created(){
    this.get_dependencies(this.info.id).then(
      res => (
        res.data.forEach(item => {
          this.items.push({
            appBuild: item.app_build,
            appCompliant: item.app_compliant,
            dctStatus: item.dct_status,
            notes: item.notes,
            edaPackage: item.eda,
            execPath: item.execPath,
            id: item.id,
            installNotes: item.update_install_notes,
            remDate: item.remediation_date,
            status: item.status,
            type: item.type,
            version: item.version
          });
        }),
        this.loading = false)
    );
    this.get_selects('/DependencyType').then(
      response => (response.data.forEach(item =>{
        this.dependencyTypes.push({id:item.id, value:item.value, field:item.field});
      }))
    );
    this.get_selects('/DependencyAppBuild').then(
      response => (response.data.forEach(item =>{
        this.appBuildOptions.push({id:item.id, value:item.value, field:item.field});
      }))
    );
    this.get_selects('/DependencyEDAPackageBuild').then(
      response => (response.data.forEach(item =>{
        this.edaPackageBuild.push({id:item.id, value:item.value, field:item.field});
      }))
    );
    this.get_selects('/DependencyUpdatedExecPath').then(
      response => (response.data.forEach(item =>{
        this.updatedExecPath.push({id:item.id, value:item.value, field:item.field});
      }))
    );
    this.get_selects('/DependencyUpdatedinstallNotes').then(
      response => (response.data.forEach(item =>{
        this.updatedinstallNotes.push({id:item.id, value:item.value, field:item.field});
      }))
    );
    this.get_selects('/DependencyDCTStatus').then(
      response => (response.data.forEach(item =>{
        this.dctStatus.push({id:item.id, value:item.value, field:item.field});
      }))
    );
    this.get_selects('/DependencyAppCompliant').then(
      response => (response.data.forEach(item =>{
        this.appCompliant.push({id:item.id, value:item.value, field:item.field});
      }))
    );
  }
};
</script>
<style lang="scss">
.v-divider, .add-item-btn {
  width: 100%;
  cursor: pointer;
}
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