<template>
  <v-form ref="form">
    <v-container
      class="pa-0"
      fluid
    >
      <v-row class="ma-0 pa-0 pt-4">
        <v-col
          v-if="showStandardFields"
          class="pa-0"
        >
          <v-hover
            v-slot="{ hover }"
          >
            <div class="d-flex justify-between relative">
              <p
                v-if="editMode === 0 || (editMode === 2 && !showIndexFields[0])"
                class="mb-2"
              >
                <span class="mb-0 text-caption">Record Status</span><br>
                {{ recordToEdit.status }}
              </p>
              <v-autocomplete
                v-if="editMode === 1 || (editMode === 2 && showIndexFields[0])"
                v-model="recordToEdit.status"
                filled
                :items="statusOptions"
                label="Record Status"
                outlined
              />
              <v-btn
                v-if="editMode === 2 && showIndexFields[0]"
                class="green--text ml-2 text--accent-2"
                icon
                @click="showIndexFields[0] = false"
              >
                <v-icon size="18">
                  mdi-check
                </v-icon>
              </v-btn>
              <v-btn
                v-if="hover && !showIndexFields[0] && editMode === 2"
                class="absolute right-0 top-0"
                icon
                right
                top
                @click="showIndexFields[0] = true"
              >
                <v-icon size="18">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </div>
          </v-hover>

          <v-hover
            v-slot="{ hover }"
          >
            <div class="d-flex justify-between relative">
              <p
                v-if="editMode === 0 || (editMode === 2 && !showIndexFields[1])"
                class="mb-2"
              >
                <span class="mb-0 text-caption">Record Description</span><br>
                {{ recordToEdit.description }}
              </p>
              <v-textarea
                v-if="editMode === 1 || (editMode === 2 && showIndexFields[1])"
                v-model="recordToEdit.description"
                filled
                label="Record Description"
                outlined
              />
              <v-btn
                v-if="editMode === 2 && showIndexFields[1]"
                class="green--text ml-2 text--accent-2"
                icon
                @click="showIndexFields[1] = false"
              >
                <v-icon size="18">
                  mdi-check
                </v-icon>
              </v-btn>
              <v-btn
                v-if="hover && !showIndexFields[1] && editMode === 2"
                class="absolute right-0 top-0"
                icon
                right
                top
                @click="showIndexFields[1] = true"
              >
                <v-icon size="18">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </div>
          </v-hover>
        </v-col>
        <v-col
          v-for="(f, index) in fields"
          :key="`custom-field-${f.id}`"
          class="ma-0 pa-0"
          cols="12"
        >
          <v-hover
            v-slot="{ hover }"
          >
            <div class="d-flex justify-between relative">
              <p
                v-if="editMode === 0 || (editMode === 2 && !showIndexFields[index + 2])"
                class="mb-2"
              >
                <span class="mb-0 text-caption">{{ $h.dg( f, 'label', '' ) }}</span><br>
                {{ genericRecord[`${f.id}`] }}
              </p>
              <template
                v-if="editMode === 1 || (editMode === 2 && showIndexFields[index + 2])"
              >
                <template v-if="f.machine_name == 'rapid_snapshot_image'">
                  <img
                    alt="Rapid Image"
                    :src="genericRecord[`${f.id}`]"
                    style="width: 20rem; height: auto;"
                  >
                </template>
                <component
                  :is=" $h.dg( typeToComponentMapping[f.metadata.originalReference.type], 'component', '')"
                  v-else-if="f.type === 'referenced'"
                  v-model="genericRecord[`${f.id}`]"
                  :chips="$h.dg(typeToComponentMapping[f.metadata.originalReference.type], 'chips', false)"
                  :clearable="$h.dg( typeToComponentMapping[f.metadata.originalReference.type], 'clearable', false )"
                  disabled
                  filled
                  :items="$h.dg( f, 'metadata.options', [] )"
                  :label=" $h.dg( f, 'label', '' ) "
                  :multiple="$h.dg(typeToComponentMapping[f.metadata.originalReference.type], 'multiple', false)"
                  outlined
                  :rules=" $h.dg( f, 'metadata.required', false) ? formRules.standard : []"
                  :type=" $h.dg( typeToComponentMapping[f.metadata.originalReference.type], 'type', '' ) "
                />
                <component
                  :is=" $h.dg( typeToComponentMapping[f.type], 'component', '')"
                  v-else
                  v-model="genericRecord[`${f.id}`]"
                  :chips="$h.dg(typeToComponentMapping[f.type], 'chips', false)"
                  :clearable="$h.dg( typeToComponentMapping[f.type], 'clearable', false )"
                  filled
                  :items="$h.dg( f, 'metadata.options', [] )"
                  :label=" $h.dg( f, 'label', '' ) "
                  :multiple="$h.dg(typeToComponentMapping[f.type], 'multiple', false)"
                  outlined
                  :rules=" $h.dg( f, 'metadata.required', false) ? formRules.standard : []"
                  :type=" $h.dg( typeToComponentMapping[f.type], 'type', '' ) "
                />
              </template>
              <v-btn
                v-if="editMode === 2 && showIndexFields[index + 2]"
                class="green--text ml-2 text--accent-2"
                icon
                @click="showIndexFields[1] = false"
              >
                <v-icon size="18">
                  mdi-check
                </v-icon>
              </v-btn>
              <v-btn
                v-if="hover && !showIndexFields[index + 2] && editMode === 2"
                class="absolute right-0 top-0"
                icon
                right
                top
                @click="showIndexFields[index + 2] = true"
              >
                <v-icon size="18">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </div>
          </v-hover>
        </v-col>
      </v-row>

      <v-row v-if="fields.length > 0">
        <v-col cols="12">
          <v-spacer />
          <v-btn
            v-if="isEdit"
            class="white--text"
            color="green"
            @click="updating"
          >
            update
          </v-btn>
          <v-btn
            v-else
            class="white--text"
            color="green"
            @click="creating"
          >
            save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <m6-loading :loading="loading" />
  </v-form>
