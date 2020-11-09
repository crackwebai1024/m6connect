<template>
  <div>
    <v-card elevation="0">
      <v-card-title style="position:relative">
        <portal
          v-if="included"
          to="commitments-0"
        >
          <v-btn
            class="mt-3"
            absolute
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
          <label v-if="!included">Current Types</label>
          <v-data-table
            :headers="headers"
            :items="settings.status"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td>{{ props.item }}</td>
              <td class="text-right">
                <v-icon
                  class="mr-2"
                  color="#757575"
                  size="20"
                  style="cursor: pointer"
                  @click.prevent="editElement(props.index, props.item)"
                >
                  mdi-pencil
                </v-icon>

                <v-icon
                  class="ml-0 mr-0"
                  color="#f44336"
                  size="20"
                  style="cursor: pointer"
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
      scrollable
    >
      <v-card class="mt-2">
        <v-card-title
          class="headline"
          style="background: #006699; color:#fff"
        >
          <v-row align="center">
            Changes Status
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="element"
            color="blue"
            label="Commitments Status Name"
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
            @click="save"
          >
            {{ submitLoading ? 'Saving...' : 'Save' }}
          </v-btn>
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
      .doc(this.currentCompany.id)
      .collection('settings')
      .doc('commitments')
      .get()
      .then(settings => {
        if (!settings.exists) {
          db.collection('settings')
            .doc(this.currentCompany.id)
            .collection('settings')
            .doc('commitments')
            .set({
              status: []
            })
        }
      })
  },
  methods: {
    save() {
      if (this.element == '') {
        this.$snotify.error('Commitments Status name is required', 'Error')
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
        .doc(this.currentCompany.id)
        .collection('settings')
        .doc('commitments')
        .update({
          status: this.settings.status
        })
      this.$snotify.success('The Commitments Status has been saved', 'Success')
      this.cancel()
    },
    deleteElement(id, name) {
      const confirmation = confirm(
        `Do you want to delete this Commitments Status: ${name}`
      )
      if (confirmation) {
        this.submitDelete(id)
      }
    },
    submitDelete(id) {
      this.settings.status.splice(id, 1)
      db.collection('settings')
        .doc(this.currentCompany.id)
        .collection('settings')
        .doc('commitments')
        .update({
          status: this.settings.status
        })
      this.$snotify.success(
        'The Commitments Status has been deleted',
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
        .doc('commitments')
    }
  }
}
</script>
