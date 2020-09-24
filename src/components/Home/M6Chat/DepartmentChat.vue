<template>
    <div class="mb-5">
        <div class="actions-container mr-5">
            <v-btn icon color="grey darken-4">
                <v-icon class="grey--text text--darken-2">mdi-filter</v-icon>
            </v-btn>
            <v-btn icon color="grey darken-4" @click="showSearchInputFunction">
                <v-icon class="grey--text text--darken-2">mdi-magnify</v-icon>
            </v-btn>
        </div>
        <div>
            <h4 class="mb-4 ml-1">{{ department.name }}</h4>
            <input ref="searchInput" v-show="showSearchInput" v-model="searchInput" class="search-input" type="text" placeholder="Start Typing to Search" />
            <v-btn @click="startChat(user.id)"
                :key="'user-' + department.name + user.id"
                class="w-full px-2 py-6 my-0 d-flex pointer capitalize justify-start"
                v-for="user in filteredUsers"
                elevation="0" 
                color="transparent">
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
                <div class="d-flex flex-column align-start">
                    <p class="font-weight-bold mb-0">{{user.name}}</p>
                    <span class="text-caption grey--text text--darken-1">{{user.departmentName}}</span>
                </div>
            </v-btn>
            <div v-if="filteredUsers.length === 0">No results found</div>
        </div>
        <div v-if="lastDepartment">
            <v-divider class="blue-grey lighten-4 mt-4"></v-divider>
            <v-divider class="blue-grey lighten-4"></v-divider>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'DepartmentChat',
    props: {
        department: Object,
        lastDepartment: Boolean,
    },
    data: () => ({
        showSearchInput: false,
        searchInput: '',
        drawer: true,
        filter: {
            departments: ['All my departments', 'Finances', 'Operations'],
            teams: ['All my teams', 'IT Team XY', 'CPM Team Z'],
        },
    }),
    computed: {
        ...mapState(['layout', 'chats']),
        filteredUsers() {
            return this.department.users.filter((user) => {
                return user.name.toUpperCase().trim().indexOf(this.searchInput.toUpperCase().trim()) !== -1;
            })
        },
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
        },
        showSearchInputFunction() {
            this.showSearchInput = !this.showSearchInput
            this.$nextTick(() => this.$refs.searchInput.focus())
        },
    }
}
</script>

<style lang="scss" scoped>
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