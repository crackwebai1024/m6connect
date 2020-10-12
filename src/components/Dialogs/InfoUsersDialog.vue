<template>
    <v-card>
        <v-toolbar
            color="cyan"
        >
            <v-toolbar-title class="white--text">Members</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-list class="transparent">
                <div
                    v-for="(userID, index) in Object.keys(currentUsers)" 
                    :key="index + '-user-info'"
                >
                    <v-list-item>
                        <v-list-item-icon size="20">
                            <v-avatar
                                color="blue"
                                dark
                                size="36"
                            >
                                <v-img
                                    v-if="currentUsers[userID]['user']['image']"
                                    :src="currentUsers[userID]['user']['image']"
                                />
                                <template v-else>
                                    <span class="text-uppercase white--text">{{ currentUsers[userID]['user']['name'].charAt(0) }}</span>
                                </template>
                            </v-avatar>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{currentUsers[userID]['user']['name']}}
                            </v-list-item-title>
                            <v-list-item-subtitle v-if="currentUsers[userID]['user']['online']">
                                <p class="font-weight-medium ma-0 pa-0 text-caption green--text text--accent-4" >
                                    online
                                </p>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle v-else>
                                {{new Date(currentUsers[userID]['user']['last_active']).toString().substr(0,15)}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-btn v-if="role === 'owner'" icon @click="remove(currentUsers[userID])">
                                <v-icon color="red darken-1" >mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-icon>
                    </v-list-item>
                </div>
            </v-list>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "InfoUsersDialog",
    data: () => ({
        role: "member"
    }),
    props:{
        currentUsers: {
            type: Object,
            default: () => {}
        },
        channel: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        ...mapActions("GSChat", ["removeUserChat"]),
        print(){
            console.log('currentUsers', this.currentUsers);
            console.log('user', this.user);
            console.log('channel', this.channel);
            console.log(this.role);
        },
        async remove( user ){
            await this.channel.removeMembers([user.user.id]);
        }
    },
    computed: {
        ...mapGetters('Auth', { user: 'getUser' }),
        ...mapGetters('GSChat', { client: 'client' }),
    },
    mounted() {
        this.role = this.currentUsers[this.user.id]['role'];
    }
}
</script>