<template>
    <app-template  :props-dialog="showSelf">
        <div slot="header" class="max-w-lg pt-6 pb-4 w-full mx-auto d-flex justify-space-between align-center">
            <div class="d-flex align-center">
                <img
                    v-if="app.iconLink"
                    :alt="app.iconLink" 
                    class="rounded pointer" 
                    width="180" 
                    height="150" 
                    :src="currentCompany.logo"
                >

                <v-icon size="180" v-else >mdi-store</v-icon>

                <div class="ml-8">
                    <p class="font-weight-regular text-h5 mb-1">{{ app.title }}</p>
                    <p>{{ currentCompany.legalCompanyName }}</p>
                </div>
            </div>
            <div>

            </div>
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
            currentRecord: 'currentRecord',
            showSelf: 'displayAppBuilderShow'
        }),

        panelsByColumn() {
            return (panels, column) => panels.filter( p => p.column === column )
        }
    },

    methods: {
        ...mapActions('AppBuilder', {
            getRecordById: 'getRecordById',
            getApp: 'getApp'
        }),
        ...mapMutations('RecordsInstance', {
            displayAppBuilderShow: 'displayAppBuilderShow'
        })
    },

    data: () => ({
        tabs: [],
        currentTab: 0,
        app: {}
    }),

    async mounted() {
        try {
            this.app = await this.getApp(1)
        } catch(e) {

        }
    }

}
</script>

<style lang="scs" scoped>

</style>