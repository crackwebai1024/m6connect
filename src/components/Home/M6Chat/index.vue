<template>
    <div class="">
        <v-navigation-drawer
        v-model="drawer"
        right
        absolute
        :mini-variant.sync="mini"
        permanent width="100%">
            <div v-if="!mini" class="">
                <v-row class="px-3 py">
                    <v-icon @click="mini = true" class="text--grey">mdi-chevron-right</v-icon>
                </v-row>
                <v-row class="px-3">
                    <v-col class="py-0">
                        <p class="text-subtitle-1 grey--text text--darken-1">People</p>
                    </v-col>
                    <v-col cols="" class="py-0">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                color="primary"
                                dark
                                text
                                small
                                v-bind="attrs"
                                v-on="on"
                                class="text-caption"
                                >
                                Everyone <v-icon right class="text-caption">mdi-filter-outline</v-icon>
                                </v-btn>
                            </template>
                            <template>
                                <v-list dense>
                                    <v-list-item>
                                        <v-list-item-title>Everyone</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-title>My company</v-list-item-title>
                                    </v-list-item>

                                    <v-subheader>Teams</v-subheader>
                                    <v-list-item  :key="'team-' + key" v-for="(team, key) in teams">
                                        <v-list-item-title>{{team}}</v-list-item-title>
                                    </v-list-item>

                                    <v-subheader>Departments</v-subheader>
                                    <v-list-item :key="'dep-' + key" v-for="(dep, key) in departments">
                                        <v-list-item-title>{{dep}}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </template>
                        </v-menu>
                    </v-col>
                    <v-text-field hide-details class="mx-3 myinput rounded-pill mb-3" flat solo-inverted append-icon="mdi-magnify"  label="Search"></v-text-field>
                </v-row>
                <v-divider></v-divider>
                <v-subheader class=" lighten-3 font-weight-medium px-2 black--text">Teams</v-subheader>
                <v-subheader class=" lighten-3 font-weight-medium px-2 black--text">Departments</v-subheader>
            
                <v-expansion-panels multiple accordion>
                    <v-expansion-panel class="" :key="index" dense v-for="(dep, index) in departmentsRaw">
                        <v-expansion-panel-header dense class="font-weight-light px-2 grey lighten-3">{{dep.name}}</v-expansion-panel-header>
                        <v-expansion-panel-content class="px-0 pb-0">
                            <v-list class="" style="">
                                <v-list-item
                                    @click="chats.push(u.id)"
                                    :key="index"
                                    class="pa-0 my-2"
                                    v-for="(u, index) in dep.users">
                                    <v-badge
                                        bordered
                                        bottom
                                        color="green accent-4"
                                        dot
                                        offset-x="10"
                                        offset-y="10"
                                        class="mr-3">
                                        <v-avatar size="40">
                                            <v-img :src="u.pic"></v-img>
                                        </v-avatar>
                                    </v-badge>
                                    <v-list-item-title class="">{{u.name}}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
            <div v-else>
                <template v-for="(dep, index) in departmentsRaw">
                    <v-menu offset-x left class="mr-3" open-on-hover :key="index">
                        <template v-slot:activator="{ on, attrs }">
                            <v-list v-on="on" class="px-2" v-bind="attrs" :class="{'grey lighten-3' : !index % 2 == 0}">
                                <v-list-item
                                    :key="index"
                                    :class="{'mt-n7' : index != 0}"
                                    class="justify-center" v-for="(u, index) in dep.users">
                                    <v-badge
                                        top
                                        bordered
                                        color="green accent-4"
                                        dot
                                        offset-x="10"
                                        offset-y="10"
                                        class="">
                                        <v-avatar style="border: 2px solid white" size="40">
                                            <v-img :src="u.pic"></v-img>
                                        </v-avatar>
                                    </v-badge>
                                </v-list-item>
                            </v-list>
                        </template>
                        <v-list>
                            <v-subheader>{{dep.name}}</v-subheader>
                            <v-list-item
                                    :key="index"
                                    class="" v-for="(u, index) in dep.users">
                                    <v-badge
                                        bottom
                                        bordered
                                        color="green accent-4"
                                        dot
                                        offset-x="10"
                                        offset-y="10"
                                        class="mr-3">
                                        <v-avatar style="border: 2px solid white" size="40">
                                            <v-img :src="u.pic"></v-img>
                                        </v-avatar>
                                    </v-badge>
                                    <v-list-item-title class="text-caption">{{u.name}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
                
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'm6-chat',
    data: () => ({
        drawer: true,
        departments: ['All my departments', 'Finances', 'Operations'],
        departmentsRaw: [
            {
                name: "Information Technologies",
                users: [
                    {
                        id: 1,
                        name: "John Doe",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
                    },
                    {
                        id: 2,
                        name: "Example User",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
                    },
                    {
                        id: 3,
                        name: "Another Example",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    }
                ]
            },
            {
                name: "Project Finances",
                users: [
                    {
                        id: 4,
                        name: "John Doe",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    }
                ]
            }
        ],
        teams: ['All my teams', 'IT Team XY', 'CPM Team Z'],
    }),
    computed: {
        ...mapState(['layout', 'chats']),
        mini: {
            get: function () {
                return this.layout.contacts
            },
            set: function (value) {
                this.layout.contacts = value
            }
        }
    },
}
</script>

<style lang="scss">

</style>