
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
        <div class="licenses-container pa-3">
          <!-- here is going to render all the items - another slot -->
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :single-select="singleSelect"
            item-key="name"
            class="elevation-0"
          >
          </v-data-table>
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
                  v-model="itemInfo.name"
                  label="Name" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="itemInfo.date"
                  label="Date" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="itemInfo.required"
                  label="Required*" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="itemInfo.notifyWho"
                  label="Who to notify" 
                  :color="baseColor"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="itemInfo.description"
                  label="Description" 
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
  name: "Contracts",
  mixins: [items],
  data: () => ({
    baseColor: 'purple darken-1',
    itemsName: 'contracts',
    itemInfo: {
      number: null,
      name: null,
      status: null,
      start: null,
      end: null,
      termLength: null,
      termUnit: null,
      termPeriod: null,
      decisionDate: null,
      inflator: null,
      inflatorValue: null,
    },
    singleSelect: false,
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