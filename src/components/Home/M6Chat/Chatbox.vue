<template>
  <v-card
    v-if="dataReady"
    class="chat-box d-flex flex-column mx-2 rounded-t-lg"
    :class="[minimized ? 'minimized' : '']"
    elevation="3"
  >
    <div
      class="align-center chat-title d-flex justify-space-between px-4"
      :class="[minimized ? 'blue lighten-2' : '']"
      @click="minimizeChatBox"
    >
      <div v-if="Object.keys( channel.state.members ).length == 2"
        class="align-center d-flex"
      >
        <v-badge
          bottom
          class="mr-2"
          :color="users[0].user.online ? 'green accent-3' : 'transparent'"
          dot
          offset-x="10"
          offset-y="10"
        >
          <v-avatar size="42">
            <img
              :alt="channel.name"
              :src="users[0].user.image"
            >
          </v-avatar>
        </v-badge>
        <div class="ml-1">
          <p
            class="font-weight-medium ma-0 pa-0 text-body-2"
            :class="[minimized ? 'white--text' : '']"
          >
            {{ users[0].user.name }}
          </p>
          <p
            v-if="users[0].user.online"
            class="font-weight-medium ma-0 pa-0 text-caption"
            :class="[minimized ? 'white--text' : 'green--text text--accent-4']"
          >
            online
          </p>
          <p
            v-else
            class="font-weight-medium ma-0 pa-0 text-caption"
            :class="[minimized ? 'white--text' : 'blue--text']"
          >
            {{ setDate( new Date( users[0].user.last_active )) }}
          </p>
        </div>
      </div>
      <div v-else
        class="align-center d-flex"
      >
        <v-avatar size="42" class="mr-2">
          <img
            v-if="channel.data.image !== ''"
            :alt="channel.data.image"
            :src="channel.data.image"
          >
          <v-icon v-else>
            mdi-account-group-outline
          </v-icon>

        </v-avatar>
        <div class="ml-1">
          <p
            class="font-weight-medium ma-0 pa-0 text-body-2"
            :class="[minimized ? 'white--text' : '']"
          >
            {{ channel.data.name }}
          </p>
        </div>
      </div>
      <div class="d-flex">
        <v-dialog
          v-if="Object.keys( channel.state.members ).length == 2"
          v-model="deleteDialog"
          width="50%">
          <template v-slot:activator="{ on, attrs }">
            <v-hover
              v-slot:default="{ hover }">
              <div>
                <v-card v-if="hover" class="absolute settings-message top-2 mr-6 p-2">
                  <v-icon
                    size="18"
                    @click="messageEdit = channel.membersInChannel.user.id + 'channel'"
                    v-bind="attrs" v-on="on" >
                    mdi-delete
                  </v-icon>
                </v-card>
                <v-btn
                  class="btn-chat-shadow ml-2"
                  color="white" fab x-small >
                  <v-icon
                    size="15" >
                    mdi-cogs
                  </v-icon>
                </v-btn>
              </div>
            </v-hover>
          </template>
          <delete-dialog v-if="messageEdit === channel.membersInChannel.user.id + 'channel'" :element="`conversation with '${channel.membersInChannel.user.name}'`" @closeDeleteModal="cleanChat($event)" />
        </v-dialog>
        <v-dialog
          v-else
          v-model="deleteDialog"
          width="50%">
          <template v-slot:activator="{ on, attrs }">
            <v-hover
              v-slot:default="{ hover }">
              <div>
                <v-card v-if="hover" class="absolute settings-message top-0 p-2">
                  <v-icon
                    size="18"
                    @click="messageEdit = channel.data.id + '-channel'"
                    v-bind="attrs" v-on="on" >
                    mdi-delete
                  </v-icon>
                  <v-icon
                    size="18"
                    @click="messageEdit = channel.data.id + '-info'"
                    v-bind="attrs" v-on="on" >
                    mdi-information-outline
                  </v-icon>
                  <v-icon
                    @click="messageEdit = channel.data.id + '-add-user'"
                    size="18"
                    v-bind="attrs" v-on="on">
                    mdi-account-multiple-plus-outline
                  </v-icon>
                </v-card>
                <v-btn
                  class="btn-chat-shadow ml-2"
                  color="white" fab x-small >
                  <v-icon
                    size="15" >
                    mdi-cogs
                  </v-icon>
                </v-btn>
              </div>
            </v-hover>
          </template>
          <delete-dialog v-if="messageEdit === channel.data.id + '-channel'" :element="`messages on '${channel.data.name}' group`" @closeDeleteModal="cleanChat($event)" />
          <add-user-dialog v-if="messageEdit === channel.data.id + '-add-user'" :currentUsers="channel.state.members" @closeModal="addUser($event)"></add-user-dialog>
          <info-users-dialog v-if="messageEdit === channel.data.id + '-info'" :currentUsers="channel.state.members" :channel="channel" ></info-users-dialog>
        </v-dialog>
        <v-btn
          class="btn-chat-shadow ml-2"
          color="white" fab x-small
          @click="closeChat" >
          <v-icon
            size="15" >
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider
      class="divider-chat"
      :class="[minimized ? 'd-none' : '']" />
    <!-- Messages Container -->
    <div
      ref="messages"
      class="messages-container ml-2 px-1 vertical-scroll white"
      :class="[minimized ? 'd-none' : '']"
    >
      <!-- Message Bubble -->
      <div
        v-for="(message, index) in messages"
        :key="'message-'+ channel.userId + '-' + index"
      >
        <!-- Day Divider -->
        <div
          v-if="dayDivider(message.created_at, index).show"
          class="d-flex text-caption align-center my-2 grey--text"
        >
          <v-divider class="blue-grey lighten-5"></v-divider>
            <span class="mx-3">{{ dayDivider(message.created_at, index).value }}</span>
          <v-divider class="blue-grey lighten-5"></v-divider>
        </div>
        <div
          class="d-flex"
          :class="[user.id === message.user.id ? 'ml-8' : 'mr-8' ]"
        >
          <template v-if="user.id === message.user.id">
            <span class="align-center d-flex grey--text mb-3 ml-auto text-caption">{{ messageTime(message.created_at) }}</span>
            <div v-if="messageEdit === message.id">
              <input
                ref="inputMessage"
                v-model="messageEditInput"
                class="h-full outline-none px-2 text-body-1"
                size="8"
                @keyup.esc="cancelMessage"
                @keyup.enter="editMessage">
              <v-btn
                class="btn-chat-shadow grey--text mr-2"
                fab
                height="23"
                width="23"
                x-small
                @click="toogleDialogEmoji"
              >
                <v-icon size="22">
                  mdi-emoticon-happy-outline
                </v-icon>
              </v-btn>
              <v-btn
                class="btns-message white--text"
                fab
                height="25"
                icon
                width="25"
                x-small
                @click="editMessage"
              >
                <v-icon
                  class="-rotate-45"
                  size="13"
                >
                  mdi-send
                </v-icon>
              </v-btn>
            </div>
            <div v-else
              class="arrow-up grey grey--text lighten-4 mb-3 message-arrow ml-1 mr-2 px-3 py-2 relative text--darken-3 text-body-2 text-right w-fit"
            >
              {{ message.text }}
              <div
                v-if="message.images"
                class="d-flex ml-auto w-fit"
              >
                <div
                  v-for="(image, index) in message.images"
                  :key="'imagemsg-' + index"
                  class="mt-2 mx-1 relative w-fit"
                >
                  <img
                    class="image-preview"
                    :src="image"
                  >
                </div>
              </div>
            </div>
            <v-icon
              :class="[message.read ? 'blue--text' : 'grey--text']"
              size="11"
            >
              mdi-check-all
            </v-icon>
            <v-dialog
              v-model="deleteDialog"
              width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-hover
                  v-slot:default="{ hover }">
                  <div style="position: relative;">
                    <v-card v-if="hover" class="settings-message">
                        <v-icon
                          @click="messageEdit = message.id+message.id"
                          v-bind="attrs" v-on="on" >
                          mdi-delete
                        </v-icon>
                      <v-icon @click="edit(message)">
                        mdi-pencil
                      </v-icon>
                    </v-card>
                    <v-icon>
                      mdi-settings-helper
                    </v-icon>
                  </div>
                </v-hover>
              </template>
              <delete-dialog :element="`message '${message.text}'`" v-if="messageEdit === message.id+message.id" @closeDeleteModal="beforeDelete($event, message.id)" />
            </v-dialog>
          </template>
          <template v-else>
            <img
              v-if="firstCommentBeforeAnswer(message.user.id, index)"
              @click="print(message)"
              :alt="channel.userName"
              class="mr-3 rounded-circle"
              height="30"
              :src="message.user.image"
              width="30"
            >
            <v-card
              v-else
              class="mr-3"
              elevation="0"
              height="30"
              width="30"
            />
            <div class="arrow-down blue mb-3 message-arrow mr-1 mt-1 px-3 py-1 relative text-body-2 text-left w-fit white--text">
              {{ message.text }}
              <div
                v-if="message.images"
                class="d-flex mr-auto w-fit"
              >
                <div
                  v-for="(image, index) in message.images"
                  :key="'imagemsg-' + index"
                  class="mt-2 mx-1 relative w-fit"
                >
                  <img
                    class="image-preview"
                    :src="image"
                  >
                </div>
              </div>
            </div>
            <span class="align-center d-flex grey--text mb-3 mr-auto text-caption">{{ messageTime(message.created_at) }}</span>
          </template>
        </div>
      </div>
    </div>
    <!-- Emoji Picker -->
    <div
      class="relative"
      :class="[minimized ? 'd-none' : '']"
    >
      <v-emoji-picker
        v-show="showDialog"
        class="absolute bottom-0 card-custom-shadow emoji-component grey lighten-5"
        label-search="Search"
        lang="en"
        @select="onSelectEmoji"
      />
    </div>

    <v-divider
      class="blue-grey lighten-5"
      :class="[minimized ? 'd-none' : '']"
    />
    <!-- Files -->
    <template v-if="docFiles.length > 0">
      <div class="d-flex docs images-container mx-1 px-0 py-1">
        <div
          v-for="(docFile, index) in docFiles"
          :key="'previewdoc-' + index"
          class="align-center blue d-flex justify-center mx-1 previewdoc px-2 rounded-pill"
        >
          <v-icon
            class="white--text"
            left
          >
            mdi-file-outline
          </v-icon>
          <span class="docfile-name text-caption white--text">{{ docFile.name }}</span>

          <v-icon
            class="blue lighten-2 ml-2 pa-1 rounded-xl white--text"
            size="12"
            @click="removeDoc(index)"
          >
            mdi-close
          </v-icon>
        </div>
      </div>
    </template>
    <!-- Images -->
    <template v-if="srcImageFiles.length > 0">
      <div class="d-flex images-container mx-1 px-0 py-3">
        <div
          v-for="(srcImageFile, index) in srcImageFiles"
          :key="'previewimage-' + index"
          class="mx-1 relative w-fit"
        >
          <img
            class="image-preview"
            :src="srcImageFile"
          >
          <v-btn
            class="absolute btn-chat-shadow ml-2 right-0 top-0"
            color="grey lighten-2"
            fab
            style="height:15px; width:15px;"
            @click="removeImage(index)"
          >
            <v-icon
              size="12"
            >
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </div>
    </template>
    <p 
      v-if="Object.keys( whoTyping ).length > 0"
      class="text-caption my-0 mx-5 font-italic"
    >
      User {{whoTyping.name}} is typing
    </p>
    <div
      class="align-center chat-send-section px-4"
      :class="[minimized ? 'd-none' : 'd-flex']" >
      <v-menu
        :close-on-content-click="false"
        elevation="0"
        :offset-y="offset"
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            class="align-center btns-message d-flex justify-center white--text"
            elevation="0"
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
          <v-list-item class="ma-0 pa-0 uploadfile-btn">
            <v-tooltip
              class="tooltip-upload-file"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    class="align-center d-flex justify-center ma-0 pa-0 upload-icon white--text"
                    hide-input
                    multiple
                    prepend-icon="mdi-image"
                    @change="onImagesChange($event)"
                  />
                </div>
              </template>
              <span class="black--text blue lighten-2 pa-1 rounded text-caption white--text">Image</span>
            </v-tooltip>
          </v-list-item>
          <v-list-item class="ma-0 pa-0 uploadfile-btn">
            <v-tooltip
              class="tooltip-upload-file"
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-file-input
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf"
                    class="align-center d-flex justify-center ma-0 pa-0 upload-icon white--text"
                    hide-input
                    multiple
                    prepend-icon="mdi-file-outline"
                    @change="onDocsChange($event)"
                  />
                </div>
              </template>
              <span class="black--text blue lighten-2 pa-1 rounded text-caption white--text">Document</span>
            </v-tooltip>
          </v-list-item>
        </v-list>
      </v-menu>
      <input
        ref="inputMessage"
        v-model="valueInput"
        class="h-full outline-none px-2 text-body-1 w-full"
        placeholder="Type a message here..."
        @keyup="typing"
        @keydown="stopTyping"
        @keyup.enter="sendMessage"
      >
      <v-btn
        class="btn-chat-shadow grey--text mr-2"
        fab
        height="23"
        width="23"
        x-small
        @click="toogleDialogEmoji"
      >
        <v-icon size="22">
          mdi-emoticon-happy-outline
        </v-icon>
      </v-btn>
      <v-btn
        class="btns-message white--text"
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
import { mapGetters, mapActions } from 'vuex'
import VEmojiPicker from 'v-emoji-picker'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'
import AddUserDialog from '@/components/Dialogs/AddUserDialog'
import InfoUsersDialog from '@/components/Dialogs/InfoUsersDialog'

