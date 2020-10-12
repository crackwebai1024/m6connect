<template>
    <v-card class="rounded-lg px-3 py-3">
        <v-card-subtitle> 
            <h2 class="text-center">Add Uses</h2>
        </v-card-subtitle>
        <v-card-title>
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
                v-model="roomName"
                label="Chat Name"
                outlined
                dense
            ></v-text-field>
            <div v-if="element=='company'">
                <v-btn v-for="(user, ind) of companys" :key="ind+'-company-user-dialog'" block class="my-3 py-8 rounded-lg btn-user"
                    :color="user['selected'] ? 'green' : 'blue'"  tile x-large
                    outlined @click="pushUser(ind)"
                >
                    {{`${user.user.firstName} ${user.user.lastName}`}}
                    <v-spacer></v-spacer> 
                    <v-chip :color="user.joinStatus.toUpperCase() === 'ACTIVE' ?
                        'green':user.joinStatus.toUpperCase() === 'PENDING' ? 'yellow' : 'red'" >
                        <b class="white--text" >{{ (user.joinStatus).toLowerCase() }}</b>
                    </v-chip>
                </v-btn>
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
        companys: [],
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
        pushUser(userIndex){
            if (! this.companys[userIndex]['selected']) {
                this.companys[userIndex]['selected'] = true;
                this.resList.push(this.companys[userIndex]['user']['id'])
            }else{
                this.companys[userIndex]['selected'] = false;
                this.resList.splice( this.resList.indexOf( this.companys[userIndex]['user']['id'] ), 1 );
            }
        },
        res(a){
            a ? this.$emit('closeModal', {
                name: this.roomName,
                image: '',
                users: this.resList
            }) : this.$emit('closeModal', {
                name: this.roomName,
                image: '',
                users: []
            });
        }
    },
    mounted() {
        if (typeof this.currentUsers === 'string') {
            let cUser = this.companyUsers.filter((e) => { return e.user.id === this.currentUsers; })[0];
            this.companyUsers.splice(this.companyUsers.indexOf(
                cUser
            ), 1)
            this.companys = this.companyUsers;

            if (cUser) {
                this.resList.push(cUser.user.id)
            }
        }else{
            this.companyUsers.forEach(item => {
                if (Object.keys(this.currentUsers).filter((e) => { return e === item.user.id; }).length === 0) {
                    item['selected'] = false;
                    console.log(item);
                    this.companys.push(item);
                }else{
                    this.resList.push(item.user.id)
                }
            });
        }
    }
}
</script>

<style>
.btn-user:hover{
    background-color: #90CAF9;
}
.btn-selected{
    background-color: #4CAF50;
}
</style>
