<template>
    <v-card>
        <v-toolbar dark class='blue accent-4'>
            <v-tabs v-model='tabs' dark class='white--text'>
                <v-tab :key='1'>Settings</v-tab>
                <v-tab :key='2'>Delete</v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
            <v-icon size='30' @click="$emit('close-dialog')">mdi-close</v-icon>
        </v-toolbar>
        <v-card-text class='pa-0 vertical-scroll' :style='{height: height()}'>
            <v-tabs-items v-model='tabs'>
                <v-tab-item :key='1'>
                    <settings-channel-dialog
                    :channel="channel"
                    @closeEditeModal="closeModal"/>
                    <info-users-dialog
                        :channel="channel"
                        :current-users="channel.state.members"
                    />
                    <add-user-dialog
                    :current-users="channel.state.members"
                    />
                </v-tab-item>
                <v-tab-item :key='2'>
                    <!--@closeModal="addUser($event)-->
                    <v-list>
                        <v-list-item @click='deleteMessages()'>
                            <v-list-item-icon>
                                <v-icon>mdi-delete</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                Delete messages
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item @click='boolDeleteDiaLog = true'>
                            <v-list-item-icon>
                                <v-icon color='red'>mdi-delete</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content class="red--text">
                                Delete channel
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-tab-item>
            </v-tabs-items>
        </v-card-text>
    </v-card>
</template>

<script>
import DeleteDialog from '@/components/Dialogs/DeleteDialog'
import AddUserDialog from '@/components/Dialogs/AddUserDialog'
import InfoUsersDialog from '@/components/Dialogs/InfoUsersDialog'
import SettingsChannelDialog from '@/components/Dialogs/SettingsChannelDialog'
export default {
    name: 'edit-configuration-dialog',
    props: {
        channel: {
            type: [Object, Array],
            default: () => new Array()
        }
    },
    components: {
        DeleteDialog,
        AddUserDialog,
        InfoUsersDialog,
        SettingsChannelDialog
    },
    data () {
        return {
            tabs: 1
        }
    },
    methods: {
        height () {
            let viewportSize = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
            ) * 0.6
            return `${viewportSize}px`
        }
    }
}
</script>