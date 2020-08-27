<template>
  <div style="width: 270px;" class="mx-4 d-flex"
       :style="display? 'height: 400px' : 'height:auto'"
       :class="display? 'flex-column' : 'flex-row align-end'">
      <v-row style="cursor: pointer"
             :class="display? 'primary' : 'white'"
             class="px-3 py-1 rounded-t-lg d-flex align-center">
          <v-col class="flex-grow-1 pa-0" @click="display = !display">
            <v-list-item class="pa-0 ma-0">
                <v-badge
                    bordered
                    bottom
                    color="green accent-4"
                    dot
                    offset-x="10"
                    offset-y="10"
                    class="mr-3">
                    <v-avatar size="36">
                        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                    </v-avatar>
                </v-badge>
                <v-list-item-title
                :class="display? 'white--text' : 'grey--text text--darken-1'">
                    {{user.name}}
                </v-list-item-title>
            </v-list-item>
          </v-col>
          <v-icon>mdi-cog-outline</v-icon>
          <v-icon @click="closeChat()">mdi-close</v-icon>
      </v-row>
      <v-row v-if="display" class="white pa-3 d-flex flex-column fill-height">
          <message>Hi, what's up?</message>
          <div class="pb-2 text-center">
              <a class="grey lighten-2 pa-2 grey--text text--darken-2 text-caption rounded">Hoy</a>
          </div>
          <message sent>Well....</message>
          <message sent>Nothing new. ¿ What about you ?</message>
          <message>Same as always</message>
      </v-row>
      <v-row v-if="display" class="white px-3" justify="center">
            
          <v-text-field
            placeholder="Type a message"
            prepend-inner-icon="mdi-emoticon"
            append-outer-icon="mdi-send"
          ></v-text-field>
      </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/Home/M6Chat/Message'
export default {
    data: () => ({
        display: true
    }),
    props: ['data'],
    components: {
        Message
    },
    computed: {
        ...mapState(['chats', 'users']),
        user: function(){
            return this.users.find(u => u.id === this.data.id)
        }
    },
    methods: {
        closeChat() {
            if (this.chats.includes(this.data.id)) {
                if (this.chats.indexOf(this.data.id) > -1) {
                this.chats.splice(this.chats.indexOf(this.data.id), 1)
                }
            }
        }
    }

}
</script>

<style>

</style>