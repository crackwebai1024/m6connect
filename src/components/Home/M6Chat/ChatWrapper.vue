<template>
  <div class="pa-0 px-5 d-flex" style="height: auto; position: fixed; bottom: 0; right: 0; z-index: 20">
      <chatbox :data="{id: chat}" :key="'chatbox-' + chat" v-for="chat in chats"></chatbox>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Chatbox from "@/components/Home/M6Chat/Chatbox";
export default {
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