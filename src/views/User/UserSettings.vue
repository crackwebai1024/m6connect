<template>
    <v-container fluid  >
        <v-row text-xs-center  >
            <v-col cols="3">
                <settings-side-nav  />
            </v-col>
            <v-col cols="6" >
                <!-- <user-mangement-table  /> -->
                <component :is="secondColumnComponent.name" />
            </v-col>
            <v-col cols="3"  >
                <!-- <user-settings-details /> -->
                <component :is="thirdColumnComponent.name" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SettingsSideNav from '@/components/user/settings/SettingsSideNav'
import UserMangementTable from '@/components/user/settings/UserMangementTable'
import UserSettingsDetails from '@/components/user/settings/UserSettingsDetails'

export default {
    name: "UserSettings",
    components: {
        SettingsSideNav,
        UserMangementTable,
        UserSettingsDetails
    },
    methods: {
        ...mapMutations('PageControl', {
            setShowSidePanels: 'setShowSidePanels'
        }),
    },
    computed: {
        ...mapState('UserSettingsControl', {
            secondColumnComponent: 'secondColumnComponent',
            thirdColumnComponent: 'thirdColumnComponent',
        })
    },
    mounted() {
        this.setShowSidePanels(false)
    },
    beforeDestroy() {
        this.setShowSidePanels(true)
    }
}
</script>