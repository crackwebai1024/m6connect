<template>
    <v-card>
        <v-card-text>
            <div class="flex-column flex-end" >
                <v-btn icon @click="showUserData = true" >
                    <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
            </div>
            
            <div class="flex-column flex-center" >
                <img v-if="$h.dg(userData, 'user.profilePic')" :src="$h.dg(userData, 'user.profilePic')" class="round-img" alt="user profile image">
                <v-icon v-else size="10rem"  >mdi-account-circle</v-icon>
                <v-chip v-if="$h.dg(userData, 'joinStatus', '')" :color=" statusColors[$h.dg(userData, 'joinStatus', '')] " >
                    <b class="white--text" >{{ $h.dg(userData, 'joinStatus', '').toLowerCase() }}</b>
                </v-chip>
                <span class="black--text text-h6" >
                    {{ $h.dg(userData, 'user.firstName', '') }} {{ $h.dg(userData, 'user.lastName', '') }}
                </span>
                <span class="text-subtitle-1" >{{ userData.user.email }}</span>
            </div>
            <div class="flex-column flex-start pa-2" >
                <div class="flex-row flex-start pa-1" >
                    <v-icon>mdi-clock-time-four-outline</v-icon>
                    <div class="flex-column flex-start ml-2" >
                        <span>Last Time Visited:</span>
                        <span>
                            {{ 
                                $h.dg(userData, 'user.lastVisit', '') ? 
                                    new Date(userData.user.lastVisit).toLocaleDateString("en-US", this.dateOptions) 
                                    : null 
                            }}
                        </span>
                    </div>
                </div>

                <div class="flex-row flex-start pa-1">
                    <v-icon>mdi-shield</v-icon>
                    <div class="flex-column flex-start ml-2">
                        <span>User Roles:</span>
                        <div >
                            <v-chip 
                                v-for="(role, index) in $h.dg(userData, 'roles', [])" 
                                :key="index" 
                                :color="role.color" 
                            >
                                <span class="white--text">{{ role.name }}</span>
                            </v-chip>
                        </div>
                    </div>
                </div>

                <div class="flex-row flex-start pa-1" >
                    <v-icon>mdi-account-group</v-icon>
                    <div class="flex-column flex-start ml-2" >
                        <span class="pb-2">User Departments:</span>
                        <div>
                            <v-chip 
                                v-for="(dep, index) in $h.dg(userData, 'departments', [])" 
                                :key="index" 
                                :color="dep.color" 
                            >
                                <span class="white--text">{{ dep.name }}</span>
                            </v-chip>
                        </div>
                    </div>
                </div>
            </div>
        </v-card-text>

        <user-profile-update 
            :v-show="showUserData"
            :show="showUserData"
            @close="showUserData = false"
        />
        
    </v-card>
</template>

<script>
import { mapState } from 'vuex'
import UserProfileUpdate from '@/components/user/settings/UserProfileUpdate'

export default {
    name: "UserSettingsDetails",
    components: {
        UserProfileUpdate
    },
    data: () => ({
        dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
        showUserData: false
    }),
    computed: {
        ...mapState('UserSettingsControl', {
            userData: "userToShow"
        }),
        ...mapState('Auth', {
            statusColors: "statusColors"
        })
    },
}
</script>

<style lang="scss" scoped >
.round-img {
    object-fit: cover;
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
    margin-bottom: -0.5rem;
}
.flex-column {
    display: flex;      
    display: -webkit-flex;
    display: -ms-flexbox;
    flex-direction: column;
}
.flex-row {
    display: flex;      
    display: -webkit-flex;
    display: -ms-flexbox;
    flex-direction: row;
}
.flex-center {
    align-items: center;
}
.flex-end {
    align-items: flex-end;
}
.flex-start {
    align-items: flex-start;
}
</style>