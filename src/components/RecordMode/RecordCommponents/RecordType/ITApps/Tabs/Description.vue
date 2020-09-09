<template>
  <v-container class="px-4 py-5 mt-5 blue darken-3 white--text relative">
    <v-btn @click="showUpdateDialog(item)" color="blue lighten-2" small left elevation="0" min-width="37" height="32" class="edit-description rounded-circle transparent pa-0">
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
    
    <div v-for="(item, index) in items" :key="'item-'+index">
      <div class="d-flex">
        <img alt="" class="mr-2 rounded-xl" width="50" height="50" src="@/assets/default_user.png">
        <div>
          <p class="mb-0">{{ item.name }}</p>
          <p>{{ item.email }}</p>
        </div>
        <div class="d-flex align-center ml-auto mr-0">
          <v-tooltip right small>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                class="rounded-xl text-caption mr-2"
                color="blue darken-3"
                dark
                v-bind="attrs"
                v-on="on"
              >App</v-btn>
            </template>
            <span>App</span>
          </v-tooltip>
          <v-btn @click="showUpdateDialog(item)" small elevation="0" class="transparent rounded-xl"><v-icon>mdi-pencil</v-icon></v-btn>
        </div>
      </div>
      <div v-if="index !== items.length - 1">
        <v-divider class="my-3 grey lighten-2"></v-divider>
      </div>
    </div>

    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-form class="white" ref="formItem">
        <v-toolbar
          color="blue darken-3"
          dark
          flat
        >
          <v-toolbar-title>Edit Application Information</v-toolbar-title>

          <template v-slot:extension>
            <v-tabs
              v-model="model"
              centered
              slider-color="grey lighten-2"
            >
              <v-tab
                v-for="(tab, index) in tabs"
                :key="'tab-' + index"
                :href="`#tab-${i}`"
              >
                {{ tab.name }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="model">
          <v-tab-item
            v-for="i in 3"
            :key="i"
            :value="`tab-${i}`"
          >
            <v-card flat>
              <v-card-text class="grey--text" v-text="text">
                <p>hola</p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>





        <v-card-text class="px-16 py-10">
          <!-- form slot -->
          <v-container>
            <v-row>
              <v-col cols="12" class="py-0">
                <v-autocomplete
                  v-model="itemInfo.name"
                  @change="changeCurrentItemInfo" 
                  :items="dataPeople"
                  :filter="customFilter"
                  color="blue darken-3"
                  :rules="nameRules"
                  item-text="name"
                  return-object
                  label="Name"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field 
                  v-model="itemInfo.email"
                  label="Email*" 
                  color="blue darken-3"
                  required
                  readonly
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="itemInfo.phone"
                  label="Phone" 
                  color="blue darken-3"
                  readonly
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-autocomplete
                  v-model="itemInfo.tags"
                  :items="tagItems"
                  label="Tags*"
                  multiple
                  color="blue darken-3"
                  :rules="tagRules"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <!-- here another slot -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-3" text @click="closeDialog">Cancel</v-btn>
          <v-btn :disabled="!infoValid" color="blue darken-3" text @click="updateItem">{{ titleAction }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-dialog>
  </v-container>
</template>
<script>
import {items} from "@/mixins/items";

export default {
  name: "Description",
  mixins: [items],
  props: {
    info: Object,
  },
  data: () => ({
    model: 'tab-2',
    itemInfo: {
      name: '',
      email: null,
      phone: null,
      tags: []
    },
    tagItems: ['App','ITApps','Project'],
    tabs: [
      { name: 'General'},
      { name: 'Known As'},
      { name: 'Security'},
      { name: 'Image'},
    ]
  }),
  computed: {
    infoValid() {
      return (this.itemInfo.name !== null && this.itemInfo.tags !== null && this.itemInfo.tags.length > 0) ? true : false
    }
  },
  methods: {
    changeCurrentItemInfo(item) {
      this.itemInfo.name = item.name
      this.itemInfo.email = item.email
      this.itemInfo.phone = item.phone
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