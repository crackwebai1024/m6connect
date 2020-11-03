<template>
  <div>
    <v-card>
      <v-card-title style="position:relative">
        <v-btn
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
          <label>Current {{ appLabel.singular }} Licenses</label>

          <v-data-table
            :headers="headers"
            :items="settings.licenses"
            :pagination.sync="pagination"
          >
            <template v-slot:items="props">
              <td>{{ props.item }}</td>
              <td class="text-xs-right">
                <v-btn
                  flat
                  icon
                  small
                  @click.prevent="edit(props.index, props.item)"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn
                  flat
                  icon
                  small
                  @click.prevent="deleteLicense(props.index, props.item)"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
    </v-card>
    <v-card
      v-if="showForm"
      class="mt-2"
    >
      <v-card-text>
        <v-form ref="form">
          <h6
            v-if="currentLicense"
            class="indigo--text"
          >
            Editing:
          </h6>
          <v-text-field
            v-model="license"
            color="blue"
            :label="`${appLabel.singular} License Name`"
          />
          <input
            v-model="currentLicense"
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
  </div>
</template>

<script>
import { db } from '@/utils/Firebase.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      license: '',
      currentLicense: '',
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
  computed: {
    ...mapGetters(['appLabel'])
  },
  mounted() {
    db.collection('settings')
      .doc(Drupal.settings.m6_platform_header.company_nid)
      .collection('settings')
      .doc('projects')
      .get()
      .then(settings => {
        if (!settings.exists) {
          db.collection('settings')
            .doc(Drupal.settings.m6_platform_header.company_nid)
            .collection('settings')
            .doc('projects')
            .set({
              licenses: []
            })
        }
      })
  },
  methods: {
    save() {
      if (this.license == '') {
        this.$snotify.error(
          `${this.appLabel.singular} license name is required`,
          'Error'
        )
        return
      }
      if (this.currentLicense === '') {
        if (!this.settings.licenses) {
          this.settings.licenses = []
        }
        this.settings.licenses.push(this.license)
      } else {
        this.$set(this.settings.licenses, this.currentLicense, this.license)
      }
      db.collection('settings')
        .doc(Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc('projects')
        .update({
          licenses: this.settings.licenses
        })
      this.$snotify.success(
        `The ${this.appLabel.singular} license has been saved`,
        'Success'
      )
      this.cancel()
    },
    deleteLicense(id, name) {
      const confirmation = confirm(
        `Do you want to delete this ${this.appLabel.singular} license: ${name}`
      )
      if (confirmation) {
        this.submitDelete(id)
      }
    },
    submitDelete(id) {
      this.settings.licenses.splice(id, 1)
      db.collection('settings')
        .doc(Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc('projects')
        .update({
          licenses: this.settings.licenses
        })
      this.$snotify.success(
        `The ${this.appLabel.singular} license has been deleted`,
        'Success'
      )
    },
    edit(id, name) {
      this.license = name
      this.currentLicense = id
      this.showForm = true
    },
    cancel() {
      this.license = ''
      this.currentLicense = ''
      this.showForm = false
    }
  },
  firestore() {
    return {
      settings: db
        .collection('settings')
        .doc(Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc('projects')
    }
  }
}
</script>
