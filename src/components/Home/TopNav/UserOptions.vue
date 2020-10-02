<template>
    <div class="text-center">
        <v-menu
            open-on-hover
            top
            offset-x
        >
            <template v-slot:activator="{ on }">
                <img
                    v-on="on" 
                    :alt="currentUser.firstName" 
                    class="mr-1 rounded-circle"
                    :src="$h.dg(currentUser, 'profilePic', '')"
                    v-if="$h.dg(currentUser, 'profilePic', '')"
                >
                <v-icon 
                    v-else 
                    x-large 
                    v-on="on" 
                    :alt="currentUser.firstName" 
                >
                    mdi-account-circle
                </v-icon>
            </template>

            <v-list>
                <v-list-item>
                    <v-list-item-title>
                        <div>{{ $h.dg(currentUser, 'firstName', '') }} {{ $h.dg(currentUser, 'lastName', '') }}</div>
                        {{ currentCompany.name }}
                    </v-list-item-title>
                </v-list-item>
                <v-divider />
                <v-list-item>
                    <v-list-item-title >
                        <v-btn 
                            @click="showCompanies = true" 
                            color="primary" 
                            small 
                        >
                            Switch Companies
                        </v-btn>
                    </v-list-item-title>
                </v-list-item>
                <v-divider />
                <v-list-item>
                    <v-list-item-title>
                        <v-btn color="red" class="white--text" small @click="logout" >Log out</v-btn>
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <user-companies-options
            v-if="showCompanies" 
            :show="showCompanies"
            @OpenJoinCompanies="openJoinCompanies"
            @close="showCompanies = false"
        />

        <join-companies  
            v-if="showJoinCompanies"
            :show="showJoinCompanies"
            @close="showJoinCompanies = false"
        />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import UserCompaniesOptions from '@/components/Home/TopNav/UserCompaniesOptions'
import JoinCompanies from '@/components/Home/TopNav/JoinCompanies'
export default {
    components: {
        UserCompaniesOptions,
        JoinCompanies
    },
    data: () => ({
        showCompanies: false,
        showJoinCompanies: false
    }),
    computed: {
        ...mapState('Companies', {
            currentCompany: 'currentCompany' 
        }),
        ...mapState('Auth', {
            currentUser: 'user'
        })
    },
    methods: {
        ...mapMutations('Auth', {
            logoutUser: 'logoutUser'
        }),
        ...mapActions('GSChat', ['removeClient']),
        openJoinCompanies() {
            this.showJoinCompanies = true
            
            this.$nextTick( () => {
                this.showCompanies = false    
            })
        },
        logout(){
            this.logoutUser()
            this.removeClient()
            this.$router.push({ name: 'auth.SignIn' })
        }
    }
}
</script>