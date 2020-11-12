<template>
    <v-form ref="form" >

        <v-container fluid>
            <v-row>
                <v-col cols="12" v-for="f in fields" :key="`custom-field-${f.id}`">
                    <component 
                        filled
                        outlined
                        :is=" $h.dg( typeToComponentMapping[f.type], 'component', '')" 
                        :type=" $h.dg( typeToComponentMapping[f.type], 'type', '' ) "
                        :label=" $h.dg( f, 'label', '' ) "
                        :rules=" $h.dg( f, 'metadata.required', false) ? formRules.standard : []" 
                        v-model="genericRecord[`${f.id}`]"
                    />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" >
                    <v-spacer></v-spacer>
                    <v-btn color="green" class="white--text" @click="saving" >Save</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <m6-loading :loading="loading" />
    </v-form>
</template>

<script>
import { VTextField } from 'vuetify/lib'
import DatePicker from '@/components/AppBuilder/Form/Components/DatePicker.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    components: {
        VTextField,
        DatePicker
    },

    props: {
        fields: {
            type: Array,
            default: () => ([])
        }
    },

    data: () => ({
        typeToComponentMapping: {
            'text': { component: 'v-text-field' },
            'number': { component: 'v-text-field', type: 'number'},
            'timestamp': { component: 'date-picker' }
        },
        genericRecord: {},
        formRules: {
            standard: [ v => !!v || 'This field is required', ]
        },
        loading: false
    }),

    computed: {
        ...mapState('RecordsInstance', {
            currentRecord: 'currentRecord',
            showSelf: 'displayAppBuilderShow'
        }),
    },

    methods: {
        ...mapActions('AppBuilder', {
            bulkSaveFieldValues: 'bulkSaveFieldValues'
        }),

        ...mapMutations('SnackBarNotif', {
            notifDanger: 'notifDanger',
            notifSuccess: 'notifSuccess' 
        }),

        async saving() {
            try {
                this.loading = true 

                const payload = { record_id: this.currentRecord.id, fields: [] } 
                for( let x = 0; x < this.fields.length; x++ ) {
                    const f = this.fields[x]
                    payload.fields.push({ value: this.$h.dg(this.genericRecord, `${f.id}`, ''), field_id: f.id })
                }
                console.log('payload=======')
                console.log(payload)
                const res = await this.bulkSaveFieldValues(payload)
                console.log('res=====')
                console.log(res)
                this.notifSuccess('The values were saved')
                this.loading = false 
            } catch(e) {
                this.notifDanger('The was an error while saving')
               this.loading = false  
            }

        }
    }
}
</script>