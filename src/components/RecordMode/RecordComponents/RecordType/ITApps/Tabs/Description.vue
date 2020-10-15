<template>
  <v-container class="px-4 py-5 mt-5 blue darken-3 white--text relative" v-if="Object.keys(itapp_description).length != 0">
    <v-btn @click="showUpdateDialog(itapp_description)" color="blue lighten-2" small left elevation="0" min-width="37" height="32" class="edit-description rounded-circle transparent pa-0">
      <v-icon class="white--text pa-0 ma-0">mdi-pencil</v-icon>
    </v-btn>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">Vendor</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['general_info']['vendor_id'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">Status</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['general_info']['status']['value'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">First Contact Group</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['general_info']['first_contact_group']['value'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">Type</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['general_info']['type']['value'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">Category</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['general_info']['category']['value'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">SubCategory</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['general_info']['sub_category']['value'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">App Management</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['general_info']['app_management']['value'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">Server Hosting Model</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['general_info']['server_hosting_model']['value'] }}</p>
    </div>

    <p class="text-center font-weight-medium text-body-1 mt-6 mb-1 white--text">Most Commonly Known As</p>
    <div class="d-flex justify-center flex-wrap">
      <v-chip
        class="ma-2"
        color="primary"
      >
        <span class="white--text">{{ info['company'] }}</span>
      </v-chip>
    </div>

    <p class="text-center font-weight-medium text-body-1 mt-6 mb-1 white--text">Also Known As(AKA)</p>
    <div class="d-flex justify-center flex-wrap">
      <v-chip
        v-for="aka in itapp_description['also_known']"
        :key="'aka-' + aka.value"
        class="ma-2"
        color="primary"
      >
        <span class="white--text">{{ aka.value }}</span>
      </v-chip>
    </div>

    <p class="text-center font-weight-medium text-body-1 mt-6 mb-1 white--text">Formerly Known As(FKA)</p>
    <div class="d-flex justify-center flex-wrap">
      <v-chip
        v-for="fka in itapp_description['formerly_known']"
        :key="'fka-' + fka.value"
        class="ma-2"
        color="primary"
      >
        <span class="white--text">{{ fka.value }}</span>
      </v-chip>
    </div>

    <div class="d-flex justify-space-between mt-2">
      <p class="text-caption font-weight-medium mb-1 white--text">Patient</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['information_security']['facing'] == 1 ? 'Yes' : 'No' }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">PHI</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['information_security']['phi'] == 1 ? 'Yes' : 'No' }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">PCI</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['information_security']['pci'] == 1 ? 'Yes' : 'No' }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1 white--text">SSN</p>
      <p class="text-caption font-weight-bold mb-1 text-right white--text">{{ itapp_description['information_security']['ssn_foreign']['value'] }}</p>
    </div>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-form ref="form" v-model="valid" class="white">
        <v-card-text class="pa-0">
          <v-toolbar
            color="blue darken-3"
            dark
            flat
          >
            <v-toolbar-title class="white--text">Edit Application Information</v-toolbar-title>
            <template v-slot:extension>
              <v-tabs
                v-model="tabs"
                centered
                slider-color="grey lighten-2"
              >
                <v-tab
                  class="white--text"
                  v-for="(tab, index) in tabTitles"
                  :key="index + 1"
                >
                  {{ tab.name }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tabs" class="record-text px-16 py-10 form-labels" v-if="Object.keys(itemInfo).length != 0">
            <!-- GENERAL -->
            <v-tab-item>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo['general_info']['vendor_id']"
                    :items="dataCompany"
                    :filter="customFilter"
                    :rules="textRules"
                    item-text="name"
                    color="blue darken-3"
                    label="Vendor"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field 
                    label="Name"
                    v-model="itemInfo['title']"
                    :rules="textRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field 
                    label="Version"
                    v-model="itemInfo['general_info']['version']"
                    :rules="textRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field 
                    label="Description"
                    v-model="itemInfo.description"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo['general_info']['status']"
                    :items="statusOptions"
                    :filter="customFilter"
                    :rules="selectRules"
                    item-text="value"
                    :item-value="Object"
                    color="blue darken-3"
                    label="Status"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo['general_info']['first_contact_group']"
                    :items="firstContactGroupOptions"
                    :filter="customFilter"
                    :rules="selectRules"
                    item-text="value"
                    :item-value="Object"
                    color="blue darken-3"
                    label="First Contact Group" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo['general_info']['category']"
                    :items="category"
                    :filter="customFilter"
                    :rules="selectRules"
                    item-text="value"
                    :item-value="Object"
                    color="blue darken-3"
                    label="Category" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo['general_info']['sub_category']"
                    :items="category"
                    :filter="customFilter"
                    item-text="value"
                    :item-value="Object"
                    color="blue darken-3"
                    label="SubCategory" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo['general_info']['type']"
                    :items="type"
                    :filter="customFilter"
                    :rules="selectRules"
                    item-text="value"
                    :item-value="Object"
                    color="blue darken-3"
                    label="Type" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo['general_info']['app_management']"
                    :items="appManagement"
                    :filter="customFilter"
                    :rules="selectRules"
                    item-text="value"
                    :item-value="Object"
                    color="blue darken-3"
                    label="App Management" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo['general_info']['server_hosting_model']"
                    :items="serverHostingModel"
                    :filter="customFilter"
                    :rules="selectRules"
                    item-text="value"
                    :item-value="Object"
                    color="blue darken-3"
                    label="Server Hosting Model" 
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-tab-item>
            <!--  IMAGE   -->
            <v-tab-item>
              <v-row>
                <v-col col="12" class="text-center pa-0" >
                  <v-avatar size="100" class="mr-2 text-center">
                      <img
                          v-if="channelImage !== ''"
                          :alt="channelImage"
                          :src="channelImage"
                      >
                      <v-icon 
                          size="100"
                          v-else
                      >
                          mdi-application
                      </v-icon>
                    </v-avatar>
                    <m6-upload 
                        btnButton="purple" 
                        @response="reponseRecordImg" 
                        @loading="loading = !loading" 
                    >
                        <v-icon size="33">mdi-plus-circle</v-icon>
                    </m6-upload>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- KNOWN AS -->
            <v-tab-item>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    v-model="itemInfo['also_known']"
                    :items="[]"
                    label="Also Known AS(AKA)"
                    item-text="value"
                    deletable-chips
                    multiple
                    hint="Add new AKAs hitting enter"
                    chips
                  ></v-combobox>
                </v-col>
                <v-col cols="12">
                  <v-combobox
                    v-model="itemInfo['formerly_known']"
                    :items="[]"
                    label="Formerly Known AS(FKA)"
                    item-text="value"
                    deletable-chips
                    multiple
                    hint="Add new FKAs hitting enter"
                    chips
                  ></v-combobox>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- SECURITY -->
            <v-tab-item>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-checkbox
                    v-model="itemInfo['information_security']['facing']"
                    label="Patient/Costumer Facing"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-checkbox
                    v-model="itemInfo['information_security']['phi']"
                    label="PHI"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-checkbox
                    v-model="itemInfo['information_security']['pci']"
                    label="PCI"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo['information_security']['ssn_foreign']"
                    :items="ssn"
                    :filter="customFilter"
                    item-text="value"
                    :item-value="Object"
                    color="blue darken-3"
                    label="SSN" 
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-3" text @click="closeDialog">Cancel</v-btn>
          <v-btn :disabled="!valid" color="blue darken-3" text @click="updateItem">Update</v-btn>
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
const app_settings = require("@/store/models/apps_settings");
import {items} from "@/mixins/items";
import {validations} from "@/mixins/form-validations";
import {mapActions} from "vuex";

export default {
  name: "Description",
  mixins: [items, validations],
  props: {
    info: Object,
  },
  data: () => ({
    itapp_description:{},
    tabs: null,
    channelImage: '',
    loading: false,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    model: 'tab-2',
    itemInfo: {},
    tabTitles: [
      { name: 'General'},
      { name: 'Image'},
      { name: 'Known As'},
      { name: 'Security'},
    ],
    statusOptions: [],
    firstContactGroupOptions: [],
    category: [],
    type: [],
    preview_tags: [],
    appManagement: [],
    serverHostingModel: [],
    ssn: [],
  }),
  methods: {
    ...mapActions('ITAppsModule',[
      'get_all_selects', 'get_description', 'put_itapp_description'
    ]),
    reponseRecordImg(res) {
      if(res.ok) {
        this.channelImage = res.data.link;
      } else {
        this.notifDanger('There was an error while saving the file');
      }
    },
    put() {
      this.itemInfo['tags'] = this.preview_tags;
      this.itapp_description = this.itemInfo;
      this.put_itapp_description(this.itemInfo).then(
        res => (
          this.itapp_description['also_known'] = res.data['known_as']['also_know_as'],
          this.itapp_description['formerly_known'] = res.data['known_as']['formerly_known_as']
        ));
    }
  },
  mounted(){
    this.get_description(this.info.id).then(
      response => (this.itapp_description = response, response.image_info.image_url !== null ? this.channelImage = response.image_info.image_url : '')
    );
    this.get_all_selects({params:[
      'AppInfoGeneralServerHostingModel',
      'AppInfoGeneralFirstContactGroup',
      'AppInfoGeneralAppManagement',
      'AppInfoGeneralCategory',
      'AppInfoGeneralStatus',
      'AppInfoGeneralType',
      'AppInfoSecuritySSN'
    ]}).then(res => (Object.keys(res.data).forEach(key => {
      let arraySettings = app_settings.toAppsSettings(res.data[key]);
      switch (key) {
        case 'AppInfoGeneralFirstContactGroup':
          this.firstContactGroupOptions = arraySettings;        break;
        case 'AppInfoGeneralServerHostingModel':
          this.serverHostingModel = arraySettings;              break;
        case 'AppInfoGeneralAppManagement':
          this.appManagement = arraySettings;                   break;
        case 'AppInfoGeneralCategory':
          this.category = arraySettings;                        break;
        case 'AppInfoGeneralStatus':
          this.statusOptions = arraySettings;                   break;
        case 'AppInfoGeneralType':
          this.type = arraySettings;                            break;
        case 'AppInfoSecuritySSN':
          this.ssn = arraySettings;                             break;
      }
    })));
  },
  watch:{
      dialog:function(val){
        if( val ){
          this.preview_tags = this.itemInfo.formerly_known.concat(this.itemInfo.also_known);
        }
      }
  },
};
</script>
<style lang="scss">
.items-container {
  overflow-x: auto;
  overflow-y: auto;
}
.record-text{
  height: 70vh;
}
.btn-circle-add-item {
  position: absolute;
  top: 35px;
  right: 15px;
}
.edit-description {
  position: absolute;
  top: -12px;
  right: 12px;
}
.relative {
  position: relative;
}
</style>