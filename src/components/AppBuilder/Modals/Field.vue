<template>
  <v-dialog
    v-model="show"
    persistent
    :scrollable="!loading"
    :width="loading ? '400px' : '90%'"
  >
    <v-card
      v-if="loading"
      color="primary"
      dark
    >
      <v-card-text>
        Please stand by
        <v-progress-linear
          class="mb-0"
          color="white"
          indeterminate
        />
      </v-card-text>
    </v-card>
    <v-card
      v-else
      class="elevation-0"
    >
      <v-card-title>
        <template v-if="editing">
          Edit Field: {{ field.label }}
        </template>
        <template v-else>
          Create New Field
        </template>
      </v-card-title>
      <v-card-text class="mb-10">
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="field.label"
                    label="Field Name"
                  />
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="field.type"
                    item-text="label"
                    item-value="value"
                    :items="types"
                    label="Field Type"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="field.machine_name"
                    label="Machine Name: Optional"
                  />
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="field.metadata.required"
                    color="red"
                    hide-details
                    label="Required"
                    value="red"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col
                  v-if="field.type === 'timestamp'"
                  cols="12"
                >
                  <v-select
                    v-model="field.metadata.format"
                    :items="dateFormats"
                    label="Format"
                  />
                </v-col>
                <template v-if="field.type === 'autocomplete'">
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="field.metadata.min"
                          label="Min Values"
                          value="1"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="field.metadata.max"
                          label="Max Values"
                          value="1"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <h4 class="mb-2">
                      Options
                    </h4>
                    <template v-for="(option, optIndex) in field.metadata.options">
                      <v-text-field
                        :key="optIndex"
                        v-model="field.metadata.options[optIndex]"
                        append-outer-icon="mdi-delete"
                        label="Option Name"
                        @click:append-outer="removeOption(optIndex, field.metadata.options)"
                      />
                    </template>
                    <v-btn
                      class="pa-0"
                      small
                      text
                      @click="pushOption"
                    >
                      Add Option
                    </v-btn>
                  </v-col>
                </template>
                <v-col
                  v-if="field.type === 'referenced'"
                  cols="12"
                >
                  <treeselect
                    v-model="field.referenced_field"
                    :disable-branch-nodes="true"
                    :load-options="loadOptions"
                    :multiple="false"
                    :options="fieldList"
                    placeholder="Referenced Field"
                    value-format="object"
                  />
                </v-col>
                <v-col
                  v-if="field.type === 'referencedToApp'"
                  cols="12"
                >
                  <v-autocomplete
                    v-model="field.referenced_app"
                    item-text="label"
                    item-value="appId"
                    :items="appList"
                    label="Referenced App"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red"
          text
          @click="closeModal"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue"
          dark
          @click="saveField(field)"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'

import axios from 'axios'

