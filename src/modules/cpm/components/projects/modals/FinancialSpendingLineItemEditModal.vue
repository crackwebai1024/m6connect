<template>
  <!-- Line item dialog -->
  <v-dialog
    v-model="show"
    max-width="600px"
    persistent
    scrollable
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title
        class="green headline lighten-2"
        primary-title
        style="color: white;"
      >
        {{ $t('cpm.projects.spending') }}
        {{ $tc('cpm.projects.lineItem', 1) }}
      </v-card-title>
      <v-card-text>
        <v-form
          ref="formExpandedSpendingLineItem"
          v-model="validLineItem"
        >
          <v-container
            class="pa-0"
            fluid
            grid-list-md
          >
            <v-layout wrap>
              <v-flex
                md6
                sm12
              >
                <v-text-field
                  v-model="lineItemDraft.number"
                  color="blue"
                  :label="`${$tc('general.invoice', 1)} #`"
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex
                md6
                sm12
              >
                <v-text-field
                  v-model="lineItemDraft.po_number"
                  color="blue"
                  :label="$t('cpm.projects.poNumber')"
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
                sm12
              >
                <v-text-field
                  v-model="lineItemDraft.project_name"
                  color="blue"
                  :label="$t('general.projectName')"
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex
                md6
                sm12
              >
                <v-text-field
                  v-model="lineItemDraft.line_number"
                  color="blue"
                  :label="`${$t('general.line')} #`"
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
                sm12
              >
                <label class="money-fix v-input v-label">{{
                  $t('general.amount')
                }}</label>
                <money v-model="lineItemDraft.amount" />
              </v-flex>
              <v-flex
                md6
                sm12
              >
                <v-text-field
                  v-model="lineItemDraft.category"
                  color="blue"
                  :label="$tc('general.category', 1)"
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
                sm12
              >
                <v-autocomplete
                  v-model="lineItemDraft.vendor"
                  clearable
                  item-text="title"
                  :items="vendors"
                  :label="$t('cpm.projects.vendorName')"
                  return-object
                  :rules="[rules.required]"
                />
              </v-flex>
              <v-flex
                md6
                sm12
              >
                <v-text-field
                  v-model="lineItemDraft.status"
                  :label="$t('general.status')"
                />
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex
                md6
                sm12
              >
                <v-dialog
                  ref="dialogLineItemDateText"
                  v-model="dialogLineItemDateText"
                  full-width
                  lazy
                  persistent
                  :return-value.sync="lineItemDraft.dateText"
                  :rules="[rules.required]"
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="lineItemDraft.dateText"
                      :label="$t('general.date')"
                      prepend-icon="event"
                      readonly
                      :rules="[rules.required]"
                      v-on="on"
                      @blur="
                        date = parseDate(lineItemDraft.dateText)
                      "
                    />
                  </template>
                  <v-date-picker
                    v-model="date"
                    color="green"
                    scrollable
                  >
                    <v-spacer />
                    <v-btn
                      color="primary"
                      flat
                      @click="dialogLineItemDateText = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="primary"
                      flat
                      @click="
                        $refs.dialogLineItemDateText.save(formatDate(date))
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex
                md6
                sm12
              >
                <v-dialog
                  ref="dialogLineItemPaidDateText"
                  v-model="dialogLineItemPaidDateText"
                  full-width
                  lazy
                  persistent
                  :return-value.sync="lineItemDraft.paidDateText"
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="lineItemDraft.paidDateText"
                      :label="$t('general.datePaid')"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      @blur="
                        paidDate = parseDate(
                          lineItemDraft.paidDateText
                        )
                      "
                    />
                  </template>
                  <v-date-picker
                    v-model="paidDate"
                    color="green"
                    scrollable
                  >
                    <v-spacer />
                    <v-btn
                      color="primary"
                      flat
                      @click="dialogLineItemPaidDateText = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="primary"
                      flat
                      @click="
                        $refs.dialogLineItemPaidDateText.save(
                          formatDate(paidDate)
                        )
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
              <v-flex
                md6
                sm12
              >
                <v-text-field
                  v-model="lineItemDraft.account"
                  color="blue"
                  :label="$t('general.account')"
                  :rules="[rules.required]"
                />
              </v-flex>

              <v-flex
                md6
                sm12
              >
                <v-text-field
                  v-model="lineItemDraft.account_category"
                  color="blue"
                  :label="
                    `${$t('general.account')} ${$tc('general.category', 1)}`
                  "
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
                sm12
              >
                <v-text-field
                  v-model="lineItemDraft.aoc_code"
                  color="blue"
                  :label="$t('general.aocCode')"
                  :rules="[rules.required]"
                />
              </v-flex>

              <v-flex
                md6
                sm12
              >
                <v-checkbox
                  v-model="lineItemDraft.reconciled"
                  color="blue"
                  :label="$t('general.reconciled')"
                />
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex
                md6
                sm12
              >
                <v-text-field
                  v-model="lineItemDraft.client_capital_id"
                  color="blue"
                  :label="$t('general.clientCapitalId')"
                  :rules="[rules.required]"
                />
              </v-flex>
            </v-layout>

            <v-layout
              row
              wrap
            >
              <v-flex
                md12
                sm12
              >
                <v-textarea
                  v-model="lineItemDraft.line_description"
                  color="blue"
                  :label="$t('general.lineItemDescr')"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="gray"
          :disabled="loading"
          flat
          :loading="loading"
          @click="closeDialogLineSpending"
        >
          Close
        </v-btn>
        <v-btn
          color="primary"
          :disabled="loading"
          flat
          :loading="loading"
          @click="saveLineItemSpending"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- End line item dialog -->
