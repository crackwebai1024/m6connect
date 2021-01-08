<template>
  <div>
    <v-card>
      <v-card-text>
        <v-text-field label="Table Title" v-model="table.title" />
        <add-field @addNewField="addNewField" />

        <v-data-table
          :headers="headers"
          :items="table.fields"
          :items-per-page="5"
        >
          <template v-slot:body="props">
            <draggable
              :list="table.fields"
              tag="tbody"
            >
              <template v-if="props.items.length === 0">
                <tr>
                  <td colspan="2">
                    no fields
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr
                  v-for="(row, index) in props.items"
                  :key="index"
                >
                  <td>{{ row.label }}</td>
                  <td>
                    <v-btn fab icon x-small color="green darken-1" @click="editingField(row)" >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn fab icon x-small color="red darken-1" @click="deletingField(row)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </draggable>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions >
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" class="white--text" @click="$emit('close')" >Close</v-btn>
        <v-btn color="green" class="white--text" @click="updatingTable" >Update</v-btn>
      </v-card-actions>
    </v-card>

    <field
      v-if="showFieldModal"
      :show="showFieldModal"
      :editing="editing"
      :field="activeField"
      @close="showFieldModal = false"
      @result="pushField"
    />

    <m6-loading :loading="loading" />
  </div>
</template>

<script>
import AddField from '@/components/AppBuilder/Buttons/AddField'
import Field from '@/components/AppBuilder/Modals/Field'
import { mapMutations, mapActions } from 'vuex'
import Draggable from 'vuedraggable'

export default {
  props: {
    table: {
      default: () => ({}),
      type: Object
    }
  },

  components: {
    AddField,
    Field,
    Draggable
  },

  data: () => ({
    showFieldModal: false,
    editing: false,
    defaultField: {
      // eslint-disable-next-line camelcase
      // table_id: this.table.id,
      label: 'New Field',
      type: 'text',
      weight: 0,
      metadata: {
        options: [],
        required: false
      },
      // eslint-disable-next-line camelcase
      referenced_field: null
    },
    activeField: {},
    editing: false,
    headers: [ 
      { text: 'Field Name',value: "fieldName" }, 
      { text: 'Actions', value: 'action', sortable: false } 
    ],
    loading: false,
    fieldsOriginal: []
  }),

  methods: {
    ...mapActions('AppBuilder', {
      deleteField: 'deleteField'
    }),

    ...mapActions('AppTables', {
      getTableFields: 'getTableFields',
      updateFieldsList: 'updateFieldsList',
      updateTable: 'updateTable'
    }),
    
    ...mapMutations('SnackBarNotif', {
      notifDanger: 'notifDanger',
      notifSuccess: 'notifSuccess'
    }),


    editingField(field) {
      this.activeField = { ...field }
      this.editing = true
      this.showFieldModal = true
    },
    async deletingField(field) {
      try {
        this.loading = true
        await this.deleteField(field.id)
        this.loading = false
        const fields = this.table.fields.filter( f => f.id != field.id )
        const table = { ...this.table, fields }
        this.$emit('updateTable', table)
      } catch(e) {
        this.notifDanger('There was an error while deleting the field')
      }
    },
    addNewField() {
      this.activeField = { ...this.defaultField, table_id: this.table.id}
      this.$nextTick(() => {  
        this.showFieldModal = true 
      })
    },

    pushField(pushField) {
      if (this.editing) {
        const index = this.table.fields.map(item => item.id).indexOf(pushField.id)
        let table = {...this.table}
        table.fields[index] = { ...pushField }
        this.$emit('updateTable', table)
      } else {
        let table = {...this.table}
        table.fields.push(pushField) 
        this.$emit('updateTable', table)
      }

      this.showFieldModal = false
      this.editing = false
    },

    async updatingTable() {
      try {
        this.loading = true
        await this.updateTable(this.table)
        if( Boolean(this.$h.dg( this.table, 'fields', []).length) ) {
          this.table.fields.map((f, index) => {
            f.order = index
          })
          await this.updateFieldsList({ fields: this.table.fields })
        }
      
        this.$emit('updateTable', this.table)
        this.loading = false
      } catch(e) {
        this.notifDanger('There was an error while updating the table')
        this.loading = false
      }
    },
  },

  watch: {
    table: {
      handler: function(val) {
        this.fieldsOriginal = [...val.fields]
        val.fields = val.fields.sort(function(a,b){ return a.order - b.order })
      },
      immediate: true
    }
  },

  async mounted() {
    try {
      if(this.$h.dg(this.table, 'fields', '').length) return 
      let table = {...this.table}
      table.fields =  await this.getTableFields(this.table.id)
      this.$emit('updateTable', table)
    } catch(e) {
      this.notifDanger('There was an error while getting the tables\' fields')
    }
  }
}
</script>
