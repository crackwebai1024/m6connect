<template>
  <v-dialog
    v-model="showTable"
    persistent
    :scrollable="!loading"
    :width="loading ? '400px' : '90%'"
  >
    <v-card
      v-if="loading"
      color="primary"
      dark
    >
      <v-card-text>
        Please stand by
        <v-progress-linear
          class="mb-0"
          color="white"
          indeterminate
        />
      </v-card-text>
    </v-card>
    <v-card
      v-else
      class="elevation-0"
    >
      <v-card-title>
        
      </v-card-title>
      <v-card-text class="mb-10">
        <v-container>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
          >
            <template v-slot:body="props">
              <draggable
                :list="props.items"
                tag="tbody"
              >
                <tr
                  v-for="(row, index) in props.items"
                  :key="index"
                >
                  <td>{{ row.field }}</td>
                  <td>Edit, Delete</td>
                </tr>
              </draggable>
            </template>
          </v-data-table>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="red"
          text
          @click="closeModal"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Draggable from 'vuedraggable'

import axios from 'axios'

export default {
  name: 'TableView',
  components: {
    Draggable
  },
  props: {
    showTable: Boolean
  },
  data() {
    return {
      loading: true,
      headers: [
        {
          text: 'Field',
          align: 'start',
          sortable: true,
          value: 'field'
        },
        { text: 'Action', value: 'action' }
      ],
      desserts: [
        {
          field: 'Frozen Yogurt'
        },
        {
          field: 'Ice cream sandwich'
        },
        {
          field: 'Eclair'
        }
      ]
    }
  },
  computed: {
    
  },

  mounted() {
    this.loading = false
  },

  methods: {
    closeModal() {
      this.$emit('hideTableModal')
    }
  }
}
</script>
