<template>
  <v-card
    class="chat-box d-flex flex-column mx-2 rounded-t-lg"
    elevation="3"
  >
    <div class="align-center chat-title d-flex justify-space-between px-4">
      <div class="align-center d-flex">
        <img
          :alt="chatData.name"
          class="mr-1 rounded-circle"
          height="42"
          :src="chatData.userImgSrc"
          width="42"
        >
        <div class="ml-1">
          <p class="font-weight-medium ma-0 pa-0 text-body-2">
            {{ chatData.userName }}
          </p>
          <p
            v-if="chatData.online"
            class="font-weight-medium green--text ma-0 pa-0 text--accent-4 text-caption"
          >
            online
          </p>
          <p
            v-else
            class="blue--text font-weight-medium ma-0 pa-0 text-caption"
          >
            last online 5 hours ago
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
    <v-divider
      class="divider-chat"
    />
    <!-- Messages Container -->
    <div
      ref="messages"
      class="messages-container mt-2 mx-2 px-2 vertical-scroll white"
    >
      <div
        v-for="(message, index) in chatData.messages"
        :key="'message-'+ chatData.userId + '-' + index"
        class="d-flex"
      >
        <template v-if="currentUserId === message.authorId">
          <div
            class="arrow-up grey grey--text lighten-4 mb-3 message-arrow ml-auto mr-2 px-3 py-2 relative text--darken-3 text-body-2 text-right w-fit"
          >
            {{ message.body }}
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
            v-if="firstCommentBeforeAnswer(message.authorId, index, chatData.messages)"
            :alt="chatData.userName"
            class="mr-3 rounded-circle"
            height="30"
            :src="chatData.userImgSrc"
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
            {{ message.body }}
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
    <!-- <v-emoji-picker @select="selectEmoji" /> -->
    <div class="relative">
      <v-emoji-picker
        v-show="showDialog"
        class="absolute bottom-0 card-custom-shadow emoji-component grey lighten-5"
        label-search="Search"
        lang="en"
        @select="onSelectEmoji"
      />
    </div>

    <v-divider class="blue-grey lighten-5" />
    <div class="align-center chat-send-section d-flex px-4">
      <v-menu
        elevation="0"
        :offset-y="offset"
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            class="align-center btn-chat-shadow d-flex justify-center send-message white--text"
            fab
            height="25"
            width="25"
            x-small
            v-on="on"
          >
            <v-icon size="19">
              mdi-plus
            </v-icon>
          </v-btn>
        </template>

        <v-list class="mb-2 pa-0 transparent">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            class="pa-0"
          >
            <v-tooltip
              class="tooltip-upload-file"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  class="align-center btn-chat-shadow d-flex justify-center pointer send-message white--text"
                  fab
                  height="25"
                  width="25"
                  x-small
                  v-on="on"
                  @click="openFileManager(item.type)"
                >
                  <v-icon size="15">
                    mdi-{{ item.icon }}
                  </v-icon>
                </v-btn>
              </template>
              <span class="black--text blue lighten-2 pa-1 rounded text-caption white--text">{{ item.title }}</span>
            </v-tooltip>
          </v-list-item>
        </v-list>
      </v-menu>
      <input
        ref="inputMessage"
        v-model="valueInput"
        class="h-full mx-2 outline-none text-body-1 w-full"
        placeholder="Type a message here..."
        @keyup.enter="sendMessage"
      >
      <v-btn
        class="btn-chat-shadow grey--text mr-2"
        fab
        height="2"
        width="23"
        x-small
        @click="toogleDialogEmoji"
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
import { mapState } from 'vuex'
// import Message from '@/components/Home/M6Chat/Message'
// import VEmojiPicker, { emojisDefault, categoriesDefault } from "v-emoji-picker";
import VEmojiPicker from 'v-emoji-picker'

export default {
  name: 'Chatbox',
  components: {
    // Message,
    VEmojiPicker
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
    chatData: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    input: '',
    display: true,
    currentUserId: 2,
    valueInput: '',
    showDialog: false,
    items: [
      { icon: 'image', type: 'image', title: 'Image' },
      { icon: 'file-outline', type: 'file', title: 'Document' }
    ],
    offset: true
  }),
  computed: {
    ...mapState(['chats', 'users']),
    user: function () {
      return this.users.find(u => u.id === this.data.id)
    },
    groupedMessages() {
      return this.messages.reduce(function (r, a) {
        r[a.date.day] = [...r[a.date.day] || [], a]
        return r
      }, {})
    }
  },
  mounted() {
    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
  },

  methods: {
    closeChat() {
      if (this.chats.includes(this.data.id)) {
        if (this.chats.indexOf(this.data.id) > -1) {
          this.chats.splice(this.chats.indexOf(this.data.id), 1)
        }
      }
    },
    firstCommentBeforeAnswer(authorId, index, messages) {
      if (index === 0) {
        return true
      } else {
        return authorId === messages[index - 1].authorId ? false : true
      }
    },
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog
    },
    onSelectEmoji(emoji) {
      this.valueInput += emoji.data
      // Optional
      this.toogleDialogEmoji()
      this.$nextTick(() => this.$refs.inputMessage.focus())
    },
    sendMessage() {
      if (this.valueInput.trim().length === 0) {
        this.valueInput = ''
        this.$nextTick(() => this.$refs.inputMessage.focus())
        return true
      }
      const date = new Date()
      this.chatData.messages.push({
        authorId: this.currentUserId,
        body: this.valueInput,
        read: false,
        timeStamp: date.getTime()
      })

      const self = this
      this.valueInput = ''
      this.$nextTick(() => {
        self.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
        this.$refs.inputMessage.focus()
      })
    },
    openFileManager(type) {
      console.log(type)
      return true
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
.container-emoji {
    height: 158px !important;
    margin-right: 5px;
}
.container-emoji::-webkit-scrollbar {
  width: 4px !important;
}
.container-emoji::-webkit-scrollbar-thumb {
  background: #B4B1CA;
  border-radius: 2px;
}
.container-emoji::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 2px;
}
.emoji-component {
  right: 23px;
}
.emoji-component div {
  background: #fff;
}
.emoji-component span {
  display: flex !important;
  padding: 7px 0px;
}
.container-search {
  padding: 0 10px;
}
.container-search input {
  outline: none;
}
.v-list-item {
  min-height: 30px !important;
}
.v-menu__content {
  box-shadow: none !important;
}
.v-tooltip__content {
  background: transparent !important;
  padding: 0;
}
</style>
