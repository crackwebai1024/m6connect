<template>
    <v-card>
        <v-toolbar
            color="purple accent-4"
        >
            <v-toolbar-title class="white--text">Channel Settings</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form ref="form">
                <v-row >
                    <v-col col="12" class="text-center pa-0" >
                        <v-avatar size="130" class="mr-2 text-center">
                            <img
                                v-if="channelImage !== ''"
                                :alt="channelImage"
                                :src="channelImage"
                            >
                            <img
                                v-else-if="channel.data.image !== ''"
                                :alt="channel.data.image"
                                :src="channel.data.image"
                            >
                            <v-icon 
                                size="130"
                                v-else
                            >
                                mdi-account-group-outline
                            </v-icon>
                        </v-avatar>
                        <m6-upload 
                            
                            btnButton="purple" 
                            @response="reponseProfileImg" 
                            @loading="loading = !loading" 
                        >
                            <v-icon>mdi-pencil</v-icon>
                        </m6-upload>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <h2 class="mt-5 text-body-1">Channel Name:</h2>
                    </v-col>
                    <v-col>
                        <v-text-field
                            class="mt-0"
                            v-model="channelName"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                @click="updateChannel(false)"
                width="95px"
                color="error"
                dark
            >
                Cancel
            </v-btn>
            <v-btn
                @click="updateChannel(true)"
                width="95px"
                color="success"
                dark
            >
                Edit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: "SettingsChannelDialog",
    props: {
        channel: {
            type: Object,
            default: () => {}
        }
    },
    data: () => ({
        loading: false,
        channelName: '',
        channelImage: ''
    }),
    methods: {
        ...mapMutations('SnackBarNotif', 
            { notifDanger: 'notifDanger' }
        ),
        async updateChannel(res) {
            if (res) {
                let res = await this.channel.update({
                    name: this.channelName,
                    image: this.channelImage
                });
                this.$emit('closeEditeModal');
            }else{
                this.channelName = this.channel.data.name;
                this.channelImage = '';
                this.$emit('closeEditeModal');
            }
        },
        reponseProfileImg(res) {
            if(res.ok) {
                this.channelImage = res.data.link;
            } else {
                this.notifDanger('There was an error while saving the file');
            }
        },
    },
    mounted() {
        this.channelName = this.channel.data.name;
    }
}
</script>