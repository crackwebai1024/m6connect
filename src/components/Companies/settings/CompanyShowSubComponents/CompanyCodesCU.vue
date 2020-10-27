<template>
    <div>
        <v-dialog 
            v-model="dialog" 
            persistent
            :width=" $vuetify.breakpoint.xs ? '95vw' : '70vw' "
        >
            <v-card>
                <v-card-title class="headline blue darken-2 white--text mb-2" >
                    Add a Unspc Codes
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

        <m6-loading :loading="loading" />
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

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

        async generateMoreLevels({ id }, index) {
            try{
                const res = await this.getUnspcCodes(id)
                this.levels = this.levels.filter( l => l.index <= index ) 
                index++
                if( res.length ) this.levels.push({ value: { }, id, index })
                console.log(this.levels)
            } catch(err) {
                console.log('err---')
                console.log(err)
            }
        },

        findItems(id) {
            return this.unspcItems[id]
        },

        saveCode() {
            const currentCompany = {...this.currentCompany}
            if(!currentCompany.unspcs) currentCompany.unspcs = [] 
            currentCompany.unspcs.push( JSON.stringify(this.levels)  )
            // console.log('levels------')
            // console.log(this.levels)
            // console.log('currentCompany')

            console.log(currentCompany)
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
            this.levels = [ { value: "", id: '0', index: 0 } ]
            this.$emit('close')
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
        this.getUnspcCodes()
    },

    watch: {
        codesToEdit(val) {
            console.log('val------')
            console.log(val)
            this.levels = val
       
            this.loading = true 
            this.getUnspcCodesByIds( val.map( v => v.id ) )
            .then( () => this.loading = false )
            .catch( () => {
                this.loading = false 
                console.log('there was an error')
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