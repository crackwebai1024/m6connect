<template>
  <v-dialog
    v-model="show"
    persistent
    width="500"
  >
    <v-card
      class="elevation-0"
    >
      <v-form
        ref="fieldForm"
        @submit.prevent
      >
        <v-card-text>
          <v-text-field
            v-model="field.label"
            label="Field Name"
          />
          <v-autocomplete
            v-model="field.type"
            item-text="label"
            item-value="value"
            :items="types"
            label="Field Type"
          />

          <v-divider class="my-2" />
          <h3>
            Options
          </h3>
          <template v-if="field.type === 'timestamp'">
            <v-select
              v-model="field.metadata.format"
              :items="dateFormats"
              label="Format"
            />
          </template>
          <template v-if="field.type === 'autocomplete'">
            <v-text-field
              v-model="field.metadata.max"
              label="Max Values"
              value="1"
            />
            <v-text-field
              v-model="field.metadata.min"
              label="Min Values"
              value="1"
            />
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
          </template>
          <v-checkbox
            v-model="field.metadata.required"
            color="red"
            hide-details
            label="Required"
            value="red"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="saveField(field)">
            Save
          </v-btn>
          <v-btn @click="closeModal">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
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
      dateFormats: [
        'mm/dd/YYYY',
        'mm/dd/YYYY H:m:s',
        'dd/mm/YYYY H:m:s'
      ],
      types: [
        {
          label: 'Text',
          value: 'text'
        },
        {
          label: 'Number',
          value: 'number'
        },
        {
          label: 'Date',
          value: 'timestamp'
        },
        {
          label: 'People',
          value: 'people'
        },
        {
          label: 'Multiple Choice',
          value: 'autocomplete'
        },
        {
          label: 'Yes / No',
          value: 'boolean'
        }
      ]
    }
  },
  methods: {
    deleteField() {},
    removeOption(index, item) {
      item.splice(index, 1)
    },
    async saveField(field) {
      if (this.editing) {
        const data = await this.$store.dispatch('AppBuilder/updateField', field)
        this.$emit('result', data)
      } else {
        const data = await this.$store.dispatch('AppBuilder/saveField', field)
        this.$emit('result', data)
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
    }
  }
}
</script>
