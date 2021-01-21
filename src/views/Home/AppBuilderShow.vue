<template>
  <app-template
    :is-persistent="$route.name === 'record.show'"
    :nav-header="navHeader"
    :props-dialog="showSelf"
  >
    <div slot="navheader" class="navheader w-full">
      <v-btn
        class="absolute"
        color="grey darken-1"
        icon
        style="left: 0px; top: 13px;"
        @click="$router.back()"
      >
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <div class="d-flex max-w-lg mx-auto w-full">
        <v-col class="d-flex navh relative" cols="9">
          <div class="d-flex w-full">
            <v-img
              v-if="record.image"
              :alt="record.image"
              class="rounded"
              height="40"
              :src="record.image"
              width="40"
            />

            <v-icon v-else size="40">
              mdi-store
            </v-icon>
            <div class="align-center d-flex relative w-fit">
              <p
                class="mb-1 r-title text-h5"
                :style="
                  'overflow: hidden; text-overflow: ellipsis; color: ' +
                    headerTextColor +
                    ';'
                "
              >
                {{ record.title }}
              </p>
              <div class="menu">
                <div class="selectedMenu">
                  <v-icon>
                    mdi-chevron-right
                  </v-icon>
                  {{ selectedItem }}
                </div>
                <ul class="menuItems">
                  <li
                    v-for="item in tabItems"
                    :key="item"
                    class="menuItem"
                    @click="selectMenu(item)"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="navh relative" cols="3">
          <div
            class="absolute label my-1 primary px-2 py-2 rounded"
            style="top: 7px"
          >
            Capital Projects
          </div>
        </v-col>
      </div>
      <v-btn
        class="absolute"
        icon
        style="right: 10px; top: 10px;"
        @click="toggleIsDelVerClicked"
      >
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <div v-if="isDelVerClicked" class="absolute delrecord right-0">
        <v-btn
          class="del-rec-btn red--text w-full"
          color="white"
          @click="deletingRecord"
        >
          Delete Record
        </v-btn>
      </div>
    </div>
    <v-card
      slot="header"
      class="d-flex justify-center r-header rounded-0 w-full"
      :color="headerBackgroundColor"
      flat
    >
      <v-card
        class="align-center d-flex justify-space-between max-w-xl mx-auto pb-4 pt-6 relative rounded-0 w-full"
        :color="headerBackgroundColor"
        flat
      >
        <v-btn
          class="absolute"
          color="grey darken-1"
          icon
          style="left: 0px; top: 0px;"
          @click="$router.back()"
        >
          <v-icon>
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <div class="align-center d-flex max-w-lg mx-auto w-full">
          <v-col class="d-flex relative" cols="9">
            <div class="d-flex w-full">
              <v-img
                v-if="record.image"
                :alt="record.image"
                class="rounded"
                height="116"
                :src="record.image"
                width="116"
              />

              <v-icon v-else size="116">
                mdi-store
              </v-icon>

              <m6-upload
                accepted-file-type="image"
                btn-button="white"
                class="absolute align-center d-flex justify-center left-0 ml-3 mt-2 myupload primary rounded-circle top-2"
                @loading="loading = !loading"
                @response="recordImageRes"
              >
                <v-icon size="15">
                  mdi-cloud-upload
                </v-icon>
              </m6-upload>

              <v-btn
                v-if="record.image"
                color="red darken-2"
                icon
                small
                @click="deleteRecordImage"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>

              <div class="absolute deletebtn left-0 ml-3 mt-2 rounded-circle">
                <v-btn color="white" icon small @click="deleteRecordImage">
                  <v-icon size="16">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </div>
              <div class="my-auto pl-8 w-full">
                <div
                  v-if="!editTitleMode"
                  class="align-center d-flex relative w-fit"
                >
                  <p
                    class="mb-1 r-title text-h5"
                    :style="
                      'overflow: hidden; text-overflow: ellipsis; color: ' +
                        headerTextColor +
                        ';'
                    "
                  >
                    {{ record.title }}
                  </p>
                  <v-btn
                    class="absolute edittitle pointer"
                    color="grey darken-3"
                    icon
                    @click="showEditTitleMode"
                  >
                    <v-icon size="18">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </div>
                <div v-else class="d-flex">
                  <v-textarea
                    v-model="updatedTitle"
                    auto-grow
                    class="mb-0"
                    label="Edit Title"
                    name="input-7-1"
                    outlined
                    @keyup.enter="editTitle"
                    @keyup.esc="cancelEditTitle"
                  />
                  <div class="d-flex flex-column">
                    <v-btn
                      class="ml-2"
                      color="red"
                      icon
                      @click="cancelEditTitle"
                    >
                      <v-icon size="22">
                        mdi-close
                      </v-icon>
                    </v-btn>
                    <v-btn
                      class="ml-2"
                      color="green accent-3"
                      :disabled="record.title === updatedTitle"
                      icon
                      @click="editTitle"
                    >
                      <v-icon size="22">
                        mdi-check
                      </v-icon>
                    </v-btn>
                  </div>
                </div>
                <p
                  class="font-weight-light mb-1 text-h7"
                  :style="'color: ' + headerTextColor + ';'"
                >
                  {{ record["record_number"] }}
                </p>
              </div>
            </div>
          </v-col>
          <v-col cols="3" class="relative">
            <div
              class="absolute align-center d-flex label primary px-2 rounded"
            >
              Capital Projects
            </div>
            <!-- <v-row
              align="center"
              no-gutters
            >
              <v-spacer />
              <div
                class="align-center d-flex flex-column justify-center"
              >
                <v-img
                  v-if="app.iconLink"
                  :alt="app.iconLink"
                  class="rounded-lg"
                  height="70"
                  :src="app.iconLink"
                  style="border-radius: 14px !important;"
                  width="70"
                />

                <v-icon
                  v-else
                  class="d-inline-block"
                  size="100"
                >
                  mdi-store
                </v-icon>
                <span
                  class="mt-3 text-center"
                  :style="'color: ' + headerTextColor + ';'"
                >{{ app['title'] }}</span>
                <v-btn
                  color="red darken-2"
                  icon
                  small
                  @click="deletingRecord"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-row> -->
          </v-col>

          <m6-loading :loading="loading" />

          <m6-confirm-delete
            message="Are you sure you want to delete this record?"
            :show="showDeleteDialog"
            title="Delete Current Record"
            @cancel="cancelDelete"
            @confirm="confirmDelete"
          />
        </div>
      </v-card>
    </v-card>
    <div slot="tabs" class="d-flex">
      <!-- <v-tabs
        v-model="currentTab"
        active-class="font-weight-black blue--text active-tab-company"
        :hide-slider="true"
      >
        <v-tab
          v-for="(tab, i) in $h.dg(app, 'tabs', [])"
          :key="`tabs-${i}`"
          class="blue--text capitalize"
        >
          {{ tab.title }}
        </v-tab>
      </v-tabs> -->
      <template>
        <v-tabs fixed-tabs color="primary">
          <v-tab v-for="item in tabItems" v-bind:key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </div>
    <div slot="btns" class="align-center d-flex relative">
      <v-btn icon @click="toggleIsDelVerClicked">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <div v-if="isDelVerClicked" class="absolute delrecord right-0">
        <v-btn
          @click="deletingRecord"
          class="w-full red--text del-rec-btn"
          color="white"
        >
          Delete Record
        </v-btn>
      </div>
    </div>
    <div style="width:100%; height:120px" v-if="navHeader"></div>
    <div
      v-for="(tab, i) in $h.dg(app, 'tabs', [])"
      v-show="i === currentTab"
      :key="`tab-item-${i}`"
      slot="content"
      class="w-full"
    >
      <panel-two-columns
        :left-column="tab.full_width ? 12 : 5"
        :right-column="tab.full_width ? 12 : 7"
      >
        <div slot="leftPanel">
          <div
            v-for="(panel, index) in panelsByColumn(
              $h.dg(tab, 'panels', []),
              0
            )"
            :key="`p-l-${index}`"
            class="card-custom-shadow mb-3 panel px-4 py-3 rounded white"
          >
            <h3>{{ panel.title }}</h3>
            <form-show-generator
              :action-record="true"
              :fields="$h.dg(panel, 'fields', [])"
              :helperMediaURL="helperMediaURL"
              :panel="panel"
              :show-standard-fields="tab.readOnly && index === 0"
            />

            <div
              v-for="(table, index) in $h.dg(panel, 'tables', [])"
              :key="`panel-table-${index}`"
            >
              <generated-table
                edit-mode
                :record-i-d="record.id"
                :table="table"
              />
            </div>
          </div>
        </div>

        <div v-if="!tab.full_width" slot="rightPanel">
          <div v-if="currentTab === 0" class="main-content px-0">
            <project-social-media class="px-0" :external="true" />
          </div>
          <div v-else>
            <div
              v-for="(panel, index) in panelsByColumn(
                $h.dg(tab, 'panels', []),
                1
              )"
              :key="`p-l-${index}`"
              class="mb-3 panel px-4 py-3 white"
            >
              <h3>{{ panel.title }}</h3>

              <form-show-generator
                :action-record="true"
                :fields="$h.dg(panel, 'fields', [])"
                :panel="panel"
              />
            </div>
          </div>
        </div>
      </panel-two-columns>
    </div>
  </app-template>