export default {
  name: 'Field',
  props: {
    show: {
      default: false,
      required: true,
      type: Boolean
    },
    editing: {
      default: false,
      required: true,
      type: Boolean
    },
    field: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      loading: true,
      dateFormats: [
        'mm/dd/YYYY',
        'mm/dd/YYYY H:m:s',
        'dd/mm/YYYY H:m:s'
      ],
      types: [
        { label: 'Text', value: 'text' },
        { label: 'Number', value: 'number' },
        { label: 'Date', value: 'timestamp' },
        { label: 'People', value: 'people' },
        { label: 'Multiple Choice', value: 'autocomplete' },
        { label: 'Attachment', value: 'attachment' },
        { label: 'Yes / No', value: 'boolean' },
        { label: 'Reference Field', value: 'referenced' },
        { label: 'Reference App', value: 'referencedToApp' },
        { label: 'Address', value: 'autocomplete-address' }
      ],
      fieldList: []
    }
  },
  computed: {
    ...mapState('AppBuilder', {
      currentApp: 'app'
    }),
    appList() {
      return this.fieldList.filter(row => Number(row.appId) !== Number(this.currentApp.id))
    }
  },

  mounted() {
    // TODO: The available apps list should be on a global list on the store.
    axios.get(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/dynamic_apps/apps`).then(response => {
      response.data.map(app => {
        if (parseInt(app.id) !== parseInt(this.$route.params.id)) {
          this.fieldList.push({
            id: app.title + app.id,
            appId: app.id,
            label: app.title,
            children: null
          })
        }
      })
      if (this.editing && this.field.type === 'referenced') {
        // eslint-disable-next-line camelcase
        this.field.referenced_field = this.field.metadata.originalReference
      }
      this.loading = false
    })
  },

  methods: {
    ...mapMutations('SnackBarNotif', {
      notifDanger: 'notifDanger',
      notifSuccess: 'notifSuccess'
    }),
    deleteField() {},
    removeOption(index, item) {
      item.splice(index, 1)
    },
    verifyMachineName(txt) {
      let re = new RegExp('^[a-zA-Z0-9_]*$')
      const res = re.test(txt)
      return res
    },
    async saveField(field) {
      try {
        if( field.machine_name && !this.verifyMachineName(this.$h.dg( field, 'machine_name', '' ) ) ) {
          this.notifDanger('A Machine Name Should Only Contain: Letters, Numbers or Underscores')
          return
        }
        
        // eslint-disable-next-line camelcase
        const postData = {
          id: field.id,
          // eslint-disable-next-line camelcase
          app_id: this.currentApp.id,
          // eslint-disable-next-line camelcase
          panel_id: field.panel_id,
          table_id: field.table_id,
          weight: field.weight,
          metadata: field.metadata,
          type: field.type,
          label: field.label,
          // eslint-disable-next-line camelcase
          machine_name: field.machine_name
        }
        if (field.type === 'referenced') {
          postData.metadata.originalReference = field.referenced_field
          // eslint-disable-next-line camelcase
          postData.referenced_field = field.referenced_field.id
        } else {
          delete postData.referenced_field
        }
        if (field.type === 'referencedToApp') {
          postData.metadata.originalReference = this.appList.find(row => row.appId === field.referenced_app)
          // eslint-disable-next-line camelcase
          postData.referenced_app = field.referenced_app
        } else {
          delete postData.referenced_app
        }
        if ((field.type !== 'referenced') && (field.type !== 'referencedToApp')) {
          delete postData.metadata.originalReference
        }
        if (this.editing) {
          const data = await this.$store.dispatch('AppBuilder/updateField', postData)
          this.notifSuccess('The Field Was Updated')
          this.$emit('result', data)
        } else {
          const data = await this.$store.dispatch('AppBuilder/saveField', postData)
          this.notifSuccess('The Field Was Created')
          this.$emit('result', data)
        }
      } catch (e) {
        let msg = 'There was an error.'
        if (field.machine_name) msg += ' Remember that the Machine Name Must Be Unique'
        this.notifDanger(msg)
      }
    },
    confirmDelete(field) {
      this.$store.dispatch('AppBuilder/deleteField', field.id)
    },
    closeModal() {
      this.$emit('close')
    },
    pushOption() {
      if (!this.field.metadata.options) {
        this.field.metadata.options = []
      }
      this.field.metadata.options.push('New Option')
    },

    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        axios.post(`${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/app-builder/field/list/all`, {
          appId: parseInt(parentNode.appId),
          nested: true
        }).then(response => {
          parentNode.children = this.normalizeNested(response.data)
          callback()
        })
      }
    },

    normalizeNested(tabs) {
      return tabs.map(tab => {
        // TODO: Improve validation for fields without a panel.
        if (!tab.panels && tab.type) {
          tab.label = 'Field: ' + tab.label
          return tab
        }
        tab.label = 'Tab: ' + tab.title
        tab.id = tab.title + tab.id
        tab.children = tab.panels.map(panel => {
          panel.label = 'Panel: ' + panel.title
          panel.id = panel.title + panel.id
          panel.children = panel.fields.filter(field => field.type !== 'referenced').map(field => {
            field.label = 'Field: ' + field.label
            return field
          })
          return panel
        })
        return tab
      })
    }
  }
}
</script>
