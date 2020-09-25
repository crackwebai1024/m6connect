<template>
    <v-card>
        <v-card-title class="d-flex justify-center" >
            <div class="pa-1 subtitle-2 blue--text">User Management</div> 

            <div class="pa-1 subtitle-2 blue--text" >All Users</div>
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="users"
                :items-per-page="5"
                class="elevation-0"
                @click:row="clickedUser"
            >
                <template #item.fullName="{ item }">
                    <div class="horizontal-center">
                        <img
                            class="round-img"
                            :src="item.img"
                        >
                        <span class="pl-2" >{{ item.firstName }} {{ item.lastName }}</span>
                    </div>
                </template>

                <template #item.status="{ item }" >
                    <v-chip
                        class="ma-2"
                        :color="$h.dg(item, 'status.color', '')"
                        text-color="white"
                    >
                        <b class="white--text" >{{ $h.dg(item, 'status.name', '') }}</b>
                    </v-chip>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: "UserMangementTable",
    data: () => ({
        headers: [
            { text: 'Full Name', value: 'fullName' },
            { text: 'Status', value: 'status' },
            { text: 'Email', value: 'email' },
        ],
        users: [
            { id: "1", firstName: "Emma", lastName: "Smith", status: { name: "Active", color: "green" }, email: "emmasmith@email.com", img: "https://randomuser.me/api/portraits/women/90.jpg", lastVisit: new Date(), roles: [ { name: "Staff", color: "blue darken-2" }, { name: "Company Admin", color: "red" } ], departments: [ { name: "Marketing", color: "blue" }, { name: "Sales", color: "yellow" } ] },
            { id: "2", firstName: "Tony", lastName: "Hawk", status: { name: "Active", color: "green" }, email: "tonyhawk@email.com", img: "https://randomuser.me/api/portraits/men/13.jpg", lastVisit: new Date(), roles: [ { name: "Marketing", color: "orange darken-2" }, { name: "Developer", color: "purple" } ], departments: [ { name: "Development", color: "blue darken-2" }, { name: "Sys Ops", color: "red darken-2" } ] },
            { id: "3", firstName: "Mary", lastName: "Williamson", status: { name: "Vacation", color: "blue" }, email: "marywilliamson@email.com", img: "https://randomuser.me/api/portraits/women/82.jpg", lastVisit: new Date(), roles: [ { name: "Staff", color: "blue darken-2" }, { name: "Company Admin", color: "red" } ], departments: [ { name: "Development", color: "blue darken-2" }, { name: "Sys Ops", color: "red darken-2" } ] },
            { id: "4", firstName: "Duke", lastName: "Silver", status: { name: "Vacation", color: "blue" }, email: "dukesilver@email.com", img: "https://randomuser.me/api/portraits/men/59.jpg", lastVisit: new Date(), roles: [ { name: "Marketing", color: "orange darken-2" }, { name: "Developer", color: "purple" } ], departments: [ { name: "Marketing", color: "blue" }, { name: "Sales", color: "yellow" } ] },
        ]
    }),
    methods: {
        ...mapMutations('UserSettingsControl', {
            setUserToShow: 'setUserToShow',
            setThirdColumnComponent : 'setThirdColumnComponent'
        }),       
        clickedUser(user){
            this.setUserToShow(user)
            this.setThirdColumnComponent({ name: "user-settings-details" })
        } 
    }
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