</template>

<script>
import AppTemplate from "@/views/Home/AppTemplate";
import ProjectSocialMedia from "./ProjectSocialMedia";
import PanelTwoColumns from "@/components/AppBuilder/Content/PanelTwoColumns";
import { mapState, mapMutations, mapActions } from "vuex";
import FormShowGenerator from "@/components/AppBuilder/Form/FormShowGenerator.vue";
import DeleteDialog from "@/components/Dialogs/DeleteDialog";
import GeneratedTable from "@/components/AppBuilder/GenericTable/GeneratedTable";

export default {
  name: "AppBuilderShow",

  components: {
    AppTemplate,
    ProjectSocialMedia,
    PanelTwoColumns,
    FormShowGenerator,
    DeleteDialog,
    GeneratedTable,
  },

  mounted() {
    this.$store
      .dispatch("AppBuilder/getApp", this.$route.params.id)
      .then((res) => {
        this.currentApp = res;
        if (res.helperMedia) {
          this.helperMediaURL = res.helperMedia[0].helper_media
            ? res.helperMedia[0].helper_media
            : "";
        }
        if (res.metadata) {
          this.currentApp.metadata = JSON.parse(res.metadata);
          this.headerBackgroundColor = this.currentApp.metadata.appHeader
            ? this.currentApp.metadata.appHeader.headerBackgroundColor
            : "#fff";
          // this.headerTextColor = this.currentApp.metadata.appHeader ? this.currentApp.metadata.appHeader.headerTextColor : '#606060'
          this.headerTextColor = "#606060";
        } else {
          this.headerBackgroundColor = "#fff";
          this.headerTextColor = "#606060";
        }
      });
    window.addEventListener("scroll", this.watchScroll);
  },

  computed: {
    ...mapState("Companies", {
      currentCompany: "currentCompany",
    }),

    ...mapState("RecordsInstance", {
      record: "currentRecord",
      showSelf: "displayAppBuilderShow",
    }),

    ...mapState("AppBuilder", {
      app: "app",
    }),

    panelsByColumn() {
      return (panels, column) => panels.filter((p) => p.column === column);
    },
  },

  watch: {
    async record(val) {
      await this.$store.dispatch("GSFeed/setRoom", "AppBuilder");
      await this.$store.dispatch(
        "GSFeed/setBuilderFeed",
        val.record_number.replace("#", "_")
      );
      await this.$store.dispatch("GSFeed/cleanFeed");
      await this.$store.dispatch("GSFeed/retrieveFeed");
    },
  },
  methods: {
    ...mapActions("AppBuilder", {
      getApp: "getApp",
      updateRecord: "updateRecord",
      deleteRecord: "deleteRecord",
    }),
    ...mapMutations("RecordsInstance", {
      displayAppBuilderShow: "displayAppBuilderShow",
    }),
    ...mapMutations("SnackBarNotif", {
      notifDanger: "notifDanger",
      notifSuccess: "notifSuccess",
    }),
    ...mapActions("AppBuilder", {
      updateRecord: "updateRecord",
    }),
    ...mapActions("File", {
      deleteFileFromS3: "deleteFileFromS3",
    }),
    deletingRecord() {
      this.showDeleteDialog = true;
    },
    toggleIsDelVerClicked() {
      this.isDelVerClicked = !this.isDelVerClicked;
    },
    watchScroll() {
      let scrollT = window.scrollY;
      console.log(scrollT);
      if (scrollT > 0) {
        this.navHeader = true;
      } else {
        this.navHeader = false;
      }
    },
    selectMenu(item) {
      this.selectedItem = item;
    },
    async deleteRecordImage() {
      try {
        this.loading = true;
        if (this.$h.dg(this.record, "image", "").length) {
          let splitLink = this.record.image.split("com");
          const key = splitLink[1].substr(1);

          await this.deleteFileFromS3({ key });
          this.record.image = "";
          await this.updateRecord(this.record);
        }

        this.loading = false;
        this.notifSuccess("The image was deleted");
      } catch (e) {
        this.notifDanger("There was an error while deleting App Icon Image");
        this.loading = false;
      }
    },
    async confirmDelete() {
      this.showDeleteDialog = false;

      try {
        this.loading = true;
        await this.deleteRecord(this.record.id);
        this.notifSuccess("The record was deleted");
        this.$router.push("/");
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.notifDanger("There was an error while deleting the Record");
      }
    },
    cancelDelete() {
      this.showDeleteDialog = false;
    },
    async recordImageRes(res) {
      if (res.ok) {
        this.record.image = res.data.link;
        try {
          this.loading = true;
          await this.updateRecord(this.record);
          this.loading = false;
          this.notifSuccess("Record Updated!");
        } catch (e) {
          this.loading = false;
          this.notifDanger("There was an error while saving the file");
        }
      } else {
        this.notifDanger("There was an error while saving the file");
      }
    },
    showEditTitleMode() {
      this.updatedTitle = this.record.title;
      this.editTitleMode = true;
    },
    cancelEditTitle() {
      this.editTitleMode = false;
    },
    async editTitle() {
      this.record.title = this.updatedTitle;
      await this.updateRecord(this.record);
      this.editTitleMode = false;
    },
  },

  data: () => ({
    tabs: [],
    currentTab: 0,
    loading: false,
    editTitleMode: false,
    updatedTitle: "",
    loading: false,
    currentApp: {},
    showDeleteDialog: false,
    headerBackgroundColor: "#fff",
    headerTextColor: "#aaa",
    helperMediaURL: "",
    tabItems: ["Home", "People", "Finance", "Files"],
    selectedItem: "Home",
    isDelVerClicked: false,
    scrollTop: 0,
    navHeader: false,
  }),
};
</script>

