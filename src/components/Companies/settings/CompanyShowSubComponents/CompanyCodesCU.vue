<template>
    <div>
        <v-dialog 
            v-model="dialog" 
            persistent
            :width=" $vuetify.breakpoint.xs ? '95vw' : '70vw' "
        >
            <v-card>
                <v-card-title class="headline blue darken-2 white--text mb-2" >
                    {{ indexToEdit > -1 ? 'Edit' : 'Add' }} a Unspc Code
                </v-card-title>
                <v-card-text class="card-text-custom" >
                    <v-autocomplete 
                        v-for="(l, i) in levels"
                        :key="`level-${i}`"
                        v-model="l.value"
                        :items="getSpecificUNSPC(l.id)"
                        item-value="id"
                        item-text="name"
                        return-object
                        @input=" e => generateMoreLevels(e, i) "
                        label="Unspc Codes"
                    />

                    <m6-loading :loading="loading" />
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="red" dark text @click="closing" >
                        close
                    </v-btn>
                    <v-btn color="green" dark @click="saveCode" >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
    name: "CompanyCodesCU",
    props: {
        dialog: {
            type: Boolean, 
            default: false
        },
        indexToEdit: {
            type: Number,
            default: -1 
        },
        codesToEdit: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        loading: false,
        items: [],
        levels: [
            { value: {}, id: '0', index: 0 }
        ]
    }),

    methods: {
        ...mapActions('M6Codes', {
            getUnspcCodes: 'getUnspcCodes',
            getUnspcCodesByIds: 'getUnspcCodesByIds'
        }),
        ...mapActions('Companies', {
            updateCompany: 'updateCompany'
        }),
        ...mapMutations('SnackBarNotif', {
            notifDanger: 'notifDanger',
            notifSuccess: 'notifSuccess'
        }),

        async generateMoreLevels({ id }, index) {
            this.loading = true
            try{
                const res = await this.getUnspcCodes(id)
                this.loading = false 
                this.levels = this.levels.filter( l => l.index <= index ) 
                index++
                if( res.length ) this.levels.push({ value: { }, id, index })
            } catch(err) {
                this.loading = false 
            }
        },

        findItems(id) {
            return this.unspcItems[id]
        },

        saveCode() {
            const currentCompany = {...this.currentCompany}
            if(!currentCompany.unspcs) currentCompany.unspcs = [] 
            
            if( this.indexToEdit > -1 ) {
                currentCompany.unspcs[this.indexToEdit] = JSON.stringify(this.levels)
            } else {
                currentCompany.unspcs.push( JSON.stringify(this.levels)  )
            }

            this.loading = true 
            this.updateCompany(currentCompany)
            .then( res => {
                console.log('res-------')
                console.log(res)
                this.loading = false
            })
            .catch( err => {
                console.log('err---update')
                console.log(err)
                this.loading = false
            })
        },

        closing() {
            this.levels = [ { value: {}, id: '0', index: 0 } ]
            this.$nextTick( () => {
                this.$emit('close')
            })
        }
    },

    computed: {
        ...mapState('Companies', {
            currentCompany: 'currentCompany'
        }),
        ...mapState('M6Codes', {
            unspcItems: 'unspc'
        }),
        getSpecificUNSPC() {
            return id => {
                return this.unspcItems[id]
            }
        }
    },

    mounted() {
        if(!this.codesToEdit.length) this.getUnspcCodes()
    },

    watch: {
        codesToEdit(val) {
            if( !val.length ) return 

            this.levels = val

            this.loading = true 
            this.getUnspcCodesByIds( val.map( v => v.id ) )
            .then( () => {
                this.loading = false 
            })
            .catch( () => {
                this.loading = false 
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.card-text-custom {
    height: 50vh;
    overflow-y: auto;
}
</style>