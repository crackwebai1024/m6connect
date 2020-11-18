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
                        :items="$h.dg( f, 'metadata.options', [] )"
                        :multiple="$h.dg(typeToComponentMapping[f.type], 'multiple', false)"
                        :chips="$h.dg(typeToComponentMapping[f.type], 'chips', false)"
                        :clearable="$h.dg( typeToComponentMapping[f.type], 'clearable', false )"
                    />
                </v-col>
            </v-row>

            <v-row v-if="fields.length > 0" >
                <v-col cols="12" >
                    <v-spacer></v-spacer>
                    <v-btn v-if="isEdit" color="green" class="white--text" @click="updating" >update</v-btn>
                    <v-btn v-else color="green" class="white--text" @click="creating" >save</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <m6-loading :loading="loading" />
    </v-form>
</template>

<script>
import { VTextField, VAutocomplete } from 'vuetify/lib'
import DatePicker from '@/components/AppBuilder/Form/Components/DatePicker.vue'
import RadioBtnOptions from '@/components/AppBuilder/Form/Components/RadioBtnOptions.vue'
import PeopleAutocomplete from '@/components/AppBuilder/Form/Components/PeopleAutocomplete.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    components: {
        VTextField,
        DatePicker,
        VAutocomplete,
        RadioBtnOptions,            
        PeopleAutocomplete
    },

    props: {
        fields: {
            type: Array,
            default: () => ([])
        },

        panel: {
            type: Object,
            default: () => ({})
        }
    },

    data: () => ({
        typeToComponentMapping: {
            'text': { component: 'v-text-field' },
            'number': { component: 'v-text-field', type: 'number' },
            'timestamp': { component: 'date-picker' },
            'autocomplete': { component: 'v-autocomplete' ,multiple: true, chips: true, clearable: true },
            'boolean': { component: 'radio-btn-options' },
            'people': { component: 'people-autocomplete', multiple: true, chips: true, clearable: true }
        },
        genericRecord: {},
        formRules: {
            standard: [ v => !!v || 'This field is required', ]
        },
        loading: false,
        isEdit: false,
        typesToIds: {},
        complexDataStructs: { autocomplete: true, people: true }
    }),

    computed: {
        ...mapState('RecordsInstance', {
            currentRecord: 'currentRecord',
            showSelf: 'displayAppBuilderShow'
        }),
    },

    methods: {
        ...mapActions('AppBuilder', {
            bulkSaveFieldValues: 'bulkSaveFieldValues',
            getFieldValuesPerPanel: 'getFieldValuesPerPanel',
            updateSomeFieldValues: 'updateSomeFieldValues',
            deleteFieldsByIds: 'deleteFieldsByIds'
        }),

        ...mapMutations('SnackBarNotif', {
            notifDanger: 'notifDanger',
            notifSuccess: 'notifSuccess' 
        }),

        async creating() {
            try {
                this.loading = true 

                const payload = { record_id: this.currentRecord.id || this.$route.params.id, fields: [] } 
                for( let x = 0; x < this.fields.length; x++ ) {

                    const f = this.fields[x]
                    const value = this.$h.dg(this.genericRecord, `${f.id}`, '')
                    
                    if( !value ) continue
                    
                    if( Array.isArray(value) ) {
                        const res = value.map( v => ({ value: v,  field_id: f.id }) )
                        payload.fields = [...payload.fields, ...res]
                    } else {
                        payload.fields.push({ value, field_id: f.id })
                    }
                }

                await this.bulkSaveFieldValues(payload)

                this.notifSuccess('The values were saved')
                this.loading = false 
            } catch(e) {
                this.notifDanger('The was an error while saving')
               this.loading = false  
            }
        },

        async updating() {
            try {
                this.loading = true 

                const complexTypes = this.fields.filter( f => this.complexDataStructs[f.type] ).map( f => f.id)
                const newGenericRecord = {...this.genericRecord} 

                complexTypes.forEach( id => {
                    delete newGenericRecord[id]
                })

                let deleteArr = []
                let createObj = {}

                complexTypes.forEach( a => {
                    const { toDelete, toCreate } = this.findTheDifference( this.typesToIds[a], this.genericRecord[a], a)
                    const fieldType = this.fields.find( f => f.id == a ).type

                    deleteArr.push({ values: toDelete, fieldType })
                    createObj[a] = toCreate
                })

                const payload = { record_id: this.$route.params.id, fields: [] } 

                payload.fields = this.createFieldsPayload(newGenericRecord)

                const payloadToCreate = { record_id: this.$route.params.id, fields: [] }
                payloadToCreate.fields = this.createFieldsPayload(createObj)

                await this.updateSomeFieldValues(payload)
                await this.bulkSaveFieldValues(payloadToCreate)
                if( deleteArr.length ) await this.deleteFieldsByIds({ deleteArr })

                this.notifSuccess('The values were updated')
                this.loading = false 
            } catch(e) {
                this.notifDanger('The was an error while updated')
                this.loading = false  
            }
        },

        createFieldsPayload(record) {
            let fields = [] 

            for( let x = 0; x < this.fields.length; x++ ) {

                const f = this.fields[x]
                const value = this.$h.dg(record, `${f.id}`, '')
                
                if( !value ) continue
                
                if( Array.isArray(value) ) {
                    const res = value.map( v => ({ value: v,  field_id: f.id }) )
                    fields = [...fields, ...res]
                } else {
                    fields.push({ value, field_id: f.id })
                }
            }

            return fields
        },

        findTheDifference(reference, newData, fieldId) {
            const toDelete = reference.filter( r => !newData.includes( r.value ) )

            const transformedArray = reference.map( r => r.value )                                                                    
            const toCreate = newData.filter( a => !transformedArray.includes(a)) 

            return { toDelete, toCreate }
        },

        async loadingData() {
            if( this.$route.name == 'record.show' ){
                try {
                    this.loading = true 
                    
                    const res = await this.getFieldValuesPerPanel({ recordID: this.$route.params.id, panelID: this.panel.id })
                    this.genericRecord = {...res.values} 
                    this.typesToIds = res.typesToIds
                    this.isEdit = true

                    this.loading = false
                } catch(e) {
                    this.loading = false
                }
            }
        }

    },

    watch: {
        $route(oldVal, newVal) {
            this.loadingData()
        }
    },

    mounted() {
       this.loadingData()
    },

}
</script>