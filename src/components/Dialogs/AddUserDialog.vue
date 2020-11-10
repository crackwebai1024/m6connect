<template>
    <v-card class="rounded-lg px-8 py-3">
        <v-card-subtitle class="pb-0">
            <h2 class="text-center ma-0 mt-4 text-h4 blue--text">Add Users in your Group</h2>
        </v-card-subtitle>
        <v-card-title class="pb-6">
            <v-spacer></v-spacer>
            <v-btn
                x-large
                width="40%"
                color="secondary"
                @click="element='company'">
                In Company
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                x-large
                width="40%"
                color="secondary"
                @click="element='vendor'">
                In Vendors
            </v-btn>
            <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
            <v-text-field
                v-if="typeof this.currentUsers === 'string'"
                v-model="roomName"
                label="Chat Name"
                outlined
                dense
            ></v-text-field>
            <div v-if="element=='company'" style="height: 400px; overflow-y: scroll;" class="messages-container white" >
                <div class="d-flex align-center" v-for="(user, ind) of companies" :key="ind+'-company-user-dialog'">
                    <v-btn tile depressed color="transparent" class="my-2 py-6 my-0 btn-user"
                        block
                        @click="user['selected'] = !user['selected']"
                    >
                        <v-checkbox
                            @click="user['selected'] = !user['selected']"
                            v-model="user['selected']"
                            class="mt-0 mr-2"
                            :value="user['selected']"
                            color="success"
                            hide-details
                        ></v-checkbox>
                        <v-avatar
                            :color="user['user']['profilePic']? 'transparent' : 'blue' "
                            class="mr-3"
                            dark
                            size="36"
                        >
                            <v-img
                                v-if="user['user']['profilePic']"
                                :src="user['user']['profilePic']"
                            />
                            <template v-else>
                                <span class="text-uppercase white--text">{{ user.user.firstName.charAt(0) }}{{user.user.lastName.charAt(0)}}</span>
                            </template>
                        </v-avatar>
                        {{`${user.user.firstName} ${user.user.lastName}`}}
                        <v-spacer></v-spacer> 
                        <v-chip 
                            :color="user.joinStatus.toUpperCase() === 'ACTIVE' ? 'green'
                            : user.joinStatus.toUpperCase() === 'PENDING' ? 'yellow' : 'red'"
                        >
                            <span class="white--text" >{{ (user.joinStatus).toLowerCase() }}</span>
                        </v-chip>
                    </v-btn>
                </div>
                <h2 
                    v-if="companies.length === 0"
                    class="font-weight-black text-center mt-2"
                >
                    No users found
                </h2>
            </div>
            <div v-else>
                <h2 
                    class="font-weight-black text-center"
                >
                    No users found
                </h2>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                width="30%"
                class="mt-2"
                color="primary"
                outlined
                @click="res(false)">
                Cancel
            </v-btn>
            <v-btn
                width="30%"
                class="mt-2"
                color="success"
                outlined
                @click="res(true)">
                Add
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'AddUserDialog',
    data: () => ({
        hoverUser: false,
        roomName: '',
        companies: [],
        resList:[],
        element: 'company'
    }),
    props: {
        currentUsers: {
            type: [String, Object],
            default: () => {}
        }
    },
    computed: {
        ...mapGetters('Companies', { companyUsers: 'getCurrentCompanyUsers' })
    },
    methods: {
        res(a){
            if(a){
                let res = this.resList.slice();
                
                this.companies.forEach(item => {
                    if( item.selected ) {
                        res.push( item['user']['id'] );
                        item['selected'] = false;
                    }
                });
                this.$emit('closeModal', {
                    name: this.roomName,
                    image: '',
                    users: res
                })
            }else{
                this.$emit('closeModal', {
                    name: this.roomName,
                    image: '',
                    users: []
                });
            }
            this.roomName = '';
        },
    },
    mounted() {
        if (typeof this.currentUsers === 'string') {
            let cUser = this.companyUsers.filter((e) => { return e.user.id === this.currentUsers; })[0];
            this.companyUsers.splice(this.companyUsers.indexOf(
                cUser
            ), 1)
            this.companies = this.companyUsers;

            if (cUser) {
                this.resList.push(cUser.user.id)
            }
        }else{
            this.companyUsers.forEach(item => {
                if (Object.keys(this.currentUsers).filter((e) => { return e === item.user.id; }).length === 0) {
                    item['selected'] = false;
                    this.companies.push(item);
                }else{
                    this.resList.push(item.user.id)
                }
            });
        }
    }
}
</script>
