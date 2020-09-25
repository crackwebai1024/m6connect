<template>
    <v-card>
        <v-card-text>
            <div class="flex-column flex-end" >
                <v-btn icon >
                    <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
            </div>
            
            <div class="flex-column flex-center" >
                <img :src="$h.dg(user, 'img')" class="round-img" alt="user profile image">
                <v-chip :color="$h.dg(user, 'status.color', '')" >
                    <span class="white--text" >{{ $h.dg(user, 'status.name', '') }}</span>
                </v-chip>
                <span class="black--text text-h6" >{{ user.firstName }} {{ user.lastName }}</span>
                <span class="text-subtitle-1" >{{ user.email }}</span>
            </div>
            <div class="flex-column flex-start pa-2" >
                <div class="flex-row flex-start pa-1" >
                    <v-icon>mdi-clock-time-four-outline</v-icon>
                    <div class="flex-column flex-start ml-2" >
                        <span>Last Time Visited:</span>
                        <span>{{ user.id ? user.lastVisit.toLocaleDateString("en-US", this.dateOptions) : null }}</span>
                    </div>
                </div>

                <div class="flex-row flex-start pa-1">
                    <v-icon>mdi-shield</v-icon>
                    <div class="flex-column flex-start ml-2">
                        <span>User Roles:</span>
                        <div >
                            <v-chip 
                                v-for="(role, index) in $h.dg(user, 'roles', [])" 
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
                                v-for="(dep, index) in $h.dg(user, 'departments', [])" 
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
    </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "UserSettingsDetails",
    data: () => ({
        dateOptions: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    }),
    computed: {
        ...mapState('UserSettingsControl', {
            user: "userToShow"
        })
    },
}
</script>

<style lang="scss" scoped >
.round-img {
    border-radius: 50%;
    width: 10rem;
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
.fading-in {
    -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
    -moz-animation:    fadein 1s; /* Firefox < 16 */
    -ms-animation:     fadein 1s; /* Internet Explorer */
    -o-animation:      fadein 1s; /* Opera < 12.1 */
    animation:         fadein 1s;
}
@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Internet Explorer */
@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

/* Opera < 12.1 */
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
</style>