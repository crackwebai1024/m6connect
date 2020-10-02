<template>
    <v-card>
        <v-card-title class="d-flex justify-center" >
            <div class="pa-1 subtitle-2 blue--text">User Management | </div> 

            <div class="pa-1 subtitle-2 blue--text" >
                {{ 
                    secondColumnComponent.type === 'pending' ? 'Pending' : 'All Users'
                }}    
            </div>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="usersFiltered"
                :items-per-page="5"
                class="elevation-0"
                @click:row="clickedUser"
            >
                <template #item.fullName="{ item }">
                    <div class="horizontal-center">
                        <img
                            class="round-img"
                            :src="$h.dg(item, 'user.profilePic', '')"
                            v-if="$h.dg(item, 'user.profilePic', '')"
                        >
                        <v-icon v-else x-large  >mdi-account-circle</v-icon>

                        <span class="pl-2" >{{ item.user.firstName }} {{ item.user.lastName }}</span>
                    </div>
                </template>

                <template #item.email="{ item }" >
                    {{ item.user.email }}
                </template>

                <template #item.status="{ item }" >
                    <v-chip v-if="$h.dg(item, 'joinStatus', '')" :color=" statusColors[$h.dg(item, 'joinStatus', '')] " >
                        <b class="white--text" >{{ $h.dg(item, 'joinStatus', '').toLowerCase() }}</b>
                    </v-chip>
                </template>

                <template #item.actions="{ item }" >
                    <v-select
                        chips
                        v-model="item.joinStatus"
                        :items="selectItems"
                        item-text="label"
                        item-value="val"
                        label="User Status"
                        single-line
                        @input="selectInput(item)"
                    />
                </template>

            </v-data-table>
        </v-card-text>
        <m6-loading :loading="loading" />
    </v-card>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from 'vuex'

export default {
    name: "UserMangementTable",
    data: () => ({
        loading: false,
    }),
    methods: {
        ...mapMutations('UserSettingsControl', {
            setUserToShow: 'setUserToShow',
            setThirdColumnComponent : 'setThirdColumnComponent'
        }),
        ...mapActions('Companies', {
            updateUserCompany: 'updateUserCompany'
        }),    
        clickedUser(user){
            this.setUserToShow(user)
            this.setThirdColumnComponent({ name: "user-settings-details" })
        },
        async selectInput(item) {
            try{
                this.loading = true
                await this.updateUserCompany(item)
                this.loading = false
            } catch(e) {
                this.loading = false
            }
        }
    },
    computed: {
        ...mapGetters('Companies', {
            users: 'getCurrentCompanyUsers' 
        }),
        ...mapState('Auth', {
            statusColors: "statusColors"
        }),
        ...mapState('UserSettingsControl', {
            secondColumnComponent: 'secondColumnComponent',
        }),
        selectItems(){
            return Object.keys(this.statusColors).map( s => ({ val: s, label: s.toLowerCase() }))
        },
        headers() {
            let headers = [
                { text: 'Full Name', value: 'fullName' },
                { text: 'Status', value: 'status' },
                { text: 'Email', value: 'email' },
            ]

            if( this.secondColumnComponent.type === 'pending' ) 
                headers.push({ text: 'Actions', value: "actions", sortable: false })

            return headers
        },
        usersFiltered() {
            return this.secondColumnComponent.type === 'pending' ? 
                this.users.filter( u => u.joinStatus === "PENDING" ) : 
                this.users
        }
    },
}
</script>

<style lang="scss" scoped >
    .round-img {
        border-radius: 50%;
        width: 3rem;
    }
    .horizontal-center {
        display: flex;      
        display: -webkit-flex;
        display: -ms-flexbox;
        flex-direction: row;
        align-items: center;
    }
</style>