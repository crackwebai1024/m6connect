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

        }
    }
}
</script>