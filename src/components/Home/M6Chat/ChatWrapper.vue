<template>
  <div
    class="d-flex pa-0 px-5"
    style="height: auto; position: fixed; bottom: 0; right: 0; z-index: 20"
  >
    <chatbox
      v-for="chat in chats"
      :key="'chatbox-' + chat"
      :data="{id: chat}"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Chatbox from '@/components/Home/M6Chat/Chatbox'
export default {
  name: 'ChatWrapper',
  components: {
    Chatbox
  },
  computed: {
    ...mapState(['chats'])
  }
}
</script>

<style>

</style>
