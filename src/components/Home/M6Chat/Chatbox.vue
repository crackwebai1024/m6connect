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
      <div class="align-center d-flex">
        <v-badge
          bottom
          class="mr-2"
          :color="channel.online ? 'green accent-3' : 'transparent'"
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
            {{ users[0].user.last_active }}
          </p>
        </div>
      </div>
      <div>
        <!-- <v-btn
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
        </v-btn> -->
        <v-btn
          class="btn-chat-shadow ml-2"
          color="white"
          fab
          x-small
          @click="closeChat"
        >
          <v-icon
            size="15"
          >
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-divider
      class="divider-chat"
      :class="[minimized ? 'd-none' : '']"
    />
    <!-- Messages Container -->
    <div
      ref="messages"
      class="messages-container ml-2 px-1 vertical-scroll white"
      :class="[minimized ? 'd-none' : '']"
    >
      hola
      <div
        v-for="(message, index) in messages"
        :key="'message-'+ channel.userId + '-' + index"
        class="d-flex"
        :class="[currentUserId === message.authorId ? 'mr-8' : 'ml-8' ]"
      >
        <template v-if="user.id === message.user.id">
          <span class="align-center d-flex grey--text mb-3 ml-auto text-caption">{{ messageTime(message.created_at) }}</span>
          <div
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
            @click="print(message)"
          >
            mdi-check-all
          </v-icon>
        </template>
        <template v-else>
          <img
            v-if="firstCommentBeforeAnswer(message.authorId, index, channel.messages)"
            :alt="channel.userName"
            class="mr-3 rounded-circle"
            height="30"
            :src="channel.userImgSrc"
            width="30"
          >
          <v-card
            v-else
            class="mr-3"
            elevation="0"
            height="30"
            width="30"
          >
            <v-avatar
              :color="users[0].user.image ? '' : 'blue'"
              dark
              size="36"
            >
              <v-img
                v-if="users[0].user.image"
                :src="users[0].user.image"
              />
              <template v-else>
                <span class="text-uppercase white--text">{{ users[0].user.name.charAt(0) }}</span>
              </template>
            </v-avatar>
          </v-card>
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

      <!-- end day -->
      <!-- <div class="d-flex text-caption align-center my-2 grey--text">
        <v-divider class="blue-grey lighten-5"></v-divider>
        1 day ago
        <v-divider class="blue-grey lighten-5"></v-divider>
      </div> -->
    </div>
    <!-- <v-emoji-picker @select="selectEmoji" /> -->
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
    <!-- files -->
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
    <!-- images or files ui -->
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
    <div
      class="align-center chat-send-section px-4"
      :class="[minimized ? 'd-none' : 'd-flex']"
    >
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
import { mapGetters } from 'vuex'
import VEmojiPicker from 'v-emoji-picker'

export default {
  name: 'Chatbox',
  components: {
    VEmojiPicker
  },
  props: {
    channel: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    input: '',
    display: true,
    // user id john doe
    currentUserId: 2,
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
    minimized: false
  }),
  computed: {
    ...mapGetters('Auth', { user: 'getUser' }),
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
      this.state.members.forEach(user => {
        if (user.user.id !== this.user.id) {
          users.push(user)
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
  async mounted() {
    this.state = await this.channel.watch()
    this.messages = this.state.messages
    this.channel.on('message.new', this.addNewMessage)
    this.dataReady = true

    this.$nextTick(() => {
      this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      this.$refs.inputMessage.focus()
    })
  },
  methods: {
    addNewMessage(event) {
      this.messages = [...this.messages, event.message]
      this.$nextTick(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
        this.$refs.inputMessage.focus()
      })
    },
    async closeChat() {
      this.channel.off('message.new', this.addNewMessage)
      await this.$store.dispatch('GSChat/removeChat', this.state.channel.id)
    },
    firstCommentBeforeAnswer(authorId, index, messages) {
      // if (index === 0) {
      //   return true
      // } else {
      //   return authorId === messages[index - 1].authorId ? false : true
      // }
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

      this.$store.dispatch('GSChat/sendMessage', {
        channel: this.channel,
        message: this.valueInput
      }).catch(e => console.error(e))

      this.valueInput = ''
      this.imageFiles = []
      this.docFiles = []
      this.$nextTick(() => {
        self.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
        this.$refs.inputMessage.focus()
      })
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
