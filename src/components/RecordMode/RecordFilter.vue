<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="70vw"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-show="showFilterBtn"
          v-bind="attrs"
          class="filter white--text"
          color="primary"
          fab
          small
          v-on="on"
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="blue darken-1 headline white--text">
          Filter Records
        </v-card-title>

        <v-card-text>
          <v-autocomplete
            v-model="fieldsList"
            chips
            item-text="label"
            item-val="id"
            :items="currentAppFields"
            label="App Fields"
            multiple
            return-object
          />

          <filter-form-generator 
            :fields="fieldsList"
            @sendData=" e => filteringData = e "
          />
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            close
          </v-btn>
          <v-btn
            class="white--text"
            color="green"
            @click="setFilter"
          >
            Set Filter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { mapActions, mapMutations } from 'vuex'
import FilterFormGenerator from '@/components/RecordMode/RecordComponents/FilterFormGenerator'
export default {
  components: {
    FilterFormGenerator
  },
  props: {
    showFilterBtn: {
      type: Boolean,
      default: false
    },
    currentAppID: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      dialog: false,
      currentAppFields: [],
      fieldsList: [],
      filteringData: {}
    }
  },

  methods: {
    ...mapActions('AppBuilder', {
      getAppFields: 'getAppFields'
    }),

    ...mapMutations('SnackBarNotif', {
      notifDanger: 'notifDanger',
      notifSuccess: 'notifSuccess'
    }),

    setFilter() {
    },

  },

  watch: {
    async currentAppID(val) {
      if (!val) return
      try {
        this.currentAppFields = await this.getAppFields(val)
      } catch (e) {
        this.notifDanger('There was an error while loading app fields')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  float: right;
  margin-top: -30px;
  margin-right: 10px;
}
</style>
