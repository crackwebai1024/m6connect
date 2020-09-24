<template>
  <div
    class="d-flex mx-4"
    :class="display? 'flex-column' : 'flex-row align-end'"
    style="width: 270px;"
    :style="display? 'height: 400px' : 'height:auto'"
  >
    <v-row
      class="align-center d-flex pointer px-3 py-1 rounded-t-lg"
      :class="display? 'primary' : 'white'"
    >
      <v-col
        class="flex-grow-1 pa-0"
        @click="display = !display"
      >
        <v-list-item class="ma-0 pa-0">
          <v-badge
            bordered
            bottom
            class="mr-3"
            color="green accent-4"
            dot
            offset-x="10"
            offset-y="10"
          >
            <v-avatar size="36">
              <v-img :src="user.pic" />
            </v-avatar>
          </v-badge>
          <v-list-item-title
            :class="display? 'white--text' : 'grey--text text--darken-3'"
          >
            {{ user.name }}
          </v-list-item-title>
        </v-list-item>
      </v-col>
      <v-icon>mdi-cog-outline</v-icon>
      <v-icon @click="closeChat">
        mdi-close
      </v-icon>
    </v-row>
    <v-row
      v-if="display"
      class="fill-height pa-3 white"
      style="overflow: auto"
    >
      <v-col class="d-flex flex-column">
        <template v-for="(group, i) in groupedMessages">
          <div
            :key="'group-' + group"
            class="py-2 text-center"
          >
            <a class="grey grey--text lighten-2 px-2 py-1 rounded-lg text--darken-2 text-caption">
              {{ i | day }}
            </a>
          </div>
          <message
            v-for="(msg, mi) in group"
            :key="'msg-' + mi"
            :sent="msg.author === 'me'"
          >
            {{ msg.body }}
          </message>
        </template>
      </v-col>
    </v-row>
    <v-row
      v-if="display"
      class="px-3 white"
      justify="center"
    >
      <v-text-field
        v-model="input"
        append-outer-icon="mdi-send"
        placeholder="Type a message"
        prepend-inner-icon="mdi-emoticon"
        @click:append-outer="sendMessage"
        @keydown.enter="sendMessage"
      />
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/Home/M6Chat/Message'

export default {
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
    data: {
      type: {},
      default: () => {},
      required: true
    }
  },
  data: () => ({
    input: '',
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
        body: 'This message was sent by me',
        author: 'me'
      },
      {
        date: {
          day: 1,
          month: 2,
          year: 1999,
          hour: 19,
          minute: 1
        },
        body: 'Yeah, you\'re right',
        author: '1'
      }
    ]
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

  methods: {
    closeChat() {
      if (this.chats.includes(this.data.id)) {
        if (this.chats.indexOf(this.data.id) > -1) {
          this.chats.splice(this.chats.indexOf(this.data.id), 1)
        }
      }
    },
    sendMessage() {
      const input = this.input
      const date = new Date()

      const message = {
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
