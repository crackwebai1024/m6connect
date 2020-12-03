<template>
  <div>
    <v-card flat>
      <v-card-title class="relative">
        <portal
          v-if="included"
          to="budget-3"
        >
          <v-btn
            absolute
            class="mt-3"
            color="white"
            dark
            fab
            right
            small
            @click="showForm = true"
          >
            <v-icon color="blue">
              mdi-plus
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
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="form-group">
          <label v-if="!included">Current Budget Categories</label>
          <v-data-table
            :headers="headers"
            :items="settings.lineItemTypes"
            :items-per-page-options="[5,10,15,200]"
            :options.sync="pagination"
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
                  mdi-pencil
                </v-icon>

                <v-icon
                  class="ml-0 mr-2 pointer"
                  color="#f44336"
                  size="20"
                  @click.prevent="deleteElement(props.index, props.item)"
                >
                  mdi-delete
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
    >
      <v-card class="mt-2">
        <v-card-title class="headline px-6 py-4 white">
          <span class="grey--text text--darken-1">
            Budget Line Items
          </span>
        </v-card-title>
        <v-divider class="grey lighten-3" />
        <v-card-text class="vertical-scroll">
          <v-form>
            <v-text-field
              v-model="element"
              color="blue"
              label="Budget Line Item Type Name"
            />
            <input
              v-model="currentElement"
              type="hidden"
            >
            <v-btn
              class="mr-2"
              color="grey"
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
import { mapState } from 'vuex'

export default {
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
          value: 'name'
        },
        {
          text: 'Action',
          value: 'action'
        }
      ]
    }
  },
  mounted() {
    db.collection('settings')
      .doc(this.currentCompany.id)
      .collection('settings')
      .doc('budgets')
      .get()
      .then(settings => {
        if (!settings.exists) {
          db.collection('settings')
            .doc(this.currentCompany.id)
            .collection('settings')
            .doc('budgets')
            .set({
              lineItemTypes: []
            })
        }
      })
  },
  methods: {
    save() {
      if (this.element == '') {
        this.$snotify.error('Budget Line Item Type name is required', 'Error')
        return
      }
      if (this.currentElement === '') {
        if (!this.settings.lineItemTypes) {
          this.settings.lineItemTypes = []
        }
        this.settings.lineItemTypes.push(this.element)
      } else {
        this.$set(
          this.settings.lineItemTypes,
          this.currentElement,
          this.element
        )
      }
      db.collection('settings')
        .doc(this.currentCompany.id)
        .collection('settings')
        .doc('budgets')
        .update({
          lineItemTypes: this.settings.lineItemTypes
        })
      this.$snotify.success(
        'The Budget Line Item Type has been saved',
        'Success'
      )
      this.cancel()
    },
    deleteElement(id, name) {
      const confirmation = confirm(
        `Do you want to delete this budget Line Item Type: ${name}`
      )
      if (confirmation) {
        this.submitDelete(id)
      }
    },
    submitDelete(id) {
      this.settings.lineItemTypes.splice(id, 1)
      db.collection('settings')
        .doc(this.currentCompany.id)
        .collection('settings')
        .doc('budgets')
        .update({
          lineItemTypes: this.settings.lineItemTypes
        })
      this.$snotify.success(
        'The Budget Line Item Type has been deleted',
        'Success'
      )
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
        .doc(this.currentCompany.id)
        .collection('settings')
        .doc('budgets')
    }
  }
}
</script>
