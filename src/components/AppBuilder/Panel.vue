<template>
  <div class="mb-3 panel px-4 py-3 relative white">
    <v-btn
      absolute
      icon
      right
      top
      @click="deletePanel"
    >
      <v-icon color="red lighten-3">
        mdi-delete
      </v-icon>
    </v-btn>
    <p class="mb-0 v-card__title">
      {{ panel.title }}
    </p>
    <v-list>
      <v-list-item
        v-for="field in panel.fields"
        :key="field.id"
      >
        <v-list-item-content @click="editField(field)">
          <v-list-item-title>{{ field.label }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            @click="showDelete(field)"
          >
            <v-icon color="red lighten-3">
              mdi-delete
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <div class="align-start d-flex">
      <div class="overflow-hidden w-full">
        <add-field @addNewField="addNewField" />
      </div>
    </div>
    <field
      v-if="showFieldModal"
      :editing="editing"
      :field="activeField"
      :show="showFieldModal"
      @close="showFieldModal = false"
      @result="pushField"
    />
    <v-dialog
      v-model="showDeleteModal"
      width="500"
    >
      <delete-dialog
        :element="fieldToDelete ? 'Field' : 'Panel'"
        @closeDeleteModal="confirmDelete"
      />
    </v-dialog>
  </div>
</template>

<script>
import AddField from '@/components/AppBuilder/Buttons/AddField'
import Field from '@/components/AppBuilder/Modals/Field'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'
export default {
  name: 'Panel',
  components: {
    DeleteDialog,
    AddField,
    Field
  },
  props: {
    panel: {
      default: () => ({}),
      required: false,
      type: Object
    }
  },
  data() {
    return {
      showFieldModal: false,
      showDeleteModal: false,
      editing: false,
      fieldToDelete: null,
      panelToDelete: null,
      activeField: {},
      defaultField: {
        panelID: this.panel.id,
        label: 'New Field',
        type: 'text',
        weight: 0,
        metadata: {
          options: [],
          required: false
        }
      }
    }
  },
  methods: {
    addNewField() {
      this.activeField = { ...this.defaultField }
      this.editing = false
      this.showFieldModal = true
    },
    editField(field) {
      this.activeField = { ...field }
      this.editing = true
      this.showFieldModal = true
    },
    showDelete(field) {
      this.showDeleteModal = true
      this.fieldToDelete = field.id
    },
    async confirmDelete(result) {
      if (result) {
        if (this.fieldToDelete) {
          await this.$store.dispatch('AppBuilder/deleteField', this.fieldToDelete)
          const index = this.panel.fields.map(item => item.id).indexOf(this.fieldToDelete)
          this.panel.fields.splice(index, 1)
        } else if (this.panelToDelete) {
          await this.$store.dispatch('AppBuilder/deletePanel', this.panelToDelete)
          this.$emit('deletePanel', this.panelToDelete)
        }
      }
      this.fieldToDelete = null
      this.panelToDelete = null
      this.showDeleteModal = false
    },
    deletePanel() {
      this.showDeleteModal = true
      this.panelToDelete = this.panel.id
    },
    pushField(pushField) {
      if (this.editing) {
        const index = this.panel.fields.map(item => item.id).indexOf(pushField.id)
        this.panel.fields[index] = { ...pushField }
      } else {
        this.panel.fields.push(pushField)
      }
      this.showFieldModal = false
      this.editing = false
    }
  }
}
</script>
