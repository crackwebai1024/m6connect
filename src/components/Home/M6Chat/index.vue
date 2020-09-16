<template>
    <div class="panel-people pa-5">
        <div :key="'department-' + index" v-for="(department, index) in departments">
            <div class="actions-container mr-5">
                <v-icon size="30">mdi-filter</v-icon>
                <v-icon size="30">mdi-magnify</v-icon>
            </div>
            <div>
                <h4 class="test-font-family">{{ department.name }}</h4>
                <v-list-item
                    @click="startChat(user.id)"
                    :key="'user-' + index + department.name"
                    class="px-4 my-2"
                    v-for="(user, index) in department.users">
                    <v-badge
                        bordered
                        bottom
                        color="green accent-4"
                        dot
                        offset-x="10"
                        offset-y="10"
                        class="mr-3">
                        <v-avatar size="40">
                            <v-img :src="user.pic"></v-img>
                        </v-avatar>
                    </v-badge>
                    <v-list-item-title class="">{{user.name}}</v-list-item-title>
                </v-list-item>
            </div>
        </div>

        <!-- <div v-else>
            <template v-for="(dep, index) in departments">
                <v-menu offset-x left class="mr-3" open-on-hover :key="index">
                    <template v-slot:activator="{ on, attrs }">
                        <v-list class="px-2" v-bind="attrs" :class="{'grey lighten-3' : !index % 2 == 0}">
                            <v-list-item
                                v-on="on"
                                :key="index"
                                :class="{'mt-n7' : index != 0}"
                                class="justify-center" v-for="(u, index) in dep.users">
                                <v-badge
                                    top
                                    bordered
                                    color="green accent-4"
                                    dot
                                    offset-x="10"
                                    offset-y="10"
                                    class="">
                                    <v-avatar style="border: 2px solid white" size="40">
                                        <v-img :src="u.pic"></v-img>
                                    </v-avatar>
                                </v-badge>
                            </v-list-item>
                        </v-list>
                    </template>
                    <v-list>
                        <v-subheader>{{dep.name}}</v-subheader>
                        <v-list-item
                                :key="index"
                                class="" v-for="(u, index) in dep.users">
                                <v-badge
                                    bottom
                                    bordered
                                    color="green accent-4"
                                    dot
                                    offset-x="10"
                                    offset-y="10"
                                    class="mr-3">
                                    <v-avatar style="border: 2px solid white" size="40">
                                        <v-img :src="u.pic"></v-img>
                                    </v-avatar>
                                </v-badge>
                                <v-list-item-title class="text-caption">{{u.name}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
            
        </div> -->
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'm6-chat',
    data: () => ({
        drawer: true,
        filter: {
            departments: ['All my departments', 'Finances', 'Operations'],
            teams: ['All my teams', 'IT Team XY', 'CPM Team Z'],
        },
        departments: [
            {
                name: "My Connections",
                users: [
                    {
                        id: 1,
                        name: "John Doe",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
                    },
                    {
                        id: 2,
                        name: "Example User",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
                    },
                    {
                        id: 3,
                        name: "Another Example",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    },
                                        {
                        id: 4,
                        name: "John",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
                    },
                    {
                        id: 5,
                        name: "Example User 2",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
                    },
                    {
                        id: 6,
                        name: "Another Example 2",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    }
                ]
            },
            {
                name: "People in my Company",
                users: [
                    {
                        id: 7,
                        name: "John Doe",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    },
                    {
                        id: 8,
                        name: "John Doe xyz",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    },
                    {
                        id: 9,
                        name: "John Doe 9875",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    }
                ]
            },
            {
                name: "People in Vendors",
                users: [
                    {
                        id: 10,
                        name: "John Doe 4321",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    },
                    {
                        id: 11,
                        name: "John Doe 1234",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
                    }
                ]
            }        
        ],
    }),
    computed: {
        ...mapState(['layout', 'chats']),
        mini: {
            get: function () {
                return this.layout.contacts
            },
            set: function (value) {
                this.layout.contacts = value
            }
        }
    },
    methods: {
        startChat(id) {
            let c = this.chats
            if (!c.includes(id)) {
                if (c.length > 4) {
                    c.shift()
                }
                c.push(id)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.panel-people {
    width: 420px;
}
.actions-container {
    position: absolute;
    right: 0;
    z-index: 1;
}
// .test-font-family {
// font-family: 'Raleway', sans-serif;
// }
.mdi-chevron-right::before {
    background: #ddd;
    border-radius: 100%;
    margin: 6px 6px 6px 10px;
}
.v-expansion-panel-content__wrap {
    padding: 0;
}
</style>