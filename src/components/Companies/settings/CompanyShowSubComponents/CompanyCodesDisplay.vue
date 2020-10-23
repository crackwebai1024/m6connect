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
                    <div>
                        data goes here
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
        <CompanyCodesCU :dialog="dialogShow" @close="dialogShow = false" />

    </div>
</template>

<script>
import CompanyCodesCU from './CompanyCodesCU'
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
        dialogShow: false
    }),
    
    methods: {
       addingNewCode(code) {
           console.log(code)
           this.dialogShow = true
       }
    }

}
</script>

<style lang="scss" scoped>
</style>