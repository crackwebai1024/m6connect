<template>
  <div class="mb-5 relative">
    <div class="actions-container">
      <v-dialog
        v-model="addUserDialog"
        width="50%">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="grey darken-4"
            icon
            v-bind="attrs" v-on="on" 
          >
            <v-icon class="grey--text text--darken-2">
              mdi-account-multiple-plus-outline
            </v-icon>
          </v-btn>
        </template>
        <add-user-dialog 
         :currentUsers="user.id"
          @closeModal="addUser($event)"></add-user-dialog>
      </v-dialog>
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
        dense v-for="(channel, ind) in filteredChannels" :key="'channel-' + channel.id"
        class="capitalize d-flex justify-start my-0 pointer px-2 py-6 w-full"
        color="transparent"
        elevation="0"
        @click="startChat(channel)"
      >
        <v-badge
          v-if="Object.keys( channel.state.members ).length == 2"
          bottom
          class="mr-3"
          :color="channel.membersInChannel.user.online ? 'green accent-3' : 'red accent-3'"
          dot
          offset-x="10"
          offset-y="10"
        >
          <v-avatar
            color="blue"
            dark
            size="36"
          >
            <v-img
              v-if="user.pic"
              :src="user.pic"
            />
            <template v-else>
              <span class="text-uppercase white--text">{{ channel.membersInChannel.user.name.charAt(0) }}</span>
            </template>
          </v-avatar>
        </v-badge>
        <v-avatar
          v-else
          color="blue"
          class="mr-3"
          dark
          size="36"
        >
          <v-img
            v-if="channel.data.image"
            :src="channel.data.image"
          />
          <template v-else>
            <span class="text-uppercase white--text"> <v-icon>mdi-account-group-outline</v-icon></span>
          </template>
        </v-avatar>

        <div v-if="Object.keys( channel.state.members ).length == 2" >
          <div class="align-start d-flex flex-column">
            <v-badge
              :content="unread_count[ind]['unread']"
              inline
              :value="unread_count[ind]['unread']"
            >
              <p class="font-weight-bold mb-0">
                {{ channel.membersInChannel.user.name }}
              </p>
            </v-badge>

            <span :class="'text-caption ' + departmentColor(user.type)">{{ user.departmentName }}</span>
          </div>
          <div v-if="whoTyping == channel.membersInChannel.user.id">
            <span class="font-weight-light text--secondary font-italic">Typing...</span>
          </div>
        </div>
        <div v-else>
          <div class="align-start d-flex flex-column">
            <v-badge
              :content="unread_count[ind]['unread']"
              inline
              :value="unread_count[ind]['unread']"
            >
              <p class="font-weight-bold mb-0">
                {{ channel.data.name }}
              </p>
            </v-badge>
            <span :class="'text-caption ' + departmentColor(user.type)">{{ user.departmentName }}</span>
          </div>
        </div>
      </v-btn>
      <div v-if="filteredChannels.length === 0">
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
import { mapState, mapGetters, mapActions } from 'vuex'
import AddUserDialog from '@/components/Dialogs/AddUserDialog'

export default {
  components: {
    AddUserDialog
  },
  name: 'Connections',
  props: {
    department: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    addUserDialog: false,
    showSearchInput: false,
    lastDepartment: false,
    hover: false,
    whoTyping: '',
    searchInput: '',
    unread_count: []
  }),
  computed: {
    ...mapState(['layout', 'chats']),
    ...mapGetters('Auth', { user: 'getUser' }),
    ...mapGetters('GSChat', { client: 'client' }),
    ...mapGetters('GSFeed', { feed: 'getFeed' }),
    filteredChannels() {
      const result = []
      this.unread_count = [];
      this.department.channels.forEach(channel => {
        if (Object.keys( channel.state.members ).length == 2) {
          Object.keys(channel.state.members).forEach(member => {
            if (member !== this.user.id) {
              const user = channel.state.members[member]
              if (user.user.name.toLowerCase().trim().indexOf(this.searchInput.toLowerCase().trim()) !== -1) {
                // If there are more than one user, we need to add an array of users and modify the template
                channel.membersInChannel = user
                result.push(channel)
                this.unread_count.push({
                  isOpen:false,
                  cid: channel['cid'],
                  unread: channel['state']['read'][this.user.id]['unread_messages']
                })
              }
            }
          })
        }else {
          result.push(channel)
          this.unread_count.push({
            isOpen:false,
            cid: channel['cid'],
            unread: channel['state']['read'][this.user.id]['unread_messages']
          })
        }
      })
      return result
    }
  },
  async mounted() {
    this.client.on('notification.message_new', r => {
      this.pushUnreadCount(r.channel)
    })
    this.client.on('channel.visible', r => {
      this.unread_count.forEach((item, ind) => {
        if (item.cid == r.cid){
          this.unread_count[ind]['isOpen'] = !this.unread_count[ind]['isOpen'];
          this.unread_count[ind]['unread'] = 0;
        }
      })
    })
    this.client.on('typing.start', r => {
      if (r.user.id != this.user.id) {
        this.whoTyping = r.user.id;
      }
    })
    this.client.on('typing.stop', r => {
      if (r.user.id != this.user.id) {
        this.whoTyping = '';
      }
    })
  },
  methods: {
    ...mapActions("GSChat", ["makeGroupChat"]),
    addUser(event){
      this.addUserDialog = false;
      if (event.users.length > 1) {
        // We make the new conversation
        this.makeGroupChat({
          name: event.name,
          image: event.image,
          members: event.users
        });
      }
    },
    pushUnreadCount(channel) {
      this.unread_count.forEach((item, ind) => {
        if (item.cid == channel.cid && item.isOpen === false) {
          this.unread_count[ind]['unread'] += 1
        }
      })
    },
    addNewMessage(event) {},
    async startChat(channel) {
      await this.$store.dispatch('GSChat/pushChat', channel)
      await channel.markRead();
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
