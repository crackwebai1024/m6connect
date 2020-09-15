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
        <div class="notifications-container pa-3">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :single-select="singleSelect"
            item-key="name"
            class="elevation-0"
          > 
            <template v-slot:item.notifyWho="{ item }">
              <v-chip color="blue lighten-3 mx-1" dark v-for="(who, index) in item.notifyWho" :key="'who-'+index">
                {{ who }}
              </v-chip>
            </template>
            <template v-slot:item.description="{ item }">
              <div class="d-flex justify-space-between">
                <p>{{ item.description }}</p>
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

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form ref="form" v-model="valid" class="white">
        <v-card-title :class="baseColor + ' white--text d-flex justify-space-between'">
          <span class="headline text-capitalize">{{ titleDialog }}</span>
          <v-btn icon color="white" @click="deleteItem" v-if="!dialogMode">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="px-16 py-10">
          <v-text-field
            v-model="itemInfo.name"
            :rules="nameRules"
            :color="baseColor"
            label="Name" 
          >
          </v-text-field>
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
                v-model="itemInfo.date"
                :rules="textRules"
                label="Date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="itemInfo.date" @input="menu = false"></v-date-picker>
          </v-menu>
          <v-select
            v-model="itemInfo.required"
            :items="['Yes', 'No']"
            :rules="selectRules"
            :color="baseColor"
            label="Required"
          ></v-select>

          <v-autocomplete
            v-model="itemInfo.notifyWho"
            :items="['Trevor Handsen', 'Alex Nelson']"
            :color="baseColor"
            chips
            label="Who to notify"
            full-width
            hide-details
            hide-no-data
            item-text="name"
            hide-selected
            multiple
            single-line
          ></v-autocomplete>

          <v-textarea
            v-model="itemInfo.description"
            :color="baseColor"
          >
            <template v-slot:label>
              <div>
                Description
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
  name: "Notifications",
  mixins: [items, validations],
  data: () => ({
    menu: false,
    baseColor: 'deep-purple darken-3',
    itemsName: 'notifications',
    itemInfo: {
      name: null,
      date: null,
      required: null,
      notifyWho: null,
      description: null
    },
    singleSelect: false,
    selected: [],
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Date', value: 'date' },
      { text: 'Required', value: 'required' },
      { text: 'Who to notify', value: 'notifyWho' },
      { text: 'Description', value: 'description' },
    ],
  })
};
</script>
<style lang="scss">
.v-divider, .add-item-btn {
  width: 100%;
  cursor: pointer;
}
.notifications-container {
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