</template>

<script>
import { VTextField, VAutocomplete } from 'vuetify/lib'
import DatePicker from '@/components/AppBuilder/Form/Components/DatePicker.vue'
import RadioBtnOptions from '@/components/AppBuilder/Form/Components/RadioBtnOptions.vue'
import AppAttachment from '@/components/AppBuilder/Form/Components/Attachment.vue'
import PeopleAutocomplete from '@/components/AppBuilder/Form/Components/PeopleAutocomplete.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'FormShowGenerator',
  components: {
    VTextField,
    DatePicker,
    AppAttachment,
    VAutocomplete,
    RadioBtnOptions,
    PeopleAutocomplete
  },

  props: {
    fields: {
      type: Array,
      default: () => ([])
    },

    panel: {
      type: Object,
      default: () => ({})
    },

    showStandardFields: {
      type: Boolean,
      default: false
    },

    editMode: {
      type: Number,
      default: 0
    }

  },

  data: () => ({
    standardFields: {},
    typeToComponentMapping: {
      'timestamp': { component: 'date-picker' },
      'text': { component: 'v-text-field' },
      'attachment': { component: 'app-attachment' },
      'boolean': { component: 'radio-btn-options' },
      'number': {
        component: 'v-text-field',
        type: 'number'
      },
      'autocomplete': {
        component: 'v-autocomplete',
        multiple: true,
        chips: true,
        clearable: true
      },
      'people': {
        component: 'people-autocomplete',
        multiple: true,
        chips: true,
        clearable: true
      }
    },
    genericRecord: {},
    formRules: {
      standard: [v => !!v || 'This field is required']
    },
    loading: false,
    isEdit: false,
    typesToIds: {},
    complexDataStructs: { autocomplete: true, people: true },
    recordToEdit: {},
    statusOptions: ['Published', 'Draft', 'Archived'],
    showIndexFields: []
  }),

  computed: {
    ...mapState('RecordsInstance', {
      currentRecord: 'currentRecord',
      showSelf: 'displayAppBuilderShow'
    })

  },

  methods: {
    ...mapActions('AppBuilder', {
      bulkSaveFieldValues: 'bulkSaveFieldValues',
      getFieldValuesPerPanel: 'getFieldValuesPerPanel',
      updateSomeFieldValues: 'updateSomeFieldValues',
      deleteFieldsByIds: 'deleteFieldsByIds'
    }),

    ...mapMutations('SnackBarNotif', {
      notifDanger: 'notifDanger',
      notifSuccess: 'notifSuccess'
    }),

    ...mapActions('AppBuilder', {
      updateRecord: 'updateRecord'
    }),

    saveStandardFields() {
      return new Promise((resolve, reject) => {
        if (this.showStandardFields) {
          this.updateRecord(this.recordToEdit)
            .then(res => resolve(res))
            .catch(e => reject(e))
        }

        return resolve()
      })
    },

    async creating() {
      try {
        this.loading = true

        const payload = {
          record_id: this.currentRecord.id || this.$route.params.id,
          fields: []
        }
        for (let x = 0; x < this.fields.length; x++) {
          const f = this.fields[x]
          const value = this.$h.dg(this.genericRecord, `${f.id}`, '')

          if (!value) continue

          if (Array.isArray(value)) {
            const res = value.map(v => ({
              value: v,
              field_id: f.id
            }))
            payload.fields = [...payload.fields, ...res]
          } else {
            payload.fields.push({ value, field_id: f.id })
          }
        }

        await this.bulkSaveFieldValues(payload)
        await this.saveStandardFields()

        this.notifSuccess('The values were saved')
        this.loading = false
      } catch (e) {
        this.notifDanger('The was an error while saving')
        this.loading = false
      }
    },

    async updating() {
      try {
        this.loading = true

        const complexTypes = this.fields.filter(f => this.complexDataStructs[f.type]).map(f => f.id)
        const newGenericRecord = { ...this.genericRecord }

        complexTypes.forEach(id => {
          delete newGenericRecord[id]
        })

        const deleteArr = []
        const createObj = {}

        complexTypes.forEach(a => {
          const { toDelete, toCreate } = this.findTheDifference(this.typesToIds[a], this.genericRecord[a], a)
          const fieldType = this.fields.find(f => f.id === a).type

          if (toDelete.length) deleteArr.push({ values: toDelete, fieldType })
          createObj[a] = toCreate
        })

        const payload = {
          record_id: this.$route.params.id,
          fields: []
        }

        payload.fields = this.createFieldsPayload(newGenericRecord)

        const payloadToCreate = {
          record_id: this.$route.params.id,
          fields: []
        }
        payloadToCreate.fields = this.createFieldsPayload(createObj)
        await this.updateSomeFieldValues(payload)
        await this.bulkSaveFieldValues(payloadToCreate)
        if (deleteArr.length) {
          await this.deleteFieldsByIds({
            deleteArr
          })
        }
        await this.saveStandardFields()

        this.notifSuccess('The values were updated')
        this.loading = false
      } catch (e) {
        this.notifDanger('The was an error while updated')
        this.loading = false
      }
    },

    createFieldsPayload(record) {
      let fields = []

      for (let x = 0; x < this.fields.length; x++) {
        const f = this.fields[x]
        let value = this.$h.dg(record, `${f.id}`, '')

        if (!value) continue

        if (Array.isArray(value)) {
          const res = value.map(v => ({
            value: v,
            field_id: f.id
          }))
          fields = [...fields, ...res]
        }
        if (Object.prototype.toString.call(value) == '[object Object]') {
          delete value['created_at']
          delete value['updated_at']
        } else {
          if (value == 'true' || value == 'false') value = value == 'true'
          fields.push({ value, field_id: f.id })
        }
      }

      return fields
    },

    findTheDifference(reference, newData, fieldId) {
      const toDelete = reference.filter(r => !newData.includes(r.value)) || []

      const transformedArray = reference.map(r => r.value)
      const toCreate = newData.filter(a => !transformedArray.includes(a))

      return { toDelete, toCreate }
    },

    async loadingData() {
      if (this.$route.name === 'record.show') {
        try {
          this.loading = true

          const res = await this.getFieldValuesPerPanel({
            recordID: this.$route.params.id,
            panelID: this.panel.id
          })
          this.genericRecord = { ...res.values }
          this.typesToIds = res.typesToIds
          this.isEdit = true

          this.loading = false
        } catch (e) {
          this.loading = false
        }
      }
    }

  },

  watch: {
    $route(oldVal, newVal) {
      this.loadingData()
    }
  },

  mounted() {
    this.loadingData()
    this.recordToEdit = { ...this.currentRecord }
  }

}
</script>
