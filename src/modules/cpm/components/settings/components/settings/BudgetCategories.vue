<template>
  <div>
    <v-card>
      <v-card-title style="position: relative">
        <v-btn
          absolute
          color="blue"
          dark
          fab
          right
          small
          @click="newL1"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <div class="form-group">
          <label>Budget Categories</label>
          <v-list
            class="mainList"
            dense
          >
            <v-list-tile class="myListHeader">
              <v-list-tile-content>Name</v-list-tile-content>
              <v-list-tile-action>Action</v-list-tile-action>
            </v-list-tile>

            <draggable
              v-model="budgetCategories"
              @end="drag = false"
              @start="drag = true"
            >
              <v-list-tile
                v-for="(item, key) in budgetCategories"
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

                <v-list-tile-content>
                  {{ item.code ? item.code + ' -' : '' }} {{ item.name }}
                </v-list-tile-content>

                <v-list-tile-action
                  style="flex-direction:row; justify-content: flex-end;"
                >
                  <v-icon
                    class="ml-0 mr-0"
                    color="#757575"
                    size="20"
                    style="cursor: pointer"
                    @click.stop="edit(item)"
                  >
                    edit
                  </v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </draggable>
          </v-list>
        </div>
      </v-card-text>
    </v-card>

    <!-- adding/editing modal -->
    <v-dialog
      v-if="showForm"
      v-model="showForm"
      max-width="800px"
      persistent
      scrollable
    >
      <v-card>
        <v-card-title
          class="headline"
          style="background: #006699; color:#fff"
        >
          <v-row align="center">
            {{ formTitle }}
          </v-row>
        </v-card-title>

        <v-card-text class="pa-2">
          <v-text-field
            v-model="name"
            color="blue"
            label="Budget Category Name"
          />

          <v-text-field
            v-model="code"
            color="blue"
            label="Code"
          />
          <v-checkbox
            v-model="contingency"
            label="Contingency"
          />
          <v-checkbox
            v-model="highLight"
            label="HighLight"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn
            :disabled="loading"
            flat
            @click="cancel"
          >
            Cancel
          </v-btn>

          <v-btn
            color="blue"
            dark
            flat
            :loading="loading"
            type="submit"
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- adding/editing modal -->
  </div>
</template>

<script>
import { db } from '@/utils/Firebase'
// import * as easings from 'vuetify/es5/util/easing-patterns'
import draggable from 'vuedraggable'
import { mapState } from 'vuex'

export default {
  components: {
    draggable
  },

  props: {
    included: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      budgetCategoriesRef: db
        .collection('settings')
        .doc(this.currentCompany.id)
        .collection('settings')
        .doc('budgets')
        .collection('budget_categories'),
      settings: [],
      loading: false,
      name: '',
      code: '',
      action: '',
      contingency: false,
      highLight: false,
      currentItem: {},
      currentIndex: -1,
      showForm: false,
      formTitle: '',
      options: {
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic'
      },
      // easings: Object.keys(easings),
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
    ...mapState('Companies', {
      currentCompany: 'currentCompany'
    }),
    classOption: function () {
      const classes = []
      if (this.highLight) {
        classes.push('highLight')
      }

      return classes
    },
    budgetCategories: {
      get() {
        return this.settings
          ? this.settings
            .filter(item => !item.budget_category)
            .sort(function (a, b) {
              return a.index - b.index
            })
            .map(item => ({ ...item, id: item.id, children: [] }))
          : []
      },
      set(value) {
        this.settings = value.map((item, index) => {
          if (index !== item.index) {
            this.budgetCategoriesRef.doc(`${item.id}`).update({ index })

            item.index = index
          }

          return item
        })
      }
    }
  },

  methods: {
    newL1() {
      this.action = 'new'
      this.showForm = true
      this.formTitle = 'Create a new Budget Category'
    },

    edit(item) {
      this.action = 'edit'
      this.currentItem = item
      this.name = item.name
      this.code = item.code
      this.contingency = item.contingency || false
      this.highLight = item.highLight || false
      this.showForm = true
      this.$vuetify.goTo(300, this.options)
      this.formTitle = `Editing Category: ${item.name}`
    },

    save() {
      this.loading = true

      if (this.name === '') {
        this.$snotify.error('Budget category name is required', 'Error')
        this.cancel()
        return
      }

      if (!this.code) {
        this.code = ''
      }

      if (!this.budgetCategories) {
        this.budgetCategories = []
      }

      if (this.action === 'new') {
        this.budgetCategoriesRef
          .add({
            name: this.name,
            code: this.code,
            contingency: this.contingency,
            highLight: this.highLight,
            classOption: this.classOption,
            index: this.budgetCategories.length
          })
          .then(() =>
            this.$snotify.success('Budget category created', 'Success')
          )
          .catch(() =>
            this.$snotify.error(
              'Something was wrong creating Budget category',
              'Error'
            )
          )
          .finally(this.cancel)
      } else {
        this.budgetCategoriesRef
          .doc(`${this.currentItem.id}`)
          .update({
            name: this.name,
            code: this.code,
            contingency: this.contingency,
            highLight: this.highLight,
            classOption: this.classOption
          })
          .then(() =>
            this.$snotify.success('Budget category updated', 'Success')
          )
          .catch(() =>
            this.$snotify.error(
              'Something was wrong updating Budget category',
              'Error'
            )
          )
          .finally(this.cancel)
      }
    },

    cancel() {
      this.loading = false
      this.name = ''
      this.code = ''
      this.action = ''
      this.contingency = false
      this.highLight = false
      this.currentItem = {}
      this.currentIndex = -1
      this.showForm = false
    }
  },

  firestore() {
    return {
      settings: this.budgetCategoriesRef
    }
  }
}
</script>

<style lang="scss">
.list-container {
  position: relative;
}
.list-overlay-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.8);
}
</style>
