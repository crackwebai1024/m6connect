<template>
           <app-template  :props-dialog="showSelf">
            <div slot="header" class="max-w-lg pt-6 pb-4 w-full mx-auto d-flex justify-space-between align-center">
                <div class="d-flex align-center">
                    <img
                        v-if="currentCompany.logo"
                        :alt="currentCompany.name" 
                        class="rounded pointer" 
                        width="180" 
                        height="150" 
                        :src="currentCompany.logo"
                    >
                    <div class="ml-8">
                        <p class="font-weight-regular text-h5 mb-1">{{ currentCompany.name }}</p>
                        <p>{{ currentCompany.legalCompanyName }}</p>
                    </div>
                </div>
                <div>
                    <v-btn
                        class="blue left-0 ml-3 mt-1 px-8 py-6 white--text font-weight-black"
                        text
                        light
                    >
                        Connect
                    </v-btn>
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
                v-for="(tab, i) in $h.dg(app, 'tabs', [])" 
                :key="`tab-item-${i}`" 
                v-show="i === currentTab"
            >
                <panel-two-columns>
                    <!--  -->
                    <div slot="leftPanel" >
                        {{ tab[0].panels }}
                        <div 
                            v-for="(panel, index) in $h.dg(tab, `0.panels`, [])" 
                            :key="`p-l-${index}`"  
                            class="white py-3 px-4 mb-3 panel"
                        >
                            panel title: {{ panel.title }}
                        </div>
                    </div>
                    <div slot="rightPanel">
                        {{ tab[1].panels }}
                        <div 
                            v-for="(panel, index) in $h.dg(tab, `1.panels`, [])" 
                            :key="`p-l-${index}`"  
                            class="white py-3 px-4 mb-3 panel"
                        >
                            panel title: {{ panel.title }}
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

export default {

    components: {
        AppTemplate,
        ProjectSocialMedia,
        PanelFull,
        PanelTwoColumns
    },

    computed: {
        ...mapState("Companies", {
            currentCompany: "currentCompany"
        }),
        ...mapState('RecordsInstance', {
            currentRecord: 'currentRecord',
            showSelf: 'displayAppBuilderShow'
        })
    },

    methods: {
        ...mapActions('AppBuilder', {
            getRecordById: 'getRecordById',
            // getAppList: 'getAppList's
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
            // this.tabs = await this.getAppList()
            this.app = await this.getApp()
            console.log('res===========')
            console.log(this.app)
            // for (let x = 0; x < res.length; x++) {
            //    this.items.push({ isGeneric: true, tab: res[x].title, component: "GenericRecord", app: res[x] }) 
            // }
        } catch(e) {

        }
    }

    // async mounted() {
    //     try {
    //         if( this.$route.name === "records.show" ) {
    //             const res = await this.getRecordById(this.$route.params.id)
    //             console.log('res------')
    //             console.log(res)
    //             this.displayAppBuilderShow()
    //         }
    //     } catch(e) {
    //         console.log('e------')
    //         console.log(e)
    //     }
    // }
}
</script>

<style lang="scs" scoped>

</style>