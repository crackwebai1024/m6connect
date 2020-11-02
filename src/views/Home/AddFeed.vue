<template>
  <v-container class="px-0 py-0">
    <v-form @submit.prevent ref="form" v-model="valid">
      <v-row>
        <v-col cols="12" class="py-0">
          <v-text-field
            ref="inputFeed"
            :rules="textRules"
            v-model="itemInfo.title"
            class="h-full outline-none text-body-1"
            placeholder="Title"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            ref="inputFeed"
            :rules="textRules"
            v-model="itemInfo.description"
            class="h-full outline-none text-body-1"
            placeholder="Summary"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-menu
            v-model="res.due_date"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="itemInfo.due_date"
                :rules="textRules"
                label="Due Date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="itemInfo.due_date"
              @input="res.due_date = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6" class="py-0">
          <v-select
            v-model="itemInfo.type"
            :rules="selectRules"
            label="Request Type"
            :items="options.type"
            item-value="id"
            item-text="value"
          ></v-select>
        </v-col>
        <v-col cols="6" class="py-0">
          <v-select
            v-model="itemInfo.status"
            :rules="selectRules"
            label="Status"
            :items="options.Status"
            item-value="id"
            item-text="value"
          ></v-select>
        </v-col>
        <v-col cols="4" class="py-0">
          <v-select
            v-on:change="changeRecord($event)"
            v-model="record_type"
            label="Record Type"
            :items="records_type"
          >
          </v-select>
        </v-col>
        <v-col cols="8" class="py-0">
          <v-select
            :class="{ disabled: record_type === null }"
            v-model="itemInfo.record_id"
            label="Record"
            :items="options.records"
            item-value="id"
          >
            <template slot="selection" slot-scope="data">
              <!-- HTML that describe how select should render selected items -->
              {{ data.item.app_type }} - {{ data.item.title }}
            </template>
            <template slot="item" slot-scope="data">
              <!-- HTML that describe how select should render items when the select is open -->
              {{ data.item.app_type }} - {{ data.item.title }}
            </template>
          </v-select>
        </v-col>
        <v-col cols="0" class="py-0">
          <v-autocomplete
            :items="companyUsers"
            v-model="itemInfo.assignment_list"
            color="green"
            chips
            label="People"
            item-value="user.id"
            hide-details
            deletable-chips
            hide-no-data
            item-text="user.firstName"
            hide-selected
            multiple
            single-line
          >
            <template slot="item" slot-scope="data">
              <!-- HTML that describe how select should render items when the select is open -->
              <span> {{ data.item.user.firstName }} {{ data.item.user.lastName }} </span>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-btn
        color="green darken-2"
        class="white--text text-xl font-weight-bold"
        @click="post()"
        :disabled="!valid"
        block
        >Submit</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
import { validations } from "@/mixins/form-validations";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddFeed",
  mixins: [validations],
  data: () => ({
    itemInfo: {
      author: null,
      due_date: null,
      assignment_list: null,
      description: null,
      title: null,
      type: null,
      record_id: null,
      status: null,
    },
    res: {
      due_date: false,
    },
    options: {
      Status: [],
      records: [],
      type: [],
    },
    record_type: null,
    records_type: ['ITApps'],
    imageFiles: [],
    docFiles: [],
    minimized: false,
    offset: true,
  }),
  methods: {
    ...mapActions("ITAppsModule", { selects: "get_all_selects" }),
    ...mapActions("WorkOrderModule", { records: "getRecords", postAction: "postAction"}),
    changeRecord(event){
      switch( event ){
        case 'ITApps':
          this.records('itapps').then(res => { this.options['records'] = res['data']; });
          break;
      }
    },
    onImagesChange(e) {
      this.imageFiles = e;
      this.$refs.inputFeed.focus();
    },
    onDocsChange(e) {
      this.docFiles = e;
      this.$refs.inputFeed.focus();
    },
    post() {
      this.itemInfo['activity'] = {
        userID: this.user.id,
        data: {
          actor: JSON.stringify({
            created_at:new Date(),
            updated_at:new Date(),
            id: this.user.id,
            data:{
              image:this.user.profilePic,
              name:`${this.user.firstName} ${this.user.lastName}`
            }
          }),
          message: this.itemInfo.description,
          verb: 'action',
          object: 1
        }
      };
      this.itemInfo['start_date']     = new Date().toISOString().slice(0,10);
      this.itemInfo['requested_date'] = new Date().toISOString().slice(0,10);
      
      this.postAction(this.itemInfo).then(this.$emit('closeCreateActivity'));
    },
  },
  computed: {
    ...mapGetters('Companies', { companyUsers: 'getCurrentCompanyUsers' }),
    ...mapGetters('Auth',      { user:         'getUser'                }),
  },
  mounted() {
    this.itemInfo['author'] = this.user.id;
    this.selects({ params: ["wo_status", "wo_request_type"] }).then((res) => {
      this.options["type"] = res["data"]["wo_request_type"];
      this.options["Status"] = res["data"]["wo_status"];
    });
  },
};
</script>

<style>
  .disabled {
    pointer-events:none;
    color: #B6B6B6;
    cursor: not-allowed;
    background-image: none;
  }
</style>