<template>
    <div class="panel-people pa-5">
        <div class="mb-5" :key="'department-' + index" v-for="(department, index) in departments">
            <div class="actions-container mr-5">
                <v-icon size="28" class="ml-1 grey--text text--darken-2">mdi-filter</v-icon>
                <v-icon size="28" class="ml-1 grey--text text--darken-2">mdi-magnify</v-icon>
            </div>
            <div>
                <h4 class="mb-4">{{ department.name }}</h4>
                <div @click="startChat(user.id)"
                    :key="'user-' + index + department.name"
                    class="my-2 d-flex"
                    v-for="(user, index) in department.users">
                    <v-badge
                        bottom
                        color="green accent-3"
                        dot
                        offset-x="10"
                        offset-y="10"
                        class="mr-3">
                        <v-avatar size="36">
                            <v-img :src="user.pic"></v-img>
                        </v-avatar>
                    </v-badge>
                    <div class="d-flex flex-column">
                        <p class="font-weight-bold mb-0">{{user.name}}</p>
                        <span class="text-caption grey--text text--darken-1">{{user.departmentName}}</span>
                    </div>
                </div>
            </div>
            <div v-if="index !== departments.length - 1">
                <v-divider class="blue-grey lighten-4 mt-4"></v-divider>
                <v-divider class="blue-grey lighten-4"></v-divider>
            </div>
        </div>
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
                        pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 2,
                        name: "Example User",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 3,
                        name: "Another Example",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    },
                                        {
                        id: 4,
                        name: "John",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 5,
                        name: "Example User 2",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 6,
                        name: "Another Example 2",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    }
                ]
            },
            {
                name: "People in my Company",
                users: [
                    {
                        id: 7,
                        name: "John Doe",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 8,
                        name: "John Doe xyz",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 9,
                        name: "John Doe 9875",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    }
                ]
            },
            {
                name: "People in Vendors",
                users: [
                    {
                        id: 10,
                        name: "John Doe 4321",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    },
                    {
                        id: 11,
                        name: "John Doe 1234",
                        pic: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                        departmentName: 'IT Department'
                    }
                ]
            }        
        ],
    }),
    computed: {
        ...mapState(['layout', 'chats']),
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
    width: 400px;
}
.actions-container {
    position: absolute;
    right: 0;
    z-index: 1;
    margin-top: -5px;
}
.mdi-chevron-right::before {
    background: #ddd;
    border-radius: 100%;
    margin: 6px 6px 6px 10px;
}
.v-expansion-panel-content__wrap {
    padding: 0;
}
</style>