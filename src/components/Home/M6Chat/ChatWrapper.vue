<template>
  <div
    class="align-end bottom-0 d-flex fixed h-auto mx-2 pa-0 right-0 z-20"
  >
    <chatbox
      v-for="chatData in chatsData"
      :key="'chatbox-user' + chatData.userId"
      :channel="chatData"
      @closeChat="closeChat"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chatbox from '@/components/Home/M6Chat/Chatbox'


export default {
  name: 'ChatWrapper',
  components: {
    Chatbox
  },
  data: () => ({
  }),
  // computed: {
  //   ...mapGetters('GSChat', [
  //     'chats'
  //   ])
  // },
  methods: {
    closeChat(value) {
      this.chatsData = this.chatsData.filter(function (chatData) {
        return chatData.userId !== value
      })
    }
  }


}
</script>