export default {
  name: 'Chatbox',
  components: {
    InfoUsersDialog,
    AddUserDialog,
    DeleteDialog,
    VEmojiPicker
  },
  props: {
    channel: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    deleteDialog: false,
    hover: false,
    input: '',
    display: true,
    whoTyping: {},
    // user id john doe
    currentUserId: 2,
    messageEdit: '',
    messageEditInput: '',
    dataReady: false,
    messages: [],
    state: {
      messages: [],
      members: [],
      channel: {}
    },
    valueInput: '',
    showDialog: false,
    imageFiles: [],
    docFiles: [],
    offset: true,
    minimized: false,
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }),
  computed: {
    ...mapGetters('Auth', { user: 'getUser' }),
    ...mapGetters('GSChat', { client: 'client' }),

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
      Object.keys(this.channel.state.members).forEach(userKey => {
        if (userKey !== this.user.id) {
          users.push(this.channel.state.members[userKey]);
        }
      })
      return users
    },
    srcImageFiles() {
      const srcImages = []
      this.imageFiles.forEach(imageFile => {
        srcImages.push(URL.createObjectURL(imageFile))
      })
      return srcImages
    }
  },
  watch: {
    messages: function(){
      this.messages.forEach((message, ind) => {
        if (message.type === 'deleted') {
          this.messages.splice(ind, 1);
        }
      })
    }
  },
  async mounted() {
    this.state = await this.channel.watch()
    this.messages = this.state.messages
    this.channel.on('message.new', this.addNewMessage)
    this.channel.on('message.deleted', this.deleteMessage)
    this.channel.on('message.updated', this.updateMsg)
    
    this.client.on('typing.start', r => {
      if (r.user.id != this.user.id) {
        this.whoTyping = r.user;
      }
    })
    this.client.on('typing.stop', r => {
      if (r.user.id != this.user.id) {
        this.whoTyping = '';
      }
    })
    
    this.dataReady = true
  },
  methods: {
    ...mapActions("GSChat", ["removeMessage", "updateMessage"]),
    edit(message){
      this.messageEdit = message.id;
      this.messageEditInput = message.text;
    },
    async addUser(event) {
      this.deleteDialog = false;
      this.hover = false;
      if (event.users.length > 0) {
        // We make the new conversation
        let res = [];
        event.users.forEach(item => {
          if(Object.keys(this.channel.state.members).indexOf(item) < 0){
            res.push(item);
          }
        });

        if (res.length > 0) {
          await this.channel.addMembers(res);
        }
      }
    },
    removeUser(event){
      this.deleteDialog = false;
      this.hover = false;
    },
    async cleanChat(event){
      this.deleteDialog = false;
      this.hover = false;
      if(event){
        this.messages = [];
        await this.channel.delete();
        // await this.channel.hide(null, true);
        // await this.channel.show();
      }
    },
    async typing(){
      await this.channel.keystroke();
    },
    async stopTyping(){
      await this.channel.stopTyping();
    },
    setDate(item){
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      
      // If the last session was more than 1 day ago it shows the date else it shows the time.
      return 86400000 - (new Date - item) <= 0 ? 
        `Last connection: ${months[item.getMonth()]}/${item.getDate()}/${item.getFullYear()}` :
        `Last connection: ${
          item.getHours() > 12 ? (item.getHours() - 12).toString().padStart(2,'0') : item.getHours().toString().padStart(2,'0')
        }:${item.getMinutes().toString().padStart(2,'0')} ${item.getHours() > 12 ? 'PM' : 'AM'}`
    },
    addNewMessage(event) {
      this.messages = [...this.messages, event.message]
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
        this.$refs.inputMessage.focus()
      })
    },
    cancelMessage(){
      this.messageEdit = '';
      this.messageEditInput = '';
    },
    editMessage(){
      if(this.messageEditInput !== ''){
        this.updateMessage({ 
          id: this.messageEdit, 
          text: this.messageEditInput
        });
        this.messageEdit = '';
        this.messageEditInput = '';
      }
    },
    deleteMessage(event){
      this.messages.splice(this.messages.indexOf(
        this.messages.filter((e) => { return e.id === event.message.id; })[0]
      ), 1);
    },
    updateMsg(event){
      let msgs = this.messages;
      let index = msgs.indexOf( msgs.filter((e) => { return e.id === event.message.id; })[0] )
      this.messages[index] = Object.assign(...[msgs[index], event.message]);
    },
    async closeChat() {
      this.channel.off('message.new', this.addNewMessage)
      await this.$store.dispatch('GSChat/removeChat', this.state.channel.id)
      await this.channel.markRead();
    },
    firstCommentBeforeAnswer(authorId, index, messages) {
      if (index === 0) {
        return true
      } else {
        return authorId === this.messages[index - 1].user.id ? false : true
      }
    },
    dayDivider(messageTime, index) {
      let result = {
        show: false,
        value: ''
      }
      const currentMessageTime = new Date(messageTime)
      const dateNow = new Date()
      if (index !== 0) {
        const beforeMessageTime = new Date(this.messages[index - 1].created_at)
        if (currentMessageTime.getDate() !== beforeMessageTime.getDate()) {
          result.show = true
        }
      } else {
        result.show = true
      }
      if (result.show) {
        let dayCurrentWeekDifference = Math.floor((dateNow.getTime() - currentMessageTime.getTime()) / 2678400000)
        switch(dayCurrentWeekDifference) {
          case 0:
            result.value = 'Today'
            break;
          case 1:
            result.value = 'Yesterday'
            break;
          case 2:
          case 3:          
          case 4:
          case 5:
          case 6:
            result.value = this.days[currentMessageTime.getDay()]
            break;
          default:
            result.value = (currentMessageTime.getMonth() + 1) + '/' + currentMessageTime.getDate() + '/' + currentMessageTime.getFullYear()
        }
      }
      return result
    },
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog
    },
    onSelectEmoji(emoji) {
      if(this.messageEdit === ''){
        this.valueInput += emoji.data
        // Optional
        this.toogleDialogEmoji()
        this.$nextTick(() => this.$refs.inputMessage.focus())
      }else{
        this.messageEditInput += emoji.data
        this.toogleDialogEmoji()
      }
    },
    sendMessage() {
      if (this.valueInput.trim().length === 0) {
        this.valueInput = ''
        this.$nextTick(() => this.$refs.inputMessage.focus())
        return true
      }

      this.$store.dispatch('GSChat/sendMessage', {
        channel: this.channel,
        message: this.valueInput
      }).catch(e => console.error(e))

      this.valueInput = ''
      this.imageFiles = []
      this.docFiles = []
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
        this.$refs.inputMessage.focus()
      })
    },
    beforeDelete(decision, messageID) {
      this.messageEdit = '';
      this.deleteDialog = false;
      this.hover = false;
      if(decision) {
        this.removeMessage(messageID);
      }
    },
    minimizeChatBox() {
      this.minimized = !this.minimized
    },
    onImagesChange(e) {
      this.imageFiles = e
      this.$refs.inputMessage.focus()
    },
    removeImage(index) {
      this.imageFiles.splice(index, 1)
    },
    onDocsChange(e) {
      this.docFiles = e
      this.$refs.inputMessage.focus()
    },
    removeDoc(index) {
      this.docFiles.splice(index, 1)
    },
    messageTime(time) {
      const messageDate = new Date(time)
      return messageDate.getHours() + ':' + messageDate.getMinutes()
    }
  }
}
</script>

