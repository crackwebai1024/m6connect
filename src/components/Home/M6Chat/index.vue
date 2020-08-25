<template>
    <div>
        <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent>
            <v-row class="px-3">
                <v-col class="">
                    <p class="text-subtitle-1 grey--text text--darken-1">People</p>
                </v-col>
                <v-col cols="">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="primary"
                            dark
                            outlined
                            depressed
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
                                <v-list-item dense :key="'team-' + key" v-for="(team, key) in teams">
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
                <v-text-field class="mx-3 myinput rounded-pill" flat solo-inverted append-icon="mdi-magnify"  label="Search"></v-text-field>
            </v-row>
            <v-divider></v-divider>
            <v-subheader class=" lighten-3 font-weight-medium px-2 black--text">Teams</v-subheader>
            <v-subheader class=" lighten-3 font-weight-medium px-2 black--text">Departments</v-subheader>
        
            <v-expansion-panels flat hover>
                <v-expansion-panel class="" :key="index" dense v-for="(dep, index) in departmentsRaw">
                    <v-expansion-panel-header dense class="font-weight-light px-2 grey lighten-3">{{dep.name}}</v-expansion-panel-header>
                    <v-expansion-panel-content class="px-0 pb-0">
                        <v-list class="" style="">
                            <v-list-item  :key="index" class="pa-0 my-2" v-for="(u, index) in dep.users">
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
            
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: 'm6-chat',
    data: () => ({
        mini: false,
        drawer: true,
        departments: ['All my departments', 'Finances', 'Operations'],
        departmentsRaw: [
            {
                name: "Information Technologies",
                users: [
                    {
                        name: "John Doe",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
                    },
                    {
                        name: "Example User",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
                    },
                    {
                        name: "Another Example",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    }
                ]
            },
            {
                name: "Project Finances",
                users: [
                    {
                        name: "John Doe",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    }
                ]
            }
        ],
        teams: ['All my teams', 'IT Team XY', 'CPM Team Z'],
    })
}
</script>

<style lang="scss">

</style>