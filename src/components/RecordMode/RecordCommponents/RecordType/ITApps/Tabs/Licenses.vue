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
        <div class="licenses-container pa-3">
          <!-- here is going to render all the items - another slot -->
          <div v-for="(item, index) in items" :key="'item-'+index">
            <v-row class="d-flex justify-center" v-for="(keyName, index)  in Object.keys(item)" :key="'key-'+ keyName">
              <template v-if="keyName !== 'id'">
                <v-col cols="12" class="pl-4 pr-16 py-1">
                  <div class="d-flex justify-space-between">
                    <p class="font-weight-medium mb-0">{{keyName}}</p>
                    <p class="mb-0">{{item[keyName]}}</p>
                  </div>
                  <v-divider class="mt-1 grey lighten-2"></v-divider>
                </v-col>
                <template cols="1" class="pa-0" v-if="index === 0">
                  <v-btn @click="showUpdateDialog(item)" small elevation="0" class="edit-license transparent rounded-xl"><v-icon>mdi-pencil</v-icon></v-btn>
                </template>
              </template>
            </v-row>
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
                <v-text-field
                  v-model="itemInfo.licenseType"
                  label="Type" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="itemInfo.users"
                  label="Estimated users" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="itemInfo.concurrentUsers"
                  label="Estimated concurrent users" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="itemInfo.licenses"
                  label="Number of licenses" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="itemInfo.details"
                  label="Details" 
                  :color="baseColor"
                >
                </v-text-field>
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
  name: "Licenses",
  mixins: [items],
  data: () => ({
    baseColor: 'teal lighten-1',
    itemsName: 'licenses',
    itemInfo: {
      licenseType: null,
      users: null,
      concurrentUsers: null,
      licenses: null,
      details: null
    },
    select: { state: 'Florida', abbr: 'FL' },
    items2: [
      { state: 'Florida', abbr: 'FL' },
      { state: 'Georgia', abbr: 'GA' },
      { state: 'Nebraska', abbr: 'NE' },
      { state: 'California', abbr: 'CA' },
      { state: 'New York', abbr: 'NY' },
    ],
    tagItems: ['App','ITApps','Project']
  }),
  computed: {
    infoValid() {
      return true
      // return (this.itemInfo.name !== null && this.itemInfo.tags !== null && this.itemInfo.tags.length > 0) ? true : false
    }
  },
  methods: {
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