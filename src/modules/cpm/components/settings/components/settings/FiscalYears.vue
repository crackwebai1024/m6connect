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
          <label>Fiscal Years</label>
          <v-list
            class="mainList"
            dense
          >
            <v-list-tile class="myListHeader">
              <v-list-tile-content>Name</v-list-tile-content>
              <v-list-tile-action>Action</v-list-tile-action>
            </v-list-tile>
            <draggable
              v-model="settings.fiscalYears"
              :options="{ group: 'status' }"
              @end="drag = false"
              @start="drag = true"
              @update="saveOrder"
            >
              <v-list-tile
                v-for="(item, key) in settings.fiscalYears"
                :key="key"
                class="myList"
              >
                <v-list-tile-avatar>
                  <v-icon
                    color="blue"
                    small
                  >
                    drag_indicator
                  </v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>{{ item.name }}</v-list-tile-content>
                <v-list-tile-action
                  style="flex-direction:row; justify-content: flex-end;"
                >
                  <v-btn
                    class="xs-btn"
                    fab
                    flat
                    @click.prevent="editFiscalYear(key, item)"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-btn
                    class="xs-btn"
                    fab
                    flat
                    @click.prevent="deleteFiscalYear(key, item)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </draggable>
          </v-list>
        </div>
      </v-card-text>
    </v-card>

    <v-card
      v-if="showForm"
      class="mt-2"
    >
      <v-card-text>
        <v-form ref="form">
          <v-container
            fluid
            grid-list-md
          >
            <v-layout
              row
              wrap
            >
              <v-flex md12>
                <h6
                  v-if="currentfiscalYear.index"
                  class="indigo--text"
                >
                  Editing:
                </h6>
                <v-text-field
                  ref="name"
                  v-model="currentfiscalYear.name"
                  color="blue"
                  label="Name"
                  :rules="[rules.required]"
                />
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex
                md6
                sm6
                xs12
              >
                <v-dialog
                  ref="dialogStartDate"
                  v-model="modalStartDate"
                  full-width
                  lazy
                  persistent
                  :return-value.sync="currentfiscalYear.startDate"
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="currentfiscalYear.startDate"
                      label="Start date"
                      prepend-icon="event"
                      readonly
                      :rules="[rules.required]"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="currentfiscalYear.startDate"
                    color="blue"
                    header-color="blue"
                    scrollable
                  >
                    <v-spacer />
                    <v-btn
                      color="primary"
                      flat
                      @click="modalStartDate = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="primary"
                      flat
                      @click="
                        $refs.dialogStartDate.save(currentfiscalYear.startDate)
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex
                md6
                sm6
                xs12
              >
                <v-dialog
                  ref="dialogEndDate"
                  v-model="modalEndDate"
                  full-width
                  lazy
                  persistent
                  :return-value.sync="currentfiscalYear.endDate"
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="currentfiscalYear.endDate"
                      label="End date"
                      prepend-icon="event"
                      readonly
                      :rules="[rules.required]"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="currentfiscalYear.endDate"
                    color="blue"
                    header-color="blue"
                    scrollable
                  >
                    <v-spacer />
                    <v-btn
                      color="primary"
                      flat
                      @click="modalEndDate = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="primary"
                      flat
                      @click="
                        $refs.dialogEndDate.save(currentfiscalYear.endDate)
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex md3>
                <v-btn
                  color="blue"
                  outline
                  @click="cancel"
                >
                  Cancel
                </v-btn>
              </v-flex>
              <v-flex md3>
                <v-btn
                  color="blue"
                  dark
                  @click="saveFiscalYear"
                >
                  {{ submitLoading ? 'Saving...' : 'Save' }}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { db } from '@/utils/Firebase'
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
const defaultFiscal = {
  name: '',
  startDate: new Date().toISOString().substr(0, 10),
  endDate: new Date().toISOString().substr(0, 10),
  value: ''
}
export default {
  components: {
    draggable
  },
  data() {
    return {
      name: '',
      fiscalYearId: '',
      settings: {},
      submitLoading: false,
      rules: {
        required: value => !!value || 'Required.'
      },
      currentfiscalYear: { ...defaultFiscal },
      showForm: false,
      modalStartDate: false,
      modalEndDate: false
    }
  },
  computed: {
    ...mapGetters(['appLabel'])
  },
  methods: {
    slugify(str) {
      str = str.replace(/^\s+|\s+$/g, '') // trim
      str = str.toLowerCase()

      // remove accents, swap ñ for n, etc
      const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
      const to = 'aaaaeeeeiiiioooouuuunc------'
      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
      }

      str = str
        .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes

      return str
    },
    getFiscalYear() {
      const aux = { ...this.currentfiscalYear }
      aux.value = this.slugify(aux.name)
      return aux
    },
    saveOrder() {
      db.collection('settings')
        .doc(Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc(this.appLabel.settingsCollection)
        .update({
          fiscalYears: this.settings.fiscalYears
        })
    },
    async saveFiscalYear() {
      if (this.currentfiscalYear.name == '' || this.currentfiscalYear.startDate == '' || this.currentfiscalYear.endDate == '') {
        this.$snotify.error(
          'Please fill all the  fields',
          'Error'
        )
        return
      }
      if (this.fiscalYearId === '') {
        if (!this.settings.fiscalYears) {
          this.settings.fiscalYears = []
        }
        const aux = this.getFiscalYear()
        this.settings.fiscalYears.push(aux)
      } else {
        this.settings.fiscalYears[this.fiscalYearId] = this.getFiscalYear()
      }
      await db.collection('settings')
        .doc(Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc(this.appLabel.settingsCollection)
        .update({
          fiscalYears: this.settings.fiscalYears
        })
      this.$snotify.success(
        `The ${this.appLabel.singular} Fiscal Year has been saved`,
        'Success'
      )
      this.fiscalYearId = ''
      this.currentfiscalYear = { ...defaultFiscal }
      this.showForm = false
    },
    deleteFiscalYear(id, item) {
      const confirmation = confirm(
        `Do you want to delete this ${this.appLabel.singular} Fiscal Year: ${item.name}`
      )
      if (confirmation) {
        this.submitDelete(id)
      }
    },
    submitDelete(id) {
      this.settings.fiscalYears.splice(id, 1)
      db.collection('settings')
        .doc(Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc(this.appLabel.settingsCollection)
        .update({
          fiscalYears: this.settings.fiscalYears
        })
      this.$snotify.success(
        `The ${this.appLabel.singular} Fiscal Year has been deleted`,
        'Success'
      )
    },
    editFiscalYear(id, item) {
      this.currentfiscalYear = { ...item }
      this.fiscalYearId = id
      this.showForm = true
    },
    cancel() {
      this.currentfiscalYear = { ...defaultFiscal }
      this.fiscalYearId = ''
      this.showForm = false
    }
  },
  firestore() {
    return {
      settings: db
        .collection('settings')
        .doc(Drupal.settings.m6_platform_header.company_nid)
        .collection('settings')
        .doc(this.appLabel.settingsCollection)
    }
  }
}
</script>

<style lang="scss" scope>
.mainList {
  border: 1px solid #ccc;
  .v-list__tile__action {
    width: 20%;

    button {
      z-index: 1;
    }
  }
  .myListHeader {
    .v-list__tile__action {
      padding-right: 10px;
    }
  }
  .myList {
    border-bottom: 1px solid #ccc;

    &:first-child {
      border-top: 1px solid #ccc;
    }
    &:nth-child(odd) {
      background: #f9f9f9;
    }
    &:last-child {
      border-bottom: none;
    }
  }
  .v-list__tile__content {
    font-size: 13px;
  }
}
</style>
