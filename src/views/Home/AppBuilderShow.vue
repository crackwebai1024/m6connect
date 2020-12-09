<template>
  <app-template
    :is-persistent="$route.name === 'record.show'"
    :props-dialog="showSelf"
  >
    <div
      slot="header"
      class="align-center d-flex justify-space-between max-w-lg mx-auto pb-4 pt-6 w-full"
    >
      <v-btn
        color="red darken-1"
        icon
        :to="{ name: 'apps', params: {} }"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="align-center d-flex">
        <div class="flex-row">
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
            btn-button="purple"
            @loading="loading = !loading"
            @response="recordImageRes"
          >
            <v-icon>mdi-cloud-upload</v-icon>
          </m6-upload>
        </div>

        <div class="ml-8">
          <p class="font-weight-regular mb-1 text-h7">
            {{ record['record_number'] }}
          </p>
          <v-spacer />
          <p class="font-weight-regular mb-1 text-h5">
            {{ record.title }}
          </p>
        </div>
      </div>
      <v-row
        align="center"
        no-gutters
      >
        <v-col cols="7" />
        <v-col cols="2">
          <v-img
            v-if="app.iconLink"
            :alt="app.iconLink"
            class="d-inline-block rounded"
            height="70"
            :src="app.iconLink"
            width="50"
          />

          <v-icon
            v-else
            class="d-inline-block"
            size="100"
          >
            mdi-store
          </v-icon>
        </v-col>
        <v-col cols="3">
          <span class="d-inline-block ml-5">{{ app['title'] }}</span>
        </v-col>
      </v-row>

      <m6-loading :loading="loading" />
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
            class="mb-3 panel px-4 py-3 white"
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

export default {
  name: 'AppBuilderShow',

  components: {
    AppTemplate,
    ProjectSocialMedia,
    PanelTwoColumns,
    FormShowGenerator
  },

  data: () => ({
    tabs: [],
    currentTab: 0,
    loading: false
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
      updateRecord: 'updateRecord'
    }),
    ...mapMutations('RecordsInstance', {
      displayAppBuilderShow: 'displayAppBuilderShow'
    }),
    ...mapMutations('SnackBarNotif', {
      notifDanger: 'notifDanger',
      notifSuccess: 'notifSuccess'
    }),
    async recordImageRes(res) {
      if (res.ok) {
        this.record.image = res.data.link
        try {
          this.loading = true
          await this.updateRecord(this.record)
          this.loading = false
          this.notifSuccess('Company Updated!')
        } catch (e) {
          this.loading = false
          this.notifDanger('There was an error while saving the file')
        }
      } else {
        this.notifDanger('There was an error while saving the file')
      }
    
    }
  }

}
</script>

<style lang="scss" scoped>
.flex-row {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
</style>
