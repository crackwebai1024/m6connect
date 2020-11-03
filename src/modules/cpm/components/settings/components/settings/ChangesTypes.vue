<template>
  <div>
    <v-card>
      <v-card-title style="position:relative">
        <portal
          v-if="included"
          to="financialChanges-2"
        >
          <v-btn
            absolute
            color="white"
            dark
            fab
            right
            small
            @click="showForm = true"
          >
            <v-icon color="blue">
              add
            </v-icon>
          </v-btn>
        </portal>
        <v-btn
          v-else
          absolute
          color="blue"
          dark
          fab
          right
          small
          @click="showForm = true"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="form-group">
          <label v-if="!included">Current Types</label>
          <v-data-table
            :headers="headers"
            :items="settings.types"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td>{{ props.item }}</td>
              <td class="text-xs-right">
                <v-icon
                  class="ml-0 mr-2"
                  color="#757575"
                  size="20"
                  style="cursor: pointer"
                  @click.prevent="editElement(props.index, props.item)"
                >
                  edit
                </v-icon>

                <v-icon
                  class="ml-0 mr-0"
                  color="#f44336"
                  size="20"
                  style="cursor: pointer"
                  @click.prevent="deleteElement(props.index, props.item)"
                >
                  delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
    <v-dialog
      v-if="showForm"
      v-model="showForm"
      max-width="800px"
      persistent
      scrollable
    >
      <v-card class="mt-2">
        <v-card-title
          class="headline"
          style="background: #006699; color:#fff"
        >
          <v-layout align-center>
            Changes Types
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="element"
              color="blue"
              label="Changes Type Name"
            />
            <input
              v-model="currentElement"
              type="hidden"
            >
            <v-btn
              color="blue"
              outline
              @click="cancel"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue"
              dark
              type="submit"
              @click="save"
            >
              {{ submitLoading ? 'Saving...' : 'Save' }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from '@/utils/Firebase.js'
export default {
  props: {
    included: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      element: '',
      currentElement: '',
      settings: {},
      submitLoading: false,
      showForm: false,
      rules: {
        required: value => !!value || 'Required.'
      },
      pagination: {
        rowsPerPage: -1
      },
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Action',
          align: 'right',
          value: 'action'
        }
      ]
    }
  },
  mounted() {
    db.collection('settings')
      .doc(Drupal.settings.m6_platform_header.company_nid)
      .collection('settings')
      .doc('changes')
      .get()
      .then(settings => {
        if (!settings.exists) {
          db.collection('settings')
            .doc(Drupal.settings.m6_platform_header.company_nid)
            .collection('settings')
            .doc('changes')
            .set({
              types: []
            })
        }
      })
  },
  methods: {
    save() {
      if (this.element == '') {
        this.$snotify.error('Changes Type name is required', 'Error')
        return
      }
      if (this.currentElement === '') {
        if (!this.settings.types) {
          this.settings.types = []
        }
        this.settings.types.push(this.element)
      } else {
        this.$set(this.settings.types, this.currentElement, this.element)
      }
      db.collection('settings')
        .doc(Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc('changes')
        .update({
          types: this.settings.types
        })
      this.$snotify.success('The Changes Type has been saved', 'Success')
      this.cancel()
    },
    deleteElement(id, name) {
      const confirmation = confirm(
        `Do you want to delete this Changes Type: ${name}`
      )
      if (confirmation) {
        this.submitDelete(id)
      }
    },
    submitDelete(id) {
      this.settings.types.splice(id, 1)
      db.collection('settings')
        .doc(Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc('changes')
        .update({
          types: this.settings.types
        })
      this.$snotify.success('The Changes Type has been deleted', 'Success')
    },
    editElement(id, name) {
      this.element = name
      this.currentElement = id
      this.showForm = true
    },
    cancel() {
      this.element = ''
      this.currentElement = ''
      this.showForm = false
    }
  },
  firestore() {
    return {
      settings: db
        .collection('settings')
        .doc(Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc('changes')
    }
  }
}
</script>
