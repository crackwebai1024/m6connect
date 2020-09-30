<template>
  <v-card
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
          :color="chatData.online ? 'green accent-3' : 'transparent'"
          dot
          offset-x="10"
          offset-y="10"
        >
          <v-avatar size="42">
            <img
              :alt="chatData.name"
              :src="chatData.userImgSrc"
            >
          </v-avatar>
        </v-badge>
        <div class="ml-1">
          <p
            class="font-weight-medium ma-0 pa-0 text-body-2"
            :class="[minimized ? 'white--text' : '']"
          >
            {{ chatData.userName }}
          </p>
          <p
            v-if="chatData.online"
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
            last online 5 hours ago
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
          @click="closeChat"
          class="btn-chat-shadow ml-2"
          color="white"
          fab
          x-small
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
      class="messages-container mx-2 px-2 vertical-scroll white"
      :class="[minimized ? 'd-none' : '']"
    >
      <div
        v-for="(message, index) in chatData.messages"
        :key="'message-'+ chatData.userId + '-' + index"
        class="d-flex"
      >
        <template v-if="currentUserId === message.authorId">
          <div
            class="arrow-up grey grey--text lighten-4 mb-3 message-arrow ml-auto mr-2 px-3 py-2 relative text--darken-3 text-body-2 text-right w-fit"
          >
            {{ message.body }}
          </div>
          <v-icon
            :class="[message.read ? 'blue--text' : 'grey--text']"
            size="11"
          >
            mdi-check-all
          </v-icon>
        </template>
        <template v-else>
          <img
            v-if="firstCommentBeforeAnswer(message.authorId, index, chatData.messages)"
            :alt="chatData.userName"
            class="mr-3 rounded-circle"
            height="30"
            :src="chatData.userImgSrc"
            width="30"
          >
          <v-card
            v-else
            class="mr-3"
            elevation="0"
            height="30"
            width="30"
          />
          <div class="arrow-down blue mb-3 message-arrow mt-1 px-3 py-1 relative text-body-2 text-left w-fit white--text">
            {{ message.body }}
          </div>
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
    <!-- images or files ui -->
    <template v-if="srcImageFiles.length > 0">
      <div class="images-container d-flex pt-4 pb-6 px-2 mx-4">
        <div class="relative w-fit mx-1" v-for="(srcImageFile, index) in srcImageFiles" :key="'previewimage-' + index">
          <img class="image-preview" :src="srcImageFile"/>
          <v-btn
            @click="removeImage(index)"
            class="absolute top-0 right-0 btn-chat-shadow ml-2"
            color="grey lighten-2"
            fab
            style="height:15px; width:15px;"
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
        elevation="0"
        :offset-y="offset"
        :close-on-content-click="false"
        top
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="0"
            v-bind="attrs"
            class="align-center d-flex justify-center btns-message white--text"
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
          <v-list-item class="pa-0 ma-0 uploadfile-btn">
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
                    class="ma-0 pa-0 upload-icon align-center d-flex justify-center white--text"
                    accept="image/png, image/jpeg, image/bmp"
                    multiple
                    prepend-icon="mdi-image"
                    hide-input
                    @change="onImagesChange($event)"
                  ></v-file-input>
                </div>
              </template>
              <span class="black--text blue lighten-2 pa-1 rounded text-caption white--text">Image</span>
            </v-tooltip>
          </v-list-item>
          <v-list-item class="pa-0 ma-0 uploadfile-btn">
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
                    class="ma-0 pa-0 upload-icon align-center d-flex justify-center white--text"
                    accept="image/png, image/jpeg, image/bmp"
                    multiple
                    prepend-icon="mdi-file-outline"
                    hide-input
                    @change="onDocsChange($event)"
                  ></v-file-input>
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
        class="h-full px-2 outline-none text-body-1 w-full"
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
import { mapState } from 'vuex'
import VEmojiPicker from 'v-emoji-picker'

export default {
  name: 'Chatbox',
  components: {
    VEmojiPicker
  },
  props: {
    chatData: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    input: '',
    display: true,
    // user id john doe
    currentUserId: 2,
    valueInput: '',
    showDialog: false,
    imageFiles: [],
    docFiles: [],
    url: '',
    offset: true,
    minimized: false
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
    },
    srcImageFiles() {
      let srcImages = []
      this.imageFiles.forEach((imageFile) => {
        srcImages.push(URL.createObjectURL(imageFile))
      })
      return srcImages
    }
  },
  mounted() {
    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
  },
  methods: {
    closeChat() {
      this.$emit('closeChat', this.chatData.userId)
      // this.$store.dispatch('GSChat/removeChat', this.data.id)
    },
    firstCommentBeforeAnswer(authorId, index, messages) {
      if (index === 0) {
        return true
      } else {
        return authorId === messages[index - 1].authorId ? false : true
      }
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
      this.chatData.messages.push({
        authorId: this.currentUserId,
        body: this.valueInput,
        read: false,
        timeStamp: date.getTime()
      })

      const self = this
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
      this.url = URL.createObjectURL(e[0])
      this.$refs.inputMessage.focus()
    },
    onDocsChange(e) {
      this.docFiles = e
      this.url = URL.createObjectURL(e[0])
      this.$refs.inputMessage.focus()
    },
    removeImage(index) {
      this.imageFiles.splice(index, 1);
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
}
</style>
