<template>
  <app-template
    :is-persistent="$route.name === 'record.show'"
    :props-dialog="showSelf"
  >
    <div
      slot="header"
      class="align-center d-flex justify-space-between max-w-lg mx-auto pb-4 pt-6 w-full"
    >
      <v-col
        class="d-flex relative"
        cols="10"
      >
        <v-btn
          class="absolute"
          color="red darken-1"
          icon
          style="left: -40px; top: 13px;"
          :to="{ name: 'apps', params: {} }"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
        <div class="d-flex w-full">
          <v-img
            v-if="record.image"
            :alt="record.image"
            class="rounded"
            height="150"
            :src="record.image"
            width="180"
          />

          <v-icon
            v-else
            size="180"
          >
            mdi-store
          </v-icon>

          <m6-upload
            accepted-file-type="image"
            btn-button="purple"
            class="absolute left-0 ml-3 mt-2 top-0"
            @loading="loading = !loading"
            @response="recordImageRes"
          >
            <v-icon>mdi-cloud-upload</v-icon>
          </m6-upload>

          <div class="pl-8 w-full">
            <p class="font-weight-regular mb-1 text-h7">
              {{ record['record_number'] }}
            </p>
            <v-spacer />
            <div
              v-if="!editTitleMode"
              class="relative w-fit"
            >
              <p
                class="font-weight-regular mb-1 text-h5"
                style="height: 68px; overflow: hidden; text-overflow: ellipsis;"
              >
                {{ record.title }}
              </p>
              <v-btn
                class="absolute pointer"
                color="grey darken-1"
                icon
                style="right: -40px; top: -10px;"
                @click="showEditTitleMode"
              >
                <v-icon size="18">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </div>
            <div
              v-else
              class="d-flex"
            >
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
              <div
                class="d-flex flex-column"
              >
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
                  <v-icon
                    size="22"
                  >
                    mdi-check
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="2">
        <v-row
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
            <span class="mt-3 text-center">{{ app['title'] }}</span>
            <v-btn
              color="red darken-2"
              icon
              small
              @click="deletingRecord"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-row>
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
    <div
      slot="tabs"
      class="d-flex"
    >
      <v-tabs
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
      </v-tabs>
    </div>
    <div
      slot="btns"
      class="align-center d-flex"
    />
    <div
      v-for="(tab, i) in $h.dg(app, 'tabs', [])"
      v-show="i === currentTab"
      :key="`tab-item-${i}`"
      slot="content"
      class="w-full"
    >
      <panel-two-columns>
        <div slot="leftPanel">
          <div
            v-for="(panel, index) in panelsByColumn( $h.dg( tab, 'panels', []), 0 )"
            :key="`p-l-${index}`"
            class="mb-3 panel px-4 py-3 w-side white"
          >
            <h3>{{ panel.title }}</h3>
            <form-show-generator
              :fields="$h.dg(panel, 'fields', [])"
              :panel="panel"
              :show-standard-fields="tab.readOnly && index === 0"
            />
          </div>
        </div>

        <div slot="rightPanel">
          <div
            v-if="currentTab === 0"
            class="main-content px-3"
          >
            <project-social-media
              class="px-0"
              :external="true"
            />
          </div>
          <div v-else>
            <div
              v-for="(panel, index) in panelsByColumn( $h.dg( tab, 'panels', []), 1 )"
              :key="`p-l-${index}`"
              class="mb-3 panel px-4 py-3 white"
            >
              <h3>{{ panel.title }}</h3>

              <form-show-generator
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
import AppTemplate from '@/views/Home/AppTemplate'
import ProjectSocialMedia from './ProjectSocialMedia'
import PanelTwoColumns from '@/components/AppBuilder/Content/PanelTwoColumns'
import { mapState, mapMutations, mapActions } from 'vuex'
import FormShowGenerator from '@/components/AppBuilder/Form/FormShowGenerator.vue'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'

export default {
  name: 'AppBuilderShow',

  components: {
    AppTemplate,
    ProjectSocialMedia,
    PanelTwoColumns,
    FormShowGenerator,
    DeleteDialog
  },

  data: () => ({
    tabs: [],
    currentTab: 0,
    loading: false,
    showDeleteDialog: false
  }),

  computed: {
    ...mapState('Companies', {
      currentCompany: 'currentCompany'
    }),

    ...mapState('RecordsInstance', {
      record: 'currentRecord',
      showSelf: 'displayAppBuilderShow'
    }),

    ...mapState('AppBuilder', {
      app: 'app'
    }),

    panelsByColumn() {
      return (panels, column) => panels.filter(p => p.column === column)
    }
  },

  watch: {
    async record(val) {
      await this.$store.dispatch('GSFeed/setRoom', 'AppBuilder')
      await this.$store.dispatch('GSFeed/setBuilderFeed', val.record_number.replace('#', '_'))
      await this.$store.dispatch('GSFeed/retrieveFeed')
    }
  },

  methods: {
    ...mapActions('AppBuilder', {
      getApp: 'getApp',
      updateRecord: 'updateRecord',
      deleteRecord: 'deleteRecord'
    }),
    ...mapMutations('RecordsInstance', {
      displayAppBuilderShow: 'displayAppBuilderShow'
    }),
    ...mapMutations('SnackBarNotif', {
      notifDanger: 'notifDanger',
      notifSuccess: 'notifSuccess'
    }),
    ...mapActions('AppBuilder', {
      updateRecord: 'updateRecord'
    }),
    deletingRecord() {
      this.showDeleteDialog = true
    },
    async confirmDelete() {
      this.showDeleteDialog = false

      try {
        this.loading = true
        await this.deleteRecord(this.record.id)
        this.notifSuccess('The record was deleted')
        this.$router.push('/')
        this.loading = false
      } catch (e) {
        this.loading = false
        this.notifDanger('There was an error while deleting the Record')
      }
    },
    cancelDelete() {
      this.showDeleteDialog = false
    },
    async recordImageRes(res) {
      if (res.ok) {
        this.record.image = res.data.link
        try {
          this.loading = true
          await this.updateRecord(this.record)
          this.loading = false
          this.notifSuccess('Record Updated!')
        } catch (e) {
          this.loading = false
          this.notifDanger('There was an error while saving the file')
        }
      } else {
        this.notifDanger('There was an error while saving the file')
      }
    },
    showEditTitleMode() {
      this.updatedTitle = this.record.title
      this.editTitleMode = true
    },
    cancelEditTitle() {
      this.editTitleMode = false
    },
    async editTitle() {
      this.record.title = this.updatedTitle
      console.log(this.record)
      await this.updateRecord(this.record)
      this.editTitleMode = false
    }
  },

  data: () => ({
    tabs: [],
    currentTab: 0,
    editTitleMode: false,
    updatedTitle: '',
    loading: false,
    showDeleteDialog: false
  })

}
</script>

<style lang="scss" scoped>
.flex-row {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
</style>
