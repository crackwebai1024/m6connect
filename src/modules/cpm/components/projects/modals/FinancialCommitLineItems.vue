<template>
  <v-dialog
    v-model="show"
    max-width="800px"
    persistent
    scrollable
  >
    <v-card class="contact-edit-modal">
      <v-card-title class="headline">
        <v-row
          v-if="isCreate"
          align="center"
        >
          Create Commitment Line Item
        </v-row>
        <v-row
          v-else
          align="center"
        >
          Edit Commitment Line Item
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-container fluid>
          <v-form ref="form">
            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Title
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  v-model="lineItem.title"
                  color="blue"
                  :rules="titleRules"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Vendor
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <v-autocomplete
                  v-model="lineItem.vendor"
                  clearable
                  item-text="title"
                  :items="vendors"
                  return-object
                >
                  <template
                    slot="item"
                    slot-scope="{ item }"
                  >
                    <v-chip
                      v-if="item.preferred === '1'"
                      color="green lighten-1"
                      dark
                      small
                    >
                      Preferred
                    </v-chip>
                    {{ item.title }}
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Commitment Account
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <v-text-field v-model="lineItem.account" />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Line number
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  v-model="lineItem.line_number"
                  color="blue"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Fiscal year
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  v-model="lineItem.fiscal_year"
                  color="blue"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Amount
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <money
                  v-model="lineItem.amount"
                  v-bind="money"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Cost per item
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <money
                  v-model="lineItem.cost_per_item"
                  v-bind="money"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Invoice total
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <money
                  v-model="lineItem.invoiceTotal"
                  v-bind="money"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Quantity
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <money v-model="lineItem.quantity" />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Quantity amount
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <money
                  v-model="lineItem.quantity_amount"
                  v-bind="money"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Tax amount
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <money
                  v-model="lineItem.tax_amount"
                  v-bind="money"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Total open amount with tax
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <money
                  v-model="lineItem.total_open_amount_w_tax"
                  v-bind="money"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Total PO line amount
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <money
                  v-model="lineItem.total_po_line_amount"
                  v-bind="money"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Description
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <v-textarea
                  v-model="lineItem.description"
                  color="blue"
                />
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Start Date
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <v-menu
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  full-width
                  lazy
                  min-width="290px"
                  :nudge-right="40"
                  offset-y
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="lineItem.startDateText"
                      append-icon="calendar_today"
                      color="blue"
                      label="Start Date"
                      mask="date"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    @change="setStartDate"
                  />
                </v-menu>
              </v-col>
            </v-row>

            <v-row
              align="center"
              justify="center"
            >
              <v-col cols="3">
                <div class="font-weight-black subheading">
                  <v-row>
                    <v-col class="shrink">
                      Delivery Date
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <v-col cols="7">
                <v-menu
                  v-model="deliveryDateMenu"
                  :close-on-content-click="false"
                  full-width
                  lazy
                  min-width="290px"
                  :nudge-right="40"
                  offset-y
                  transition="scale-transition"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="lineItem.deliveryDateText"
                      append-icon="calendar_today"
                      color="blue"
                      label="Delivery Date"
                      mask="date"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="lineItem.deliveryDate"
                    @change="setDeliveryDate"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="$emit('close-only')"
        >
          Cancel
        </v-btn>

        <v-btn
          v-if="isCreate"
          text
          @click="create"
        >
          Create
        </v-btn>

        <v-btn
          v-if="!isCreate"
          text
          @click="update"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
    <m6-loading :loading="showLoading" />
  </v-dialog>
</template>

<script>
import { db } from '@/utils/Firebase'
import { Money } from 'v-money'
import { DateTime } from 'luxon'
import { mapActions } from 'vuex'

