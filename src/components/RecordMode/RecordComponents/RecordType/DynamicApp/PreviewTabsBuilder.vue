<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-title
        class="justify-center"
        color="indigo darken-2"
      >
        <p class="my-0">
          {{ app.title }}
        </p>
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col
            v-for="(panel, index) in panels"
            :key="`custom-panel-${index}`"
            cols="6"
          >
            <v-card class="my-3 pa-2">
              <div
                class="align-center d-flex grey--text my-2 text-caption"
              >
                <v-divider class="blue-grey lighten-5" />
                <p class="mx-3 my-0">
                  {{ panel.title }}
                </p>
                <v-divider class="blue-grey lighten-5" />
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
              <v-card-text>
                <div
                  v-for="(field, i) in panel.fields"
                  :key="`panel-field-${i}`"
                >
                  <p class="font-weight-light ma-0 pa-0 text-overline">
                    {{ field.label }}
                  </p>
                  <v-spacer />
                  <p class="ma-0 pa-0 text-subtitle-1">
                    {{ panel.value.values[i+1] }}
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PreviewTabsBuilder',
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    loading: false,
    recordId: 0,
    app: {},
    panels: [],
    values: []
  }),
  async mounted() {
    console.log(this.index)
    
    this.loading = true
    this.app = await this.getApp(this.info['app_id'])
    this.app = this.app.tabs[this.index]
    this.app.panels.forEach(async (tab, i) => {
      this.setValues(tab)
      if (i === this.app.panels.length - 1) {
        this.loading = false
      }
    })
  },
  methods: {
    ...mapActions('AppBuilder', [
      'getApp',
      'getFieldValuesPerPanel'
    ]),
    async setValues(app) {
      const data = {
        'recordID': this.info['id'],
        'panelID': app['id']
      }

      const values = await this.getFieldValuesPerPanel(data)
      const payload = {
        ...app,
        value: values
      }

      this.panels.push(payload)
    }
  }
}
</script>
