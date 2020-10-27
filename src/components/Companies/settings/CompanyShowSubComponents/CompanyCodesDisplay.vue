<template>
    <div>
        <v-container class="pa-0" >
            <v-tabs vertical>
                <v-tab  >
                    Unspc
                </v-tab>
                <v-tab>
                    Regions
                </v-tab>
                <v-tab>
                    Naics
                </v-tab>
                <v-tab>
                    Company Types
                </v-tab>

                <v-tab-item class="text-right" >
                    <v-btn dark fab x-small color="green" @click="( addingNewCode( enumForCodes.unpsc ) )" >
                       <v-icon>mdi-plus</v-icon> 
                    </v-btn>
                    <div 
                        v-for="( u, index ) in $h.dg(currentCompany, 'unspcs', [])" 
                        :key="`unspsc-${index}`"
                    >
                        <v-chip 
                            color="blue darken-2" 
                            v-for="( item, i ) in JSON.parse(u)" :key="`u-item-${i}`" 
                            @click=" addingNewCode( enumForCodes.unpsc, u, i ) " 
                        >
                            <span class="white--text" >{{ item.value.name }}</span>
                        </v-chip>
                    </div>
                </v-tab-item>

                <v-tab-item>
                    iufwbeifbiwef
                </v-tab-item>


                <v-tab-item>
                    fibwefubweif
                </v-tab-item>


                <v-tab-item>
                    ifbuiweubfiwe
                </v-tab-item>
            </v-tabs>
        </v-container>
        <CompanyCodesCU 
            :dialog="dialogShow" 
            :index-to-edit="indexToEdit" 
            :codes-to-edit="codesToEdit" 
            @close="closing" 
        />

    </div>
</template>

<script>

import CompanyCodesCU from './CompanyCodesCU'
import { mapState } from 'vuex'
export default {

    components: {
        CompanyCodesCU
    },

    data: () => ({
        enumForCodes: {
           unpsc: "unspc",
           regions: "regions",
           naics: "naics",
           companyTypes: 'companyTypes'
        },
        dialogShow: false,
        codesToEdit: [],
        indexToEdit: -1
    }),
    
    methods: {
        closing() {
            this.dialogShow = false
            this.codesToEdit = [] 
            this.indexToEdit = -1
        },
        addingNewCode(code, items = null, index = null) {
            if(items && index > -1) {
                this.codesToEdit = JSON.parse(items)
                this.indexToEdit = index
            }

            this.$nextTick( () => {
                this.dialogShow = true
            })
       }
    },

    computed: {
        ...mapState('Companies', {
            currentCompany: 'currentCompany'
        })
    }

}
</script>

<style lang="scss" scoped>
</style>