</template>

<script>
import axios from 'axios'
import { db } from '@/utils/Firebase'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FinancialSpendingLineItemEditModal',
  props: {
    show: { default: false, type: Boolean },
    spendingId: { default: '', type: String },
    projectId: { type: [String, Number], required: true },
    lineItem: { type: Object, default: () => {} }
  },

  data() {
    return {
      validLineItem: true,
      loading: false,
      dialogLineItemDateText: false,
      dialogLineItemPaidDateText: false,
      date: new Date().toISOString().substr(0, 10),
      paidDate: new Date().toISOString().substr(0, 10),
      openDate: new Date().toISOString().substr(0, 10),
      paidDateText: '',
      lineItemDraft: {},
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },

  watch: {
    lineItem(newVal) {
      this.lineItemDraft = { ...newVal }
    }
  },

  computed: {
    ...mapGetters('companies/cpmProjects/general', {
      vendors: 'getVendors'
    })
  },

  methods: {
    ...mapActions('cpm/projects/spending', {
      updateLineItem: 'updateLineItem'
    }),

    closeDialogLineSpending() {
      this.$emit('close')
    },

    checkErrorsLineItem() {
      this.validLineItem = this.$refs.formExpandedSpendingLineItem.validate()
      if (!this.validLineItem) {
        this.$snotify.error(
          this.$t('alerts.pleaseCheckErrors'),
          this.$t('alerts.error')
        )
      }
    },

    async saveLineItemSpending() {
      this.checkErrorsLineItem()

      if (!this.validLineItem) {
        return
      }

      this.loading = true

      await this.updateLineItemSpending()
    },

    updateLineItemSpending() {
      this.loading = true

      const spendingReference = db.collection('cpm_projects')
        .doc(this.projectId)
        .collection('spendings')
        .doc(this.spendingId)

      const data = {
        spendingRef: spendingReference,
        lineItem: this.lineItemDraft,
        lineItemId: this.lineItemDraft.id
      }

      this.updateLineItem(data).then(() => {
        this.loading = false

        this.closeDialogLineSpending()

        this.$snotify.success(
          `${this.$tc('cpm.projects.lineItem', 1)} ${this.$t(
            'general.update'
          )}`,
          this.$t('alerts.success')
        )

        this.updateSpendingTotals()
      })
        .catch(err => {
          console.error(err)
          this.loading = false
          this.$snotify(
            this.$t('general.thereWasError'),
            this.$t('alerts.error')
          )
        })
    },

    updateSpendingTotals(id) {
      return new Promise(async (resolve, reject) => {
        try {
          await axios.post(
            `${
              window.Drupal.settings.m6_platform.f_base.functions.api_url
            }/api/projects/${this.projectId}/update-spendings?spendingId=${id ||
              this.spendingId ||
              ''}`
          )

          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
    },

    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },

    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
