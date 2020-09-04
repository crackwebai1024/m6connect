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
        <div :class="baseColor + ' card rounded-0 rounded-t-sm px-3 py-4 text-body-1 white--text text-capitalize'">{{ itemsName}}</div>
        <v-btn 
          :class="baseColor + ' btn-circle-add-item'" 
          fab small dark
          @click="dialog = true, dialogMode = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <div class="items-container pa-3">
          <!-- here is going to render all the items - another slot -->
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
                      :color="baseColor"
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
        </div>
      </v-card>
    </template>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form class="white" ref="formItem">
        <v-card-title :class="baseColor + ' white--text d-flex justify-space-between'">
          <span class="headline text-capitalize">{{ titleDialog }}</span>
          <v-btn icon color="white" @click="deleteItem" v-if="!dialogMode">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
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
                  :color="baseColor"
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
                  :color="baseColor"
                  required
                  readonly
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="itemInfo.phone"
                  label="Phone" 
                  :color="baseColor"
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
                  :color="baseColor"
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
          <v-btn :color="baseColor" text @click="closeDialog">Cancel</v-btn>
          <v-btn :disabled="!infoValid" :color="baseColor" text @click="clickAction">{{ titleAction }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-dialog>
  </v-container>
</template>
<script>
import {items} from "@/mixins/items";

export default {
  name: "Contacts",
  mixins: [items],
  data: () => ({
    baseColor: 'blue lighten-1',
    itemsName: 'contacts',
    itemInfo: {
      name: '',
      email: null,
      phone: null,
      tags: []
    },
    tagItems: ['App','ITApps','Project']
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
</style>