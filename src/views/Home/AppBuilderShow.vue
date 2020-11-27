<template>
    <app-template  :props-dialog="showSelf" :isPersistent="$route.name == 'record.show'" >
        <div slot="header" class="max-w-lg pt-6 pb-4 w-full mx-auto d-flex justify-space-between align-center">
            
            <v-btn 
                icon
                color="red darken-1"
                :to="{ name: 'apps', params: {} }"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="d-flex align-center">
                <v-img
                    v-if="record.image"
                    :alt="record.image" 
                    class="rounded" 
                    width="180" 
                    height="150" 
                    :src="record.image"
                />

                <v-icon size="180" v-else >mdi-store</v-icon>

                <div class="ml-8">
                    <p class="font-weight-regular text-h7 mb-1">{{record['record_number']}}</p>
                    <v-spacer></v-spacer>
                    <p class="font-weight-regular text-h5 mb-1">{{ record.title }}</p>
                </div>
            </div>
            <v-row align="center" no-gutters>
                <v-col cols="7"></v-col>
                <v-col cols="2">
                    <v-img
                        v-if="app.iconLink"
                        :alt="app.iconLink" 
                        class="rounded d-inline-block" 
                        width="50" 
                        height="70" 
                        :src="app.iconLink"
                    />

                    <v-icon size="100" v-else class="d-inline-block">mdi-store</v-icon>
                </v-col>
                <v-col cols="3">
                    <span class="ml-5 d-inline-block">{{app['title']}}</span>
                </v-col>

            </v-row>
        </div>
        <div slot="tabs" class="d-flex align-center">
            <v-tabs
                :hide-slider="true"
                active-class="font-weight-black blue--text active-tab-company" 
                v-model="currentTab"
            >
                <v-tab 
                    v-for="(tab, i) in $h.dg(app, 'tabs', [])" 
                    :key="`tabs-${i}`" 
                    class="capitalize blue--text" 
                >
                    {{ tab.title }}
                </v-tab>
            </v-tabs>
        </div>
        <div slot="btns" class="d-flex align-center">
        </div>
        <div 
            slot="content" 
            class="w-full" 
            v-show="i === currentTab"
            v-for="(tab, i) in $h.dg(app, 'tabs', [])" 
            :key="`tab-item-${i}`" 
        >
            <panel-two-columns>

                <div slot="leftPanel" >
                    <div 
                        v-for="(panel, index) in  panelsByColumn( $h.dg( tab, 'panels', []), 0 )"
                        :key="`p-l-${index}`"  
                        class="white py-3 px-4 mb-3 panel"
                    >
                        <h3>{{ panel.title }}</h3>

                        <form-show-generator :panel="panel" :fields="$h.dg(panel, 'fields', [])" />
                    </div>
                </div>

                <div slot="rightPanel">
                    <div 
                        v-for="(panel, index) in panelsByColumn( $h.dg( tab, 'panels', []), 1 )"
                        :key="`p-l-${index}`"  
                        class="white py-3 px-4 mb-3 panel"
                    >
                        <h3>{{ panel.title }}</h3>

                        <form-show-generator :panel="panel" :fields="$h.dg(panel, 'fields', [])" />
                    </div>
                </div>

            </panel-two-columns>
        </div>
    </app-template>
</template>

<script>
import AppTemplate from "@/views/Home/AppTemplate";
import ProjectSocialMedia from "./ProjectSocialMedia";
import PanelFull from "@/components/AppBuilder/Content/PanelFull";
import PanelTwoColumns from "@/components/AppBuilder/Content/PanelTwoColumns"
import { mapState, mapMutations, mapActions } from 'vuex'
import FormShowGenerator from '@/components/AppBuilder/Form/FormShowGenerator.vue'

export default {

    components: {
        AppTemplate,
        ProjectSocialMedia,
        PanelFull,
        PanelTwoColumns,
        FormShowGenerator
    },

    computed: {
        ...mapState("Companies", {
            currentCompany: "currentCompany"
        }),

        ...mapState('RecordsInstance', {
            record: 'currentRecord',
            showSelf: 'displayAppBuilderShow'
        }),

        ...mapState('AppBuilder', {
            app: 'app'
        }),

        panelsByColumn() {
            return (panels, column) => panels.filter( p => p.column === column )
        }
    },

    methods: {
        ...mapActions('AppBuilder', {
            getApp: 'getApp'
        }),
        ...mapMutations('RecordsInstance', {
            displayAppBuilderShow: 'displayAppBuilderShow'
        }),
    },

    data: () => ({
        tabs: [],
        currentTab: 0,
    }),

}
</script>

<style lang="scs" scoped>

</style>