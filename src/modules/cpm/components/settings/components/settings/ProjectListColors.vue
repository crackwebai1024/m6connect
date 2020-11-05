<template>
  <div>
    <v-card>
      <v-card-title style="position:relative">
        <label>Current Project List Colors</label>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="colors"
          :pagination.sync="pagination"
        >
          <template v-slot:items="props">
            <td>{{ props.item.label }}</td>
            <td>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    :color="props.item.color"
                    fab
                    small
                    v-on="on"
                    @click="pickingColor(props.item)"
                  >
                    <label for="" />
                  </v-btn>
                </template>
                <span>Click to pick a color</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="showColorDialog"
      persistent
      width="500"
    >
      <v-card class="mt-2">
        <v-card-title
          class="headline"
          style="background: #006699; color:#fff"
        >
          <v-layout align-center>
            Change the color for projects {{ changeColor.label }}
          </v-layout>
        </v-card-title>
        <v-card-text>
          <chrome-picker v-model="changeColor.color" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red"
            flat
            @click="cancelColor"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green"
            flat
            type="submit"
            @click="saveColor"
          >
            {{ submitLoading ? 'Saving...' : 'Save' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from '@/utils/Firebase'
import { mapState, mapGetters } from 'vuex'
import { Chrome } from 'vue-color'

export default {
  components: {
    'chrome-picker': Chrome
  },
  data() {
    return {
      changeColor: { color: '#ffffff' },
      showColorDialog: false,
      colors: [
        { label: 'status', key: 'listStatus', color: '#000000' },
        { label: 'start date', key: 'listStartDate', color: '#000000' }
      ],
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
          value: 'action'
        }
      ],
      showForm: false,
      show: 'categories',
      category: '',
      currentCategory: '',
      categories: '',
      settings: {},
      submitLoading: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  computed: {
    ...mapGetters(['appLabel']),
    ...mapState('Companies', {
      currentCompany: 'currentCompany'
    })
  },
  watch: {
    settings(newVal) {
      if (newVal.projectColors) this.colors = newVal.projectColors
    }
  },
  methods: {
    pickingColor(item) {
      this.changeColor = { ...item }
      this.showColorDialog = true
    },
    cancelColor() {
      this.showColorDialog = false
      this.changeColor = { color: '#ffffff' }
    },
    async saveColor() {
      this.submitLoading = true

      const changedColor = this.colors.filter(
        c => c.key == this.changeColor.key
      )[0]
      if (this.changeColor.color.hex) {
        changedColor.color = this.changeColor.color.hex
      }

      try {
        await db
          .collection('settings')
          .doc(this.currentCompany.id)
          .collection('settings')
          .doc(this.appLabel.settingsCollection)
          .set(
            {
              projectColors: this.colors
            },
            { merge: true }
          )

        this.submitLoading = false

        this.$snotify.success(
          'The Project List Colors have been saved',
          'Success'
        )
        this.cancelColor()
      } catch (e) {
        this.submitLoading = false
        this.cancelColor()
      }
    }
  },
  firestore() {
    return {
      settings: db
        .collection('settings')
        .doc(this.currentCompany.id)
        .collection('settings')
        .doc(this.appLabel.settingsCollection)
    }
  }
}
</script>
