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
                        <v-img :src="user.pic"></v-img>
                    </v-avatar>
                </v-badge>
                <v-list-item-title
                :class="display? 'white--text' : 'grey--text text--darken-3'">
                    {{user.name}}
                </v-list-item-title>
            </v-list-item>
          </v-col>
          <v-icon>mdi-cog-outline</v-icon>
          <v-icon @click="closeChat()">mdi-close</v-icon>
      </v-row>
      <v-row v-if="display" style="overflow: auto" class="white pa-3 fill-height">
            <v-col class="d-flex flex-column">
                <template v-for="(group, i) in groupedMessages">
                <div class="text-center py-2" :key="'group-' + group">
                    <a class="px-2 py-1 text-caption rounded-lg grey lighten-2 grey--text text--darken-2">
                        {{i | day}}
                    </a>
                </div>
                <message :sent="msg.author === 'me'"
                   :key="'msg-' + i" 
                   v-for="(msg, i) in group">
                   {{msg.body}}
                </message>
            </template>
            </v-col>
      </v-row>
      <v-row v-if="display" class="white px-3" justify="center">
          <v-text-field
            v-model="input"
            placeholder="Type a message"
            prepend-inner-icon="mdi-emoticon"
            append-outer-icon="mdi-send"
            @keydown.enter="sendMessage()"
            @click:append-outer="sendMessage()"
          ></v-text-field>
      </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/Home/M6Chat/Message'
export default {
    data: () => ({
        input: "",
        display: true,
        messages: [
            {
                date: {
                    day: 1,
                    month: 2,
                    year: 1999,
                    hour: 19,
                    minute: 1
                },
                body: "This message was sent by me",
                author: "me"
            },
            {
                date: {
                    day: 1,
                    month: 2,
                    year: 1999,
                    hour: 19,
                    minute: 1
                },
                body: "Yeah, you're right",
                author: "1"
            }
        ]
    }),
    props: ['data'],
    components: {
        Message
    },
    computed: {
        ...mapState(['chats', 'users']),
        user: function(){
            return this.users.find(u => u.id === this.data.id)
        },
        groupedMessages () {
            let groupedMessages = this.messages.reduce(function(r,a) {
                r[a.date.day] = [...r[a.date.day] || [], a];
                return r;
            }, {})
            return groupedMessages
        }
    },
    filters: {
        day: day => {
            var days = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 7: 'Sunday'}
            return days[day]
        }
    },
    methods: {
        closeChat() {
            if (this.chats.includes(this.data.id)) {
                if (this.chats.indexOf(this.data.id) > -1) {
                this.chats.splice(this.chats.indexOf(this.data.id), 1)
                }
            }
        },
        sendMessage(){
            let input = this.input
            const date = new Date()

            let message = {
                date: {
                    day: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                    hour: date.getHours(),
                    minute: date.getMinutes()
                },
                body: input,
                author: 'me'
            }
            this.messages.push(message)
            this.input = ''
        }
    }

}
</script>

<style>

</style>