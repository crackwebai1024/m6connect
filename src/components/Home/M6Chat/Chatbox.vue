<template>
  <v-card
    v-if="dataReady"
    class="chat-box d-flex flex-column mx-2 rounded-t-lg"
    elevation="3"
  >
    <div
      class="align-center chat-title d-flex justify-space-between px-4"
      @click="closeChat"
    >
      <div class="align-center d-flex">
        <template v-if="users.length > 1" />
        <template v-else>
          <img
            :alt="channel.name"
            class="mr-1 rounded-circle"
            height="42"
            :src="users[0].user.image"
            width="42"
          >
        </template>
        <div class="ml-1">
          <p class="font-weight-medium ma-0 pa-0 text-body-2">
            <template v-for="userInfo in users">
              {{ userInfo.user.name }}
            </template>
          </p>
          <p
            v-if="users[0].user.online"
            class="font-weight-medium green--text ma-0 pa-0 text--accent-4 text-caption"
          >
            online
          </p>
          <p
            v-else
            class="blue--text font-weight-medium ma-0 pa-0 text-caption"
          >
            {{ users[0].user.last_active }}
          </p>
        </div>
      </div>
      <div>
        <v-btn
          class="btn-chat-shadow ml-2"
          color="white"
          fab
          x-small
        >
          <v-icon
            class="rotate-45"
            size="15"
          >
            mdi-paperclip
          </v-icon>
        </v-btn>
        <v-btn
          class="btn-chat-shadow ml-2"
          color="white"
          fab
          x-small
        >
          <v-icon
            size="15"
          >
            mdi-dots-vertical
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider class="divider-chat" />
    <!-- Messages Container -->
    <div class="messages-container mt-2 mx-2 px-2 vertical-scroll white">
      <div
        v-for="(message, index) in messages"
        :key="'message-'+ state.channel.id + '-' + index"
        class="d-flex"
      >
        <template v-if="user.id === message.user.id">
          <div
            class="arrow-up grey grey--text lighten-4 mb-3 message-arrow ml-auto mr-2 px-3 py-2 relative text--darken-3 text-body-2 text-right w-fit"
          >
            {{ message.text }}
          </div>
          <v-icon
            :class="[message.read ? 'blue--text' : 'grey--text']"
            size="11"
          >
            mdi-check-all
          </v-icon>
        </template>
        <template v-else>
          <img
            v-if="firstCommentBeforeAnswer(message.authorId, index, channel.messages)"
            :alt="channel.userName"
            class="mr-3 rounded-circle"
            height="30"
            :src="channel.userImgSrc"
            width="30"
          >
          <v-card
            v-else
            class="mr-3"
            elevation="0"
            height="30"
            width="30"
          />
          <div class="arrow-down blue mb-3 message-arrow mt-1 px-3 py-1 relative text-body-2 text-left w-fit white--text">
            {{ message.text }}
          </div>
        </template>
      </div>

      <!-- end day -->
      <!-- <div class="d-flex text-caption align-center my-2 grey--text">
        <v-divider class="blue-grey lighten-5"></v-divider>
        1 day ago
        <v-divider class="blue-grey lighten-5"></v-divider>
      </div> -->
    </div>
    <v-divider class="blue-grey lighten-5" />
    <div class="align-center chat-send-section d-flex px-4">
      <v-btn
        class="align-center btn-chat-shadow d-flex justify-center send-message white--text"
        fab
        height="20"
        width="20"
        x-small
      >
        <v-icon size="16">
          mdi-plus
        </v-icon>
      </v-btn>
      <input
        v-model="input"
        class="h-full mx-2 outline-none text-body-2 w-full"
        placeholder="Type a message here..."
      >
      <v-btn
        class="btn-chat-shadow grey--text mr-2"
        fab
        height="23"
        width="23"
        x-small
      >
        <v-icon size="16">
          mdi-emoticon-happy-outline
        </v-icon>
      </v-btn>
      <v-btn
        class="btn-chat-shadow send-message white--text"
        fab
        height="25"
        icon
        width="25"
        x-small
        @click="sendMessage"
      >
        <v-icon
          class="-rotate-45"
          size="13"
        >
          mdi-send
        </v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Message from '@/components/Home/M6Chat/Message'

export default {
  name: 'Chatbox',
  components: {
    Message
  },
  filters: {
    day: day => {
      const days = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday'
      }
      return days[day]
    }
  },
  props: {
    channel: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    input: '',
    display: true,
    currentUserId: 2,
    dataReady: false,
    messages: [],
    state: {
      messages: [],
      members: [],
      channel: {}
    }
  }),
  computed: {
    ...mapGetters('Auth', { user: 'getUser' }),
    groupedMessages() {
      return this.messages.reduce(function (r, a) {
        r[a.date.day] = [...r[a.date.day] || [], a]
        return r
      }, {})
    },
    owner: function () {
      return this.state.members.find(r => r.role === 'owner')
    },
    users: function () {
      const users = []
      this.state.members.forEach(user => {
        if (user.user.id !== this.user.id) {
          users.push(user)
        }
      })
      return users
    }
  },
  async mounted() {
    this.state = await this.channel.watch()
    this.messages = this.state.messages
    this.channel.on('message.new', this.addNewMessage)
    this.dataReady = true
  },
  methods: {
    addNewMessage(event) {
      console.log('desde chatbox')
      this.messages = [...this.messages, event.message]
    },
    async closeChat() {
      this.channel.off('message.new', this.addNewMessage)
      await this.$store.dispatch('GSChat/removeChat', this.state.channel.id)
    },
    sendMessage() {
      const input = this.input.trim()
      if (input === '') {
        return
      }
      this.$store.dispatch('GSChat/sendMessage', {
        channel: this.channel,
        message: input
      }).catch(e => console.error(e))
      this.input = ''
    },
    firstCommentBeforeAnswer(authorId, index, messages) {
      // if (index === 0) {
      //   return true
      // } else {
      //   return authorId === messages[index - 1].authorId ? false : true
      // }
    }
  }

}
</script>


<style>
.chat-box {
  width: 370px;
  height: 460px;
}
.chat-title {
  height: 70px;
  background: #F7FCFF;
}
.rotate-45 {
  transform: rotate(45deg);
}
.-rotate-45 {
  transform: rotate(-45deg);
}
.btn-chat-shadow {
  box-shadow: 0px 3px 13px -4px #b4b4ec !important;
}
.btn-chat-shadow.send-message {
  background: #366AF5 !important;
}
.divider-chat {
  border-color: rgba(165, 160, 160, 0.12) !important;
}
.messages-container {
  height: 325px;
}
.messages-container::-webkit-scrollbar {
  width: 3.5px;
}
.messages-container::-webkit-scrollbar-thumb {
  background: #B4B1CA;
  border-radius: 2px;
}
.messages-container::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 2px;
}
.arrow-down {
  max-width: 240px;
  border-radius: 0 10px 10px 10px;
}
.arrow-up {
  border-radius: 10px 10px 0px 10px;
}
.message-arrow:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
}
.arrow-up:before {
  border-left: 2px solid #f5f5f5;
  border-right: 2px solid transparent;
  border-top: 2px solid transparent;
  border-bottom: 2px solid #f5f5f5;
  right: -4px;
  bottom: 0px;
}
.arrow-down:before {
  border-left: 2px solid transparent;
  border-right: 2px solid #0c7ff2c7;
  border-top: 2px solid #0c7ff2c7;
  border-bottom: 2px solid transparent;
  left: -4px;
  top: 0px;
}
.chat-send-section {
  height: 60px;
}
</style>

