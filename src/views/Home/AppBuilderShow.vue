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
          </div>
        </v-row>
      </v-col>
    </div>
    <div
      slot="tabs"
      class="align-center d-flex"
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
      </panel-two-columns>
    </div>
  </app-template>
</template>

<script>
import AppTemplate from '@/views/Home/AppTemplate'
import ProjectSocialMedia from './ProjectSocialMedia'
import PanelFull from '@/components/AppBuilder/Content/PanelFull'
import PanelTwoColumns from '@/components/AppBuilder/Content/PanelTwoColumns'
import { mapState, mapMutations, mapActions } from 'vuex'
import FormShowGenerator from '@/components/AppBuilder/Form/FormShowGenerator.vue'

export default {
  name: 'AppBuilderShow',

  components: {
    AppTemplate,
    ProjectSocialMedia,
    PanelFull,
    PanelTwoColumns,
    FormShowGenerator
  },

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

  methods: {
    ...mapActions('AppBuilder', {
      getApp: 'getApp'
    }),
    ...mapMutations('RecordsInstance', {
      displayAppBuilderShow: 'displayAppBuilderShow'
    }),
    ...mapActions('AppBuilder', {
      updateRecord: 'updateRecord'
    }),
    showEditTitleMode() {
      this.updatedTitle = this.record.title
      this.editTitleMode = true
    },
    cancelEditTitle() {
      this.editTitleMode = false
    },
    editTitle() {
      this.record.title = this.updatedTitles
      return new Promise((resolve, reject) => {
        this.updateRecord(this.record)
          .then(res => resolve(res))
          .catch(e => reject(e))
      })
      this.editTitleMode = false
    }
  },

  data: () => ({
    tabs: [],
    currentTab: 0,
    editTitleMode: false,
    updatedTitle: ''
  })

}
</script>

<style lang="scs" scoped>

</style>