export default {
  components: { Money },
  props: {
    show: { default: false },
    commitmentId: { default: '' },
    lineItemId: { default: '' },
    isCreate: { default: false },
    vendors: { default: () => [] }
  },
  data() {
    return {
      showLoading: false,
      startDateMenu: false,
      deliveryDateMenu: false,
      projectRef: db.collection('cpm_projects').doc(this.$route.params.id),
      titleRules: [v => !!v || 'Title is required'],
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '$',
        precision: 2,
        masked: false
      },
      lineItem: {}
    }
  },
  firestore() {
    const aux = {}
    if (this.lineItemId)
    // only if lineItemId is provided
    {
      aux.lineItem = this.projectRef
        .collection('commitments')
        .doc(this.commitmentId + '')
        .collection('line_items')
        .doc(this.lineItemId + '')
    }
    return aux
  },
  computed: {
    startDate: {
      get: function () {
        if (this.lineItem.startDate && this.lineItem.startDate > 0) {
          // return new Date(this.lineItem.startDate).toISOString()
          const date = new Date(this.lineItem.startDate)
          return `${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}`
        }
        return ''
      },
      set: function (newValue) {
        if (newValue) {
          const [year, month, day] = newValue.split('-')
          this.lineItem.startDate = new Date(
            `${month}/${day}/${year}`
          ).getTime()
        } else {
          this.lineItem.startDate = ''
        }
      }
    },
    commitmentRef() {
      if (!this.projectRef || !this.commitmentId) return

      return this.projectRef
        .collection('commitments')
        .doc(this.commitmentId + '')
    }
  },
  methods: {
    ...mapActions('cpm/projects/commitments', {
      createLineItem: 'createLineItem',
      updateLineItem: 'updateLineItem'
    }),
    update() {
      if (!this.$refs.form.validate()) {
        this.$snotify.error('Please fill in all required fields', 'Error')
        return
      }
      this.showLoading = true
      this.updateLineItem({
        commitmentRef: this.commitmentRef,
        lineItem: this.lineItem,
        lineItemId: this.lineItemId
      })
        .then(() => {
          this.showLoading = false
          this.$snotify.success(
            'The line item was successfully updated',
            'Success'
          )
          this.$emit('close')
        })
        .catch(() => {
          this.showLoading = false
          this.$snotify.error(
            'There was an error updating the line item',
            'Error'
          )
          this.$emit('close')
        })
    },
    create() {
      if (!this.$refs.form.validate()) {
        this.$snotify.error('Please fill in all required fields', 'Error')
        return
      }
      this.showLoading = true

      this.createLineItem({
        projectRef: this.projectRef,
        commitmentRef: this.commitmentRef,
        lineItem: this.lineItem
      })
        .then(() => {
          this.showLoading = false
          this.$snotify.success('The line item was added', 'Success')
          this.$emit('close')
        })
        .catch(() => {
          this.showLoading = false
          this.$snotify.error(
            'There was an error creating the line item',
            'Error'
          )
          this.$emit('close')
        })
    },
    setStartDate() {
      this.startDateMenu = false
      const dateObj = DateTime.fromMillis(this.lineItem.startDate)
      this.lineItem.startDateText = dateObj.toFormat('MM/dd/yyyy')
    },
    setDeliveryDate() {
      this.deliveryDateMenu = false
      const [year, month, day] = this.lineItem.deliveryDate.split('-')
      const newFormat = `${month}/${day}/${year}`
      this.lineItem.deliveryDateText = newFormat
    }
  }
}
</script>

<style lang="scss" scoped>
.v-avatar {
  left: 50%;
  transform: translate(-50%);
}

.connected-indicator {
  font-size: 28px !important;
  width: 28px !important;
  position: absolute;
  top: 0;
  right: 0;
  height: 28px !important;
  color: #04d81a;
}

.contact-edit-modal {
  .v-card__title {
    padding: 10px;
    background: #0277bd;
    color: #fff;

    h3 {
      font-weight: 100;
    }
  }
}

.v-select__selection {
  .v-select__selection--comma {
    background-color: rgb(166, 113, 113);
    font-size: 10px;
  }
}
</style>
