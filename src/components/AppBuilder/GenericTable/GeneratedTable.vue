<template>
    <div>
        <v-data-table
          :headers="headers"
          :items="table.fields"
          :items-per-page="5"
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>{{ table.title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark >Add Row</v-btn>
                </v-toolbar>
            </template>
        </v-data-table>

        <v-dialog v-model="showFormModal">
            <form-show-generator
              :fields="$h.dg(table, 'fields', [])"
              :panel="panel"
              :table="table"
              :show-standard-fields="(tab.readOnly && index === 0)"
            />
        </v-dialog>
    </div>
</template>

<script>
import FormShowGenerator from '@/components/AppBuilder/Form/FormShowGenerator'

export default {
    props: {
        table: {
            type: Object,
            default: () => ({})
        },
        editMode: {
            type: Boolean,
            default: false 
        }
    },

    props: {
        FormShowGenerator
    },

    data: () => ({
        showFormModal: false
    }),
    
    computed: {
        headers() {
           return this.table.fields.map( f => ({ text: f.label, value: f.label }) )
        }
    },

}
</script>