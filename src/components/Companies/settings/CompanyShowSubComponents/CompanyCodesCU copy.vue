<template>
    <div>
        <v-container class="pa-0" >
            <v-tabs vertical>
                <v-tab @click="getUnspc" >
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

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            items: {{ items }}
                            <v-treeview
                                :active.sync="active"
                                :items="unspcItems"
                                :load-children="fetchUsers"
                                :open.sync="open"
                                activatable
                                color="warning"
                                open-on-click
                                transition
                                item-text="name"
                                item-value="id"
                            >
                                <template v-slot:prepend="{ item }">
                                    <v-icon v-if="!item.children">
                                    mdi-account
                                    </v-icon>
                                </template>
                            </v-treeview>
                            
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            SWEDFWE
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            WEFWEF
                        </v-card-text>  
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            WEFWEFEWF
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-container>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: "CompanyCodesCU",
    data: () => ({
        items: []
    }),
    methods: {
        ...mapActions('M6Codes', {
            getUnspcCodes: 'getUnspcCodes'
        }),
        getUnspc(parents = 0) {
            this.getUnspcCodes(parents)
            .catch( err => {
                console.log('err---')
                console.log(err)
            })
        },
        fetchUsers() {
            console.log('ownrvoiwenoinvewo')
        }
    },
    computed: {
        ...mapState('M6Codes', {
            unspcItems: 'unspc'
        })
    }
}
</script>