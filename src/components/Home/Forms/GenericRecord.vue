<template>
    <v-form 
        ref="form"
    >
        <v-container fluid >
            <v-row>
                <v-col col="12" class="text-center pa-0" >
                    <img
                        v-if=" app.iconLink "
                        alt="App Icon"
                        :src="app.iconLink"
                        class="iconLink"
                    >
                    <v-icon 
                        size="100"
                        v-else
                    >
                        mdi-application
                    </v-icon>
                </v-col>
            </v-row>
            <v-row > 
                <v-col cols="12" >
                    <v-text-field label="Title" v-model="record.title" :rules="rules.generic" filled outlined />
                </v-col>
                <v-col cols="12">
                    <v-autocomplete v-model="record.status" label="Record Status" :rules="rules.generic" filled outlined :items="statusOptions" />
                </v-col>
                <v-col cols="12">
                    <v-textarea label="Description" v-model="record.description" :rules="rules.generic" filled outlined />
                </v-col>                    
            </v-row>
            <v-row>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="cancel()" class="white--text mr-4">
                        Cancel
                    </v-btn>
                    <v-btn color="green darken-2" class="white--text" @click="saveRecord">
                        save 
                    </v-btn>
            </v-row>
        </v-container>
        <m6-loading :loading="loading" />
    </v-form>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
const recordDefault = { app_id: "", record_number: "", title: "", description: "", status: "", author: "", metadata: {} }

export default {
    name: "GenericRecord", 

    props: {
        app: {
            default: () => ({}),
            type: Object
        }
    },

    data: () => ({
        statusOptions: [ 'Published', 'Draft', 'Archived' ],
        loading: false,
        rules: {
            generic: [ v => !!v || 'Item is required' ]
        },
        record: {...recordDefault},
        recordDefault: {...recordDefault}

    }),

    methods: {
        ...mapActions('AppBuilder', {
            createRecord: 'createRecord',
            getLatestRecordNumber: 'getLatestRecordNumber'
        }),

        ...mapMutations('SnackBarNotif', {
            notifDanger: 'notifDanger',
            notifSuccess: 'notifSuccess' 
        }),

        ...mapMutations('RecordsInstance', {
            setDisplayAppBuilderShow: 'setDisplayAppBuilderShow',
            setCurrentRecord: 'setCurrentRecord'
        }),

        cancel(){
            this.$emit('closingGenericRecord')
        },

        close(){
            const recordId = this.record.id
            
            this.record = {...this.recordDefault}
            this.$router.push({ name: "record.show", params: { id: recordId } })
        },

        async saveRecord() {
            try {
                if( !this.$refs.form.validate() ) {
                    this.notifDanger('Please Fill Out The Entire Form')
                    return 
                }
                this.loading = true 
                const res = await this.getLatestRecordNumber({ appId: this.app.id })
                const recordNumber = `${this.app.prefix}#${res.count}-${ new Date().getFullYear() }`

                this.record = { ...this.record, author: this.currentUser.id, recordNumber, appID: this.app.id }

                this.record = await this.createRecord(this.record)

                this.notifSuccess('The Record Was Created')
                this.loading = false 
                this.close()
            } catch(e) {
                this.notifDanger('There Was An Error While Creating The Record')
                this.loading = false
            }
        } 
    },

    computed: {
        ...mapState('Auth', {
            currentUser: 'user'
        })
    }
}
</script>
<style lang="scss" scoped>
.float-right {
    float: right;
}
.iconLink {
    height: 5rem;
    width: auto;
}
.record-card {
    height: 50vh;
}
</style>