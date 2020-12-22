<template>
    <div>
        <v-data-table
          :headers="headers"
          :items="tableDataRows"
          :items-per-page="5"
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>{{ table.title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addRow" dark >Add Row</v-btn>
                </v-toolbar>
            </template>

            <template v-for="(c, i) in columns" v-slot:[`item.${c}`]="{ item }" >
                <div class="pa-0 ma-0" :key="`table-c-${i}`" >
                    {{ item[c] }}
                </div>
            </template>

            <template v-slot:item.actions="{ item }">
               <v-btn color="green darken-2" x-small icon fab @click="editing(item)" >
                    <v-icon>mdi-pencil</v-icon>   
                </v-btn> 
                <v-btn color="red darken-2" x-small icon fab @click="deleting(item)" >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>

        <v-dialog v-model="showFormModal" persistent>
            <v-card>
                <v-card-title class="headline blue darken-2 white--text" >
                    Edit A Table Record
                    <v-spacer></v-spacer>
                    <v-btn icon fab dark @click="showFormModal = false" >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="pa-5">
                    <form-show-generator
                    :fields="$h.dg(table, 'fields', [])"
                    :table="table"
                    inheritedEditMode
                    :data="currentGenericRecord"
                    @closing="closing"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>

        <m6-loading :loading="loading" />
    </div>
</template>

<script>
import FormShowGenerator from '@/components/AppBuilder/Form/FormShowGenerator'
import { mapActions, mapMutations } from 'vuex'

export default {
    props: {
        table: {
            type: Object,
            default: () => ({})
        },
        editMode: {
            type: Boolean,
            default: false 
        },
        recordID: {
            type: Number,
            default: 0
        }
    },

    components: {
        FormShowGenerator
    },

    data: () => ({
        showFormModal: false,
        loading: false,
        tableDataRows: [],
        currentGenericRecord: {}
    }),

    methods: {
        ...mapActions('AppTables', {
           createAppTableRow: 'createAppTableRow',
           getTableRowValues: 'getTableRowValues',
           deleteTableRowByID: 'deleteTableRowByID'
        }),

        ...mapMutations('SnackBarNotif', {
            notifDanger: 'notifDanger',
            notifSuccess: 'notifSuccess'
        }),

        async deleting(row) {
            try {
                this.loading = true 
                await this.deleteTableRowByID(row.metadata.tableRowID)
                this.loading = false
                this.tableDataRows = this.tableDataRows.filter( t => t.metadata.tableRowID != row.metadata.tableRowID )
                this.notifSuccess('The row was deleted')
            } catch(e) {
                this.loading = false
                this.notifDanger('There was an error while deleting')
            }
        },

        closing(genericData) {
            this.showFormModal = false
            const index = this.tableDataRows.map( t => this.$h.dg(t, 'metadata.tableRowID', '' )).indexOf(this.$h.dg(this.currentGenericRecord, 'metadata.tableRowID', 0))
            if( index > -1 ) {
                this.tableDataRows[index] = { ...this.currentGenericRecord, ...genericData }
                this.tableDataRows = [...this.tableDataRows]
            } else {
                this.tableDataRows.push({ ...this.currentGenericRecord, ...genericData })
            }
            this.$nextTick( () => {
                this.currentGenericRecord = {}
            })
        },

        async addRow() {
            try {
                this.loading = true
                const createdTableRow = await this.createAppTableRow({ tableId: this.table.id, recordId: this.recordID })
                this.currentGenericRecord = { metadata: { typesToIds: {}, tableRowID: createdTableRow.id } }
                this.loading = false
                this.$nextTick(() => {
                    this.showFormModal = true
                })
            } catch(e) {
                this.notifDanger('There was an error while creating the row')
                this.loading = false
            }
        },

        editing(row) {
            this.currentGenericRecord = row
            this.$nextTick( () => {
                this.showFormModal = true
            })
        }
    },
    
    computed: {
        headers() {
            const fields = [...this.table.fields]
            fields.sort(function(a,b){ return a.order - b.order })
            let headers = fields.map( f => ({ text: f.label, value: f.id }) )
            headers.push({ text: 'Actions', value: 'actions' })
            return headers
        },
        
        columns() {
            const columns = this.table.fields.map( t => t.id)
            return columns
        },
    },

    async mounted() {
        try {
            this.tableDataRows = await this.getTableRowValues({ tableID: this.table.id, recordID: this.recordID })
        } catch(e) {
            this.notifDanger('There was an error while getting data')
        }
    }

}
</script>