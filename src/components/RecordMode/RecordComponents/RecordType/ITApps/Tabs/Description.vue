<template>
  <v-container class="px-4 py-5 mt-5 blue darken-3 white--text relative">
    <v-btn @click="showUpdateDialog(info)" color="blue lighten-2" small left elevation="0" min-width="37" height="32" class="edit-description rounded-circle transparent pa-0">
      <v-icon class="white--text pa-0 ma-0">mdi-pencil</v-icon>
    </v-btn>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1">Vendor</p>
      <p class="text-caption font-weight-bold mb-1 text-right">{{ info['company'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1">Status</p>
      <p class="text-caption font-weight-bold mb-1 text-right">{{ info['client_status'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1">First Contact Group</p>
      <p class="text-caption font-weight-bold mb-1 text-right">{{ info['first_contact_group'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1">Type</p>
      <p class="text-caption font-weight-bold mb-1 text-right">{{ info['record_type'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1">Category</p>
      <p class="text-caption font-weight-bold mb-1 text-right">{{ info['category'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1">SubCategory</p>
      <p class="text-caption font-weight-bold mb-1 text-right">{{ info['sub_category'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1">App Management</p>
      <p class="text-caption font-weight-bold mb-1 text-right">{{ info['app_management'] }}</p>
    </div>
    <v-divider class="grey mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <p class="text-caption font-weight-medium mb-1">Server Hosting Model</p>
      <p class="text-caption font-weight-bold mb-1 text-right">{{ info['hosting_model'] }}</p>
    </div>

    <p class="text-center font-weight-medium text-body-1 mt-6 mb-1">Most Commonly Known As</p>
    <div class="d-flex justify-center flex-wrap">
      <v-chip
        v-for="i in [1]"
        :key="i"
        class="ma-2"
        color="primary"
      >
        Primary {{i}}
      </v-chip>
    </div>

    <p class="text-center font-weight-medium text-body-1 mt-6 mb-1">Also Known As(AKA)</p>
    <div class="d-flex justify-center flex-wrap">
      <v-chip
        v-for="i in [1,2,3]"
        :key="i"
        class="ma-2"
        color="primary"
      >
        Impac Elekta MosaiQ {{i}}
      </v-chip>
    </div>

    <p class="text-center font-weight-medium text-body-1 mt-6 mb-1">Formerly Known As(FKA)</p>
    <div class="d-flex justify-center flex-wrap">
      <v-chip
        v-for="i in [1,2,3]"
        :key="i"
        class="ma-2"
        color="primary"
      >
        Impac Elekta MosaiQ {{i}}
      </v-chip>
    </div>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-form ref="form" v-model="valid" class="white">
        <v-card-text class="pa-0">
          <v-toolbar
            color="blue darken-3"
            dark
            flat
          >
            <v-toolbar-title>Edit Application Information</v-toolbar-title>
            <template v-slot:extension>
              <v-tabs
                v-model="tabs"
                centered
                slider-color="grey lighten-2"
              >
                <v-tab
                  v-for="(tab, index) in tabTitles"
                  :key="index + 1"
                >
                  {{ tab.name }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tabs" class="px-16 py-10">
            <!-- GENERAL -->
            <v-tab-item>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo.company"
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
                    v-model="itemInfo.record_name"
                    :rules="textRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field 
                    label="Version"
                    v-model="itemInfo.version"
                    :rules="textRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field 
                    label="Description"
                    v-model="itemInfo.internal_description"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo.client_status"
                    :items="statusOptions"
                    :filter="customFilter"
                    :rules="textRules"
                    item-text="name"
                    color="blue darken-3"
                    label="Status"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo.first_contact_group"
                    :items="firstContactGroupOptions"
                    :filter="customFilter"
                    :rules="textRules"
                    item-text="name"
                    color="blue darken-3"
                    label="First Contact Group" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo.category"
                    :items="category"
                    :filter="customFilter"
                    :rules="textRules"
                    item-text="name"
                    color="blue darken-3"
                    label="Category" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo.sub_category"
                    :items="[]"
                    :filter="customFilter"
                    item-text="name"
                    color="blue darken-3"
                    label="SubCategory" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo.record_type"
                    :items="type"
                    :filter="customFilter"
                    :rules="textRules"
                    item-text="name"
                    color="blue darken-3"
                    label="Type" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo.app_management"
                    :items="appManagement"
                    :filter="customFilter"
                    :rules="textRules"
                    item-text="name"
                    color="blue darken-3"
                    label="App Management" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo.hosting_model"
                    :items="serverHostingModel"
                    :filter="customFilter"
                    :rules="textRules"
                    item-text="name"
                    color="blue darken-3"
                    label="Server Hosting Model" 
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-autocomplete
                    v-model="itemInfo.capabilities"
                    :items="capabilities"
                    :filter="customFilter"
                    item-text="name"
                    color="blue darken-3"
                    label="Capabilities" 
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- KNOWN AS -->
            <v-tab-item>
              <v-row>
                lalalalalal vacio por ahora
              </v-row>
            </v-tab-item>
            <!-- SECURITY -->
            <v-tab-item>
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field 
                    v-model="itemInfo.app_management"
                    :rules="textRules"
                    color="blue darken-3"
                    label="App Management" 
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="itemInfo.hosting_model"
                    :rules="textRules"
                    color="blue darken-3"
                    label="Server Hosting Model" 
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-tab-item>
            <!-- IMAGE -->
            <v-tab-item>
              <v-row>
                <v-col cols="12" class="py-0">
                  Image
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-3" text @click="closeDialog">Cancel</v-btn>
          <v-btn :disabled="!valid" color="blue darken-3" text @click="updateItemDescription">Update</v-btn>
        </v-card-actions>
      </v-form>
    </v-dialog>
  </v-container>
</template>
<script>
import {items} from "@/mixins/items";
import {validations} from "@/mixins/form-validations";

export default {
  name: "Description",
  mixins: [items, validations],
  props: {
    info: Object,
  },
  data: () => ({
    tabs: null,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    model: 'tab-2',
    itemInfo: {},
    tabTitles: [
      { name: 'General'},
      { name: 'Known As'},
      { name: 'Security'}
    ],
    statusOptions: [
      { name: 'Active'}, 
      { name: 'Inactive'},
      { name: 'PENDING EDA PKG BUILD'}, 
      { name: 'PENDING EOL'},
      { name: 'PENDING GO-LIVE'}, 
      { name: 'Pending Testing'},
      { name: 'PENDING TRC APPROVAL'}
    ],
    firstContactGroupOptions: [
      { name: 'Access'}, 
      { name: 'AMBULATORY COMMUNITY SYSTEMS SUPPORT'},
      { name: 'AMBULATORY EHR SUPPORT'}, 
      { name: 'BP HRIS'},
      { name: 'CARDIOVASCULAR & PERIOPERATIVE SYSTEMS SUPPORT'}, 
      { name: 'CLINICAL IMAGING SYSTEMS SUPPORT'},
      { name: 'CLINICAL INTERFACES'},
      { name: 'COMMUNITY CONNECT EHR'}, 
      { name: 'COMMUNITY CONNECT TECHNICAL'},
      { name: 'COMPUTER OPERATIONS'}, 
      { name: 'CORE SUPPORT'},
      { name: 'CTS'}, 
      { name: 'DATABASE ADMINISTRATION'},
      { name: 'DECISION SUPPORT'}
    ],
    category: [
      { name: 'Ambulatory Clinic EMR'}, 
      { name: 'Application Manager'},
      { name: 'Cardiology'}, 
      { name: 'Care Coordination'},
      { name: 'Care Team'}, 
      { name: 'Coding'},
      { name: 'Community Care'},
      { name: 'Compliance'}, 
      { name: 'Data Governance'},
      { name: 'Dietary'}, 
      { name: 'Document Imaging'},
      { name: 'Emergency Department'}, 
      { name: 'Facilities Management'},
      { name: 'Finance'}
    ],
    type: [
      { name: 'Database'}, 
      { name: 'Desktop'},
      { name: 'Device'}, 
      { name: 'Dongle'},
      { name: 'Operating System'}, 
      { name: 'Server Only'},
      { name: 'System Tools'},
      { name: 'URL'}
    ],
    appManagement: [
      { name: 'Hybrid Internal/Vendor Managed'}, 
      { name: 'Internally Managed'},
      { name: 'Vendor Managed'}
    ],
    serverHostingModel: [
      { name: 'Self Hosted'}, 
      { name: 'Multi-Tenant'},
      { name: 'Vendor Hosted'}, 
      { name: 'Vendor Website'},
      { name: 'N/A'}
    ],
  }),
  methods: {
    updateItemDescription() {
      if(this.valid) {
        let info = [this.info,this.itemInfo];
        this.info = Object.assign(...info);
        this.closeDialog()
      }
    }
  }
};
</script>
<style lang="scss">
.v-divider, .add-item-btn {
  width: 100%;
  cursor: pointer;
}
.items-container {
  height: 180px;
  overflow-x: auto;
  overflow-y: auto;
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