<style lang="scss" scoped>
.flex-row {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
.r-header {
  max-height: 144px;
}
.pointer {
  display: none;
}
.r-title {
  font-weight: 600 !important;
  font-family: Raleway !important;
}
.r-title:hover + .pointer,
.pointer:hover {
  display: block;
}
.edittitle {
  background-color: rgb(170, 170, 170);
  right: -35px;
}
.deletebtn {
  background-color: red;
  top: 50px;
}
.myupload {
  width: 30px;
  height: 30px;
}
.label {
  color: white;
  max-width: 194px;
  height: 40px;
  top: 0px;
  right: 0px;
}
.v-tab--active {
  color: var(--v-primary-base) !important;
}
.delrecord {
  height: 48px;
  width: 144px;
  top: 40px;
  border: solid 2px black;
  z-index: 100;
}
.del-rec-btn {
  height: 100% !important;
}
.navheader {
  position: fixed;
  height: 60px;
  z-index: 1;
  background-color: white;
  box-shadow: 1px 2px 3px 3px;
}
.dropmenu {
  min-height: 40px;
  width: 150px;
  color: var(--v-primary-base) !important;
  margin-left: 20px;
}
.navh {
  padding: 0.25rem !important;
  display: flex;
  align-items: center;
}
.selectedMenu {
  color: blue;
  padding-left: 5px;
  width: 100px;
  background-color: rgb(230, 230, 230);
  height: 45px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.menuItems {
  position: absolute;
  top: 40px;
  list-style: none;
  background-color: white;
  padding-left: 0px;
  width: 100px;
  line-height: 2.5;
  box-shadow: 0px 0px 6px 1px;
  overflow-y: hidden;
  cursor: pointer;
  height: 0px;
  transition: 0.2s;
}
.menuItems:hover {
  display: block;
  height: 160px;
}
.menuItem {
  padding-left: 10px;
}
.menuItem:hover {
  background-color: #eee;
}
.selectedMenu:hover + .menuItems {
  height: 160px;
}
</style>
