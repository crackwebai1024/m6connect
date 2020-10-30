<template>
  <v-container class="px-0 py-0">
    <v-form @submit.prevent ref="form" v-model="valid">
      
      
      <v-row>
        <v-col cols="12">
          <v-text-field
            dense
            rounded
            ref="inputFeed"
            :rules="textRules"
            v-model="itemInfo.title"
            class="h-full outline-none px-2 text-body-1 w-full"
            placeholder="Title"
          />
        </v-col>
        <v-col cols="12">
          <v-text-field
            dense
            rounded
            ref="inputFeed"
            :rules="textRules"
            v-model="itemInfo.description"
            class="h-full outline-none px-2 text-body-1 w-full"
            placeholder="Type your notification here..."
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
            v-model="itemInfo.requestType"
            :rules="selectRules"
            label="Request Type"
            :items="options.RequestType"
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
        <v-col cols="12" class="py-0">
          <v-select
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
            label="Who to notify"
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
      start_date: null,
      end_date: null,
      due_date: null,
      assignment_list: null,
      description: null,
      title: null,
      requestType: null,
      record_id: null,
      status: null,
    },
    res: {
      start_date: false,
      due_date: false,
    },
    options: {
      Status: [],
      records: [],
      RequestType: [],
    },
    imageFiles: [],
    docFiles: [],
    minimized: false,
    offset: true,
  }),
  methods: {
    ...mapActions("ITAppsModule", { selects: "get_all_selects" }),
    ...mapActions("WorkOrderModule", { records: "getRecords" }),
    onImagesChange(e) {
      this.imageFiles = e;
      this.$refs.inputFeed.focus();
    },
    onDocsChange(e) {
      this.docFiles = e;
      this.$refs.inputFeed.focus();
    },
    post() {
      console.log(this.itemInfo);
    },
  },
  computed: {
    ...mapGetters('Companies', { companyUsers: 'getCurrentCompanyUsers' }),
  },
  mounted() {
    this.selects({ params: ["wo_status", "wo_request_type"] }).then((res) => {
      this.options["RequestType"] = res["data"]["wo_request_type"];
      this.options["Status"] = res["data"]["wo_status"];
    });

    this.records().then(res => {
        this.options['records'] = res['data'];
    });
  },
};
</script>
