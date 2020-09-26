<template>
  <div
    class="d-flex pa-0 mx-2 h-auto fixed bottom-0 right-0 z-20"
  >
    <!-- <chatbox
      v-for="chat in chats"
      :key="'chatbox-' + chat"
      :data="{id: chat}"
    /> -->
    <v-card 
      elevation="3"
      v-for="chatData in chatsData"
      :key="'chatbox-user' + chatData.userId"
      class="chat-box d-flex mx-2 rounded-t-lg flex-column"
    >
      <div 
        class="chat-title d-flex justify-space-between align-center px-4"
      >
        <div class="d-flex align-center">
          <img 
            :alt="chatData.name" 
            class="mr-1 rounded-circle" 
            width="42" 
            height="42" 
            :src="chatData.userImgSrc"
          />
          <div class="ml-1">
            <p class="pa-0 ma-0 text-body-2 font-weight-medium">
              {{chatData.userName}}
            </p>
            <p v-if="chatData.online" 
              class="pa-0 ma-0 green--text text--accent-4 text-caption font-weight-medium"
            >
              online
            </p>
            <p v-else 
              class="pa-0 ma-0 blue--text text-caption font-weight-medium"
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
              size="15" 
              class="rotate-45"
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
      <v-divider class="divider-chat"></v-divider>
      <!-- Messages Container -->
      <div class="mx-2 mt-2 px-2 white vertical-scroll messages-container">
        <div class="d-flex" v-for="(message, index) in chatData.messages" :key="'message-'+ chatData.userId + '-' + index">
          <template v-if="currentUserId == message.authorId">
            <div 
              class="message-arrow arrow-up relative text-body-2 w-fit mb-3 px-3 py-2 grey lighten-4 grey--text text--darken-3 mr-2 text-right ml-auto"
            >
              {{message.body}}
            </div>
            <v-icon 
              size="11" 
              :class="[message.read ? 'blue--text' : 'grey--text']" 
            > 
              mdi-check-all
            </v-icon>
          </template>
          <template v-else>
            <img 
              v-if="firstCommentBeforeAnswer(message.authorId, index, chatData.messages)" 
              :alt="chatData.userName" 
              class="mr-3 rounded-circle" 
              width="30" 
              height="30" 
              :src="chatData.userImgSrc"
            />
            <v-card v-else elevation="0" width="30" height="30" class="mr-3"></v-card>
            <div class="message-arrow arrow-down relative text-body-2 blue white--text w-fit mb-3 px-3 py-1 mt-1 text-left">{{message.body}}</div>
          </template>
        </div>

        <!-- end day -->
        <!-- <div class="d-flex text-caption align-center my-2 grey--text">
          <v-divider class="blue-grey lighten-5"></v-divider>
          1 day ago
          <v-divider class="blue-grey lighten-5"></v-divider>
        </div> -->
      </div>
      <v-divider class="blue-grey lighten-5"></v-divider>
      <div class="chat-send-section d-flex align-center px-4">
        <v-btn class="btn-chat-shadow send-message white--text d-flex align-center justify-center" width="20" height="20" fab x-small>
          <v-icon size="16">mdi-plus</v-icon>
        </v-btn>
        <input class="mx-2 text-body-2 w-full outline-none h-full" placeholder="Type a message here..."/>
        <v-btn class="mr-2 btn-chat-shadow grey--text" width="23" height="23" fab x-small>
          <v-icon size="16">mdi-emoticon-happy-outline</v-icon>
        </v-btn>
        <v-btn icon class="btn-chat-shadow send-message white--text" width="25" height="25" fab x-small>
          <v-icon size="13" class="-rotate-45">mdi-send</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import Chatbox from '@/components/Home/M6Chat/Chatbox'
export default {
  name: 'ChatWrapper',
  components: {
    // Chatbox
  },
  computed: {
    // ...mapState(['chats'])
  },
  data: () => ({
    chats: [1,2],
    display: true,
    currentUserId: 2,
    chatsData: [
      {
        userId: 1,
        userName: 'Emilio Bravo',
        online: true,
        lastConnection: 1601082740373,
        userImgSrc: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        messages: [
          {
            timeStamp: 1601059391854,
            body: 'Hi!',
            authorId: 1,
            read: true,
          },
          {
            timeStamp: 1601059452149,
            body: 'I need to talk to you!',
            authorId: 1,
            read: true,
          },
          {
            timeStamp: 1601059472148,
            body: 'Hey! How are you?',
            authorId: 2,
            read: true,
          },
          {
            timeStamp: 1601082639909,
            body: 'Great! Thanks, I want to send you something for your birthday',
            authorId: 1,
            read: true,
          },
          {
            timeStamp: 1601082706358,
            body: 'Lorem ipsum lala erdj skdjadnak',
            authorId: 2,
            read: true,
          },
          {
            timeStamp: 1601082740373,
            body: 'Great! Thanks, I want to send you something for your birthday',
            authorId: 1,
            read: true,
          },
          {
            timeStamp: 1601082746273,
            body: 'Lorem ipsum lala erdj skdjadnak',
            authorId: 2,
            read: true,
          },
        ]
      },
      {
        userId: 3,
        userName: 'Anne Venecia',
        online: false,
        lastConnection: 1601082740373,
        userImgSrc: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        messages: [
          {
            timeStamp: 1601059391854,
            body: 'Hey John, how have you been?',
            authorId: 3,
            read: true,
          },
          {
            timeStamp: 1601059472148,
            body: 'Hi Anne! Fine',
            authorId: 2,
            read: true,
          },
          {
            timeStamp: 1601059472148,
            body: 'How about you?',
            authorId: 2,
            read: true,
          },
          {
            timeStamp: 1601082639909,
            body: 'Great! Thanks, I need you to sign a document',
            authorId: 3,
            read: true,
          },
          {
            timeStamp: 1601082706358,
            body: 'Sure, send it to john@m6connect.com',
            authorId: 2,
            read: true,
          },
          {
            timeStamp: 1601082740373,
            body: 'Thanks! Let me a minute',
            authorId: 3,
            read: true,
          },
          {
            timeStamp: 1601082746273,
            body: 'No problem',
            authorId: 2,
            read: false,
          },
        ]
      }
    ],
  }),
  methods: {
    firstCommentBeforeAnswer(authorId, index, messages) {
      if(index === 0) {
        return true
      } else {
        return authorId === messages[index - 1].authorId ? false : true
      }
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
