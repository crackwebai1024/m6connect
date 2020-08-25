<template>
    <div>
        <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        fixed
        :right="true"
        permanent>
            <v-row class="primary px-3">
                <v-col class="">
                    <p class="text-h6 white--text">People</p>
                </v-col>
                <v-col cols="">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="primary"
                            dark
                            depressed
                            v-bind="attrs"
                            v-on="on"
                            class="text-caption"
                            >
                            All contacts <v-icon right class="text-caption">mdi-filter-outline</v-icon>
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
                                <v-list-item :key="'team-' + key" v-for="(team, key) in teams">
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
                <v-text-field class="mx-3 myinput" solo prepend-inner-icon="mdi-magnify"  label="Search"></v-text-field>
            </v-row>

            <v-subheader class="grey lighten-3 font-weight-medium px-2 black--text">Teams</v-subheader>
            <v-subheader class="grey lighten-3 font-weight-medium px-2 black--text">Departments</v-subheader>
        
            <v-expansion-panels flat hover>
                <v-expansion-panel dense>
                    <v-expansion-panel-header dense class="font-weight-light px-2">Information Technologies</v-expansion-panel-header>
                    <v-expansion-panel-content class="px-0">
                        <v-list-item class="px-0">
                            <v-badge
                                bordered
                                bottom
                                color="green accent-4"
                                dot
                                offset-x="10"
                                offset-y="10"
                                class="mr-3">
                                <v-avatar size="40">
                                    <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
                                </v-avatar>
                            </v-badge>
                            <v-list-item-title>John doe</v-list-item-title>
                        </v-list-item>
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
        teams: ['All my teams', 'IT Team XY', 'CPM Team Z'],
    })
}
</script>

<style lang="scss">

</style>