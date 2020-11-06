<template>
  <div>
    <v-card>
      <v-card-text>
        <div class="form-group">
          <label v-if="!included">Current Status</label>
          <v-btn
            absolute
            class="customPosition"
            color="blue"
            dark
            fab
            right
            small
            @click="showForm = true"
          >
            <v-icon>add</v-icon>
          </v-btn>

          <v-data-table
            :headers="headers"
            :items="settings.status"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td>{{ props.item }}</td>
              <td class="text-right">
                <v-icon
                  class="ml-0 mr-2 pointer"
                  color="#757575"
                  size="20"
                  @click.prevent="editElement(props.index, props.item)"
                >
                  edit
                </v-icon>

                <v-icon
                  class="ml-0 mr-0 pointer"
                  color="#f44336"
                  size="20"
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
        <v-card-title class="customBackground headline">
          <v-row align="center">
            Changes Status
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="element"
              color="blue"
              label="Changes Status Name"
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
  name: 'ChangesStatus',
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
      .doc(window.Drupal.settings.m6_platform_header.company_nid)
      .collection('settings')
      .doc('changes')
      .get()
      .then(settings => {
        if (!settings.exists) {
          db.collection('settings')
            .doc(window.Drupal.settings.m6_platform_header.company_nid)
            .collection('settings')
            .doc('changes')
            .set({
              status: []
            })
        }
      })
  },
  methods: {
    save() {
      if (!this.element) {
        this.$snotify.error('Changes Status name is required', 'Error')
        return
      }
      if (this.currentElement === '') {
        if (!this.settings.status) {
          this.settings.status = []
        }
        this.settings.status.push(this.element)
      } else {
        this.$set(this.settings.status, this.currentElement, this.element)
      }
      db.collection('settings')
        .doc(window.Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc('changes')
        .update({
          status: this.settings.status
        })
      this.$snotify.success('The Changes Status has been saved', 'Success')
      this.cancel()
    },
    deleteElement(id, name) {
      const confirmation = confirm(
        `Do you want to delete this Changes Status: ${name}`
      )
      if (confirmation) {
        this.submitDelete(id)
      }
    },
    submitDelete(id) {
      this.settings.status.splice(id, 1)
      db.collection('settings')
        .doc(window.Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc('changes')
        .update({
          status: this.settings.status
        })
      this.$snotify.success('The Changes Status has been deleted', 'Success')
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
        .doc(window.Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc('changes')
    }
  }
}
</script>

<style lang="scss" scoped>
.customPosition {
  top: 5px;
}

.pointer {
  cursor: pointer;
}

.customBackground {
  background: #006699;
  color: #fff;
}
</style>
