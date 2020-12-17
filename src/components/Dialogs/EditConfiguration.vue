<template>
    <v-card>
        <v-toolbar dark class='blue accent-4 white--text'>
            <v-tabs slider-color="white" background-color='blue accent-4' active-class="white--text" v-model='tabs'>
                <v-tab :key='1'>Invite</v-tab>
                <v-tab :key='2'>Channel Settings</v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
            <v-icon size='30' @click='$emit("close-dialog")'>mdi-close</v-icon>
        </v-toolbar>
        <v-card-text class='pa-0 vertical-scroll' :style='{height: height()}'>
            <v-tabs-items v-model='tabs'>
                <v-tab-item :key='1'>
                    <!--@closeModal="addUser($event)-->
                    <add-user-dialog
                    :current-users="channel.state.members"
                    />
                </v-tab-item>
                <v-tab-item :key='2'>
                    <settings-channel-dialog
                    :channel="channel"/>
                    <info-users-dialog
                        :channel="channel"
                        :current-users="channel.state.members"
                    />
                </v-tab-item>
            </v-tabs-items>
        </v-card-text>
    </v-card>
</template>