<style>
.chat-box {
  width: 335px;
  max-height: 455px;
}
.chat-box.minimized {
  height: 55px;
}
.chat-title {
  min-height: 60px;
  background: #F7FCFF;
}
/* .rotate-45 {
  transform: rotate(45deg);
} */
.-rotate-45 {
  transform: rotate(-45deg);
}
.btn-chat-shadow {
  box-shadow: 0px 3px 13px -4px #b4b4ec !important;
}
.btns-message {
  background: #366AF5 !important;
}
.divider-chat {
  border-color: rgba(165, 160, 160, 0.12) !important;
}
.messages-container::-webkit-scrollbar {
  width: 13px;
}
.messages-container::-webkit-scrollbar-thumb {
  background: #B4B1CA;
  border-radius: 2px;
  border: 5px solid #fff;
}
.messages-container::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 2px;
  border: 5px solid #fff;
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
  min-height: 50px;
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
  right: 6px;
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
.settings-message {
  position: absolute; 
  padding: 1px; 
  right: 1.5vw; 
  top: 1vh; 
  z-index: 1;
}
.mdi-file-outline::before, .mdi-image::before{
  color: #fff;
  font-size: 15px;
}
.uploadfile-btn * {
  cursor: default;
}
.uploadfile-btn .upload-icon .v-icon--link {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  cursor: pointer;
  background: #366AF5 !important;
  box-shadow: none;
}
.uploadfile-btn .v-input__prepend-outer {
  padding: 0;
  margin: 0;
}
.image-preview {
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 6px;
}
.images-container {
  overflow-x: scroll;
  min-height: 60px;
}
.images-container::-webkit-scrollbar {
  height: 5px;
  width: 3px;
}
.images-container::-webkit-scrollbar-thumb {
  background: #B4B1CA;
  border-radius: 2px;
}
.images-container::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 2px;
}
.docfile-name {
  white-space: nowrap;
}
.docs {
  min-height: 42px;
}
.preview-doc {
  height: 30px;
}
</style>
