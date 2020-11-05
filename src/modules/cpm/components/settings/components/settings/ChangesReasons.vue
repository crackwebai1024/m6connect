<template>
  <div>
    <v-card>
      <v-card-title style="position:relative">
        <portal
          v-if="included"
          to="financialChanges-0"
        >
          <v-btn
            absolute
            color="white"
            dark
            fab
            right
            small
            @click="createModal"
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
          @click="createModal"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="form-group">
          <label v-if="!included">Current Reasons</label>
          <v-data-table
            class="elevation-0"
            :headers="headers"
            :items="reasons"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">
                <v-icon
                  class="ml-0 mr-2"
                  color="#757575"
                  size="20"
                  style="cursor: pointer"
                  @click.prevent="editElement(props.item)"
                >
                  edit
                </v-icon>

                <v-icon
                  class="ml-0 mr-0"
                  color="#f44336"
                  size="20"
                  style="cursor: pointer"
                  @click.prevent="deleteElement(props.item)"
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
            Changes Reasons
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="element.name"
              color="blue"
              label="Changes Reason Name"
              :rules="[rules.required]"
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
              @click="executeAction"
            >
              {{ action }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <M6ConfirmDelete
      :show="showConfirmDelete"
      title="Delete Reason"
      @cancel="showConfirmDelete = false"
      @confirm="submitDelete"
    />
  </div>
</template>

<script>
import { db } from '@/utils/Firebase.js'
import { mapState } from 'vuex'
export default {
  name: 'ChangesReasons',
  props: {
    included: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('Companies', {
      currentCompany: 'currentCompany'
    })
  },
  data() {
    return {
      action: '',
      reasons: [],
      element: {},
      reasonToDelete: null,
      currentElement: '',
      showForm: false,
      showConfirmDelete: false,
      rules: {
        required: value => !!value || 'This field is required'
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
      ],
      reasonsRef: db
        .collection('settings')
        .doc(this.currentCompany.id)
        .collection('settings')
        .doc('changes')
        .collection('reasons')
    }
  },
  methods: {
    executeAction() {
      this.$refs.form.validate()
      if (!this.element.name) {
        this.$snotify.warning('Changes Reason name is required', 'Error')
        return
      }
      switch (this.action) {
        case 'Create':
          this.create()
          break
        case 'Update':
          this.update()
          break
        default:
          break
      }
    },
    create() {
      this.reasonsRef
        .add(this.element)
        .then(() => {
          this.$snotify.success('The Changes Reason has been saved', 'Success')
          this.cancel()
        })
        .catch(() => {
          this.$snotify.error('Error creating Reason Change')
        })
    },
    update() {
      if (!this.element.id) return
      this.reasonsRef
        .doc(this.element.id)
        .update(this.element)
        .then(() => {
          this.$snotify.success(
            'The Changes Reason has been updated',
            'Success'
          )
          this.cancel()
        })
        .catch(() => {
          this.$snotify.error('Error updating Reason Change')
        })
    },
    deleteElement(item) {
      this.reasonToDelete = item
      this.showConfirmDelete = true
    },
    submitDelete() {
      if (!this.reasonToDelete.id) return
      this.reasonsRef
        .doc(this.reasonToDelete.id)
        .delete()
        .then(() => {
          this.$snotify.success(
            'The Changes Reason has been deleted',
            'Success'
          )
          this.showConfirmDelete = false
        })
        .catch(() => {
          this.$snotify.error('Error deleting Reason Change')
        })
    },
    editElement(item) {
      this.element = { id: item.id, ...item }
      this.action = 'Update'
      this.showForm = true
    },
    cancel() {
      this.element = {}
      this.showForm = false
    },
    createModal() {
      this.action = 'Create'
      this.showForm = true
    }
  },
  firestore() {
    return {
      reasons: this.reasonsRef
    }
  }
}
</script>
