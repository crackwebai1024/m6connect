<template>
  <v-form ref="form">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="text-center pa-0">
          <img
            v-if="imageFiles.length > 0"
            alt="App Icon"
            :src="srcImageFiles[0]"
            class="iconLink"
          />
          <v-icon size="100" v-else>
            mdi-application
          </v-icon>
          <div class="ma-0 pa-0 uploadfile-btn w-fit">
            <v-tooltip class="tooltip-upload-file" left>
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                  <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    class="align-center d-flex justify-center ma-0 pa-0 upload-icon white--text"
                    hide-input
                    multiple
                    prepend-icon="mdi-image"
                    @change="onImagesChange($event)"
                  />
                </div>
              </template>
              <span
                class="black--text blue lighten-2 pa-1 rounded text-caption white--text"
                >Image</span
              >
            </v-tooltip>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Title"
            v-model="record.title"
            :rules="rules.generic"
            filled
            outlined
          />
        </v-col>
        <v-col cols="12">
          <v-autocomplete
            v-model="record.status"
            label="Record Status"
            :rules="rules.generic"
            filled
            outlined
            :items="statusOptions"
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Description"
            v-model="record.description"
            :rules="rules.generic"
            filled
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancel()" class="white--text mr-4">
          Cancel
        </v-btn>
        <v-btn color="green darken-2" class="white--text" @click="saveRecord">
          save
        </v-btn>
      </v-row>
    </v-container>
    <m6-loading :loading="loading" />
  </v-form>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
const recordDefault = {
  app_id: "",
  record_number: "",
  title: "",
  description: "",
  status: "",
  author: "",
  metadata: {},
};

export default {
  name: "GenericRecord",

  props: {
    app: {
      default: () => ({}),
      type: Object,
    },
  },

  data: () => ({
    statusOptions: ["Published", "Draft", "Archived"],
    loading: false,
    imageFiles: [],
    res: {
      iconLink: null,
    },
    rules: {
      generic: [(v) => !!v || "Item is required"],
    },
    record: { ...recordDefault },
    recordDefault: { ...recordDefault },
  }),

  methods: {
    ...mapActions("AppBuilder", {
      createRecord: "createRecord"
    }),

    ...mapActions("AppAttachments", {
      setApp: "post_attachment"
    }),

    ...mapMutations("SnackBarNotif", {
      notifDanger: "notifDanger",
      notifSuccess: "notifSuccess",
    }),

    ...mapMutations("RecordsInstance", {
      setDisplayAppBuilderShow: "setDisplayAppBuilderShow",
      setCurrentRecord: "setCurrentRecord",
    }),

    onImagesChange($event) {
      this.imageFiles = $event;
    },

    cancel() {
      this.$emit("closingGenericRecord");
    },

    close() {
      const recordId = this.record.id;

      this.record = { ...this.recordDefault };
      this.$router.push({ name: "record.show", params: { id: recordId } });
    },

    async saveRecord() {
      try {
        if (!this.$refs.form.validate()) {
          this.notifDanger("Please Fill Out The Entire Form");
          return;
        }
        this.loading = true;

        this.record = {
          ...this.record,
          author: this.currentUser.id,
          appID: this.app.id,
          image: ''
        };

        if (this.imageFiles[0]['name'].match(/\.[0-9a-z]+$/i) && this.imageFiles[0]['size'] < 50000000){
          let getImg = await this.setApp({
            file: this.imageFiles[0],
            headers: {
                'Content-Type': this.imageFiles[0]['type'],
                'Content-Name': this.imageFiles[0]['name'],
                'path': `${this.record['author']}/${this.record['recordNumber']}/`
            }
          });

          this.imageFiles[0]['value']= getImg['attachId']
          this.imageFiles[0]['id']= getImg['attachId']
        }

        this.record['image'] = `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/file/url/${this.imageFiles[0]['id']}`;

        this.record = await this.createRecord({ record: this.record, appId: this.app.id, prefix: this.app.prefix });

        this.notifSuccess("The Record Was Created");
        this.loading = false;
        this.close();
      } catch (e) {
        this.notifDanger("There Was An Error While Creating The Record");
        this.loading = false;
      }
    },
  },

  computed: {
    ...mapState("Auth", {
      currentUser: "user",
    }),
    srcImageFiles() {
      const srcImages = []
      this.imageFiles.forEach(imageFile => {
        srcImages.push(URL.createObjectURL(imageFile))
      })
      return srcImages
    }
  },
};
</script>
<style lang="scss" scoped>
.float-right {
  float: right;
}
.iconLink {
  height: 5rem;
  width: auto;
}
.record-card {
  height: 50vh;
}
.v-tooltip__content {
  background: transparent !important;
  padding: 0;
}
.uploadfile-btn .upload-icon .v-icon--link {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  cursor: pointer;
  box-shadow: 1px 1px 4px #000000;
  background: #366af5 !important;
}
.uploadfile-btn .v-input__prepend-outer {
  padding: 0;
  margin: 0;
}
.mdi-image::before {
  color: #fff;
  font-size: 15px;
}
</style>
