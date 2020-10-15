<template>
  <div class="mb-5 relative">
    <div class="actions-container">
      <v-btn
        color="grey darken-4"
        icon
      >
        <v-icon class="grey--text text--darken-2">
          mdi-filter
        </v-icon>
      </v-btn>
      <v-btn
        color="grey darken-4"
        icon
        @click="showSearchInputFunction"
      >
        <v-icon class="grey--text text--darken-2">
          mdi-magnify
        </v-icon>
      </v-btn>
    </div>
    <div>
      <h4 class="mb-4 ml-1">
        {{ department.name }}
      </h4>
      <input
        v-show="showSearchInput"
        ref="searchInput"
        v-model="searchInput"
        class="search-input"
        placeholder="Start Typing to Search"
        type="text"
      >
      <v-btn
        v-for="user in filteredUsers" :key="'user-' + department.name + user.user.id"
        class="capitalize d-flex justify-start my-0 pointer px-2 py-6 w-full"
        color="transparent"
        elevation="0"
        @click="startChat(user.user)"
      >
        <v-badge
          bottom
          class="mr-3"
          dot
          offset-x="10"
          offset-y="10">
          <v-avatar
            color="blue"
            dark
            size="36">
            <v-img
              v-if="user.pic"
              :src="user.pic"
            />
            <template v-else>
              <span class="text-uppercase white--text">{{ user.user.firstName.charAt(0) }}{{ user.user.lastName.charAt(0) }}</span>
            </template>
          </v-avatar>
        </v-badge>
        <div class="align-start d-flex flex-column">
          <p class="font-weight-bold mb-0">
            {{ user.user.firstName }} {{ user.user.lastName }}
          </p>
          <span :class="'text-caption ' + departmentColor(user.type)">{{ user.departmentName }}</span>
        </div>
      </v-btn>
      <div v-if="filteredUsers.length === 0">
        No results found
      </div>
    </div>
    <div v-if="lastDepartment">
      <v-divider class="blue-grey lighten-4 mt-4" />
      <v-divider class="blue-grey lighten-4" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'DepartmentChat',
  props: {
    department: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    showSearchInput: false,
    searchInput: '',
    lastDepartment: false
  }),
  computed: {
    ...mapState(['layout', 'chats']),
    ...mapGetters('GSChat', { client: 'client' }),
    ...mapGetters('Auth', { currentUser: 'getUser' }),
    filteredUsers() {
      if (this.department.users) {
        return this.department.users.filter( user => {
          if (user.user.firstName.toLowerCase().trim().indexOf(this.searchInput.toLowerCase().trim()) !== -1) {
            return true
          }
          if (user.user.lastName.toLowerCase().trim().indexOf(this.searchInput.toLowerCase().trim()) !== -1) {
            return true
          }
          return false
        })
      }
      return []
    }
  },
  methods: {
    ...mapMutations('SnackBarNotif', {
      notifDanger: 'notifDanger'
    }),
    async startChat(currentUser) {
      const response = await this.client.queryUsers({ id: { $in: [currentUser.id] } });
      if(response.users.length > 0) {
        this.$store.dispatch('GSChat/createChat', [this.currentUser.id, currentUser.id])
      } else {
        // Start New GSChat
        await this.makeUser(currentUser);
        await this.makeUser(this.currentUser);

        this.$store.dispatch('GSChat/createChat', [this.currentUser.id, currentUser.id])
      }
    },
    async makeUser(user){
      const cUser = {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        image: user.profilePic
      }

      await this.client.disconnect();
      await this.$store.dispatch('GSChat/getGSToken', user)
      await this.$store.dispatch('GSChat/setUser', cUser)
      return true;
    },
    showSearchInputFunction() {
      this.showSearchInput = !this.showSearchInput
      this.$nextTick(() => this.$refs.searchInput.focus())
    },
    departmentColor(type) {
      return type === 'internal' ? 'grey--text text--darken-1' : 'blue--text text--darken-1'
    }
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
