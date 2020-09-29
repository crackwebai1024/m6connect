<template>
  <div
    class="d-flex pa-0 mx-2 h-auto fixed bottom-0 right-0 z-20"
  >
    <chatbox
      v-for="chatData in chatsData"
      :key="'chatbox-user' + chatData.userId"
      :chatData="chatData"
    />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Chatbox from '@/components/Home/M6Chat/Chatbox'


export default {
  name: 'ChatWrapper',
  components: {
    Chatbox
  },
  computed: {
    // ...mapGetters('GSChat', [
      'chats'
    ])
  },
  data: () => ({
    chats: [1,2],
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
  }


}
</script>