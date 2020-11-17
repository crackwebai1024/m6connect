<template>
  <v-card>
    <v-toolbar
      color="purple accent-4"
    >
      <v-toolbar-title class="white--text">
        Channel Settings
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        class="white--text"
        color="transparent"
        depressed
        tile
        @click="boolDeleteDiaLog = true"
      >
        Delete Channel <v-icon>mdi-trash-can</v-icon>
      </v-btn>
      <v-dialog
        v-model="boolDeleteDiaLog"
        max-width="350"
        persistent
      >
        <delete-dialog
          :element="`cannel: '${ channel.data.name }'`"
          @closeDeleteModal="$event ? deleteGroup() : boolDeleteDiaLog = false"
        />
      </v-dialog>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col class="col pa-0 text-center">
            <v-avatar
              class="mr-2 text-center"
              size="130"
            >
              <img
                v-if="channelImage !== ''"
                :alt="channelImage"
                :src="channelImage"
              >
              <v-icon
                v-else
                size="130"
              >
                mdi-account-group-outline
              </v-icon>
            </v-avatar>
            <m6-upload

              btn-button="purple"
              @loading="loading = !loading"
              @response="reponseProfileImg"
            >
              <v-icon>mdi-pencil</v-icon>
            </m6-upload>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <h2 class="mt-5 text-body-1">
              Channel Name:
            </h2>
          </v-col>
          <v-col>
            <v-text-field
              v-model="channelName"
              class="mt-0"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="error"
        dark
        width="95px"
        @click="updateChannel(false)"
      >
        Cancel
      </v-btn>
      <v-btn
        color="success"
        dark
        width="95px"
        @click="updateChannel(true)"
      >
        Edit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
import DeleteDialog from '@/components/Dialogs/DeleteDialog'

export default {
  name: 'SettingsChannelDialog',
  components: {
    DeleteDialog
  },
  props: {
    channel: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    boolDeleteDiaLog: false,
    loading: false,
    channelName: '',
    channelImage: ''
  }),
  methods: {
    ...mapMutations('SnackBarNotif',
      { notifDanger: 'notifDanger' }
    ),
    deleteGroup() {
      this.channel.delete().then(() => {
        this.updateChannel(false)
      }).catch(() => {
        this.notifDanger('There was an error since deleting.')
      })
      this.boolDeleteDiaLog = false
    },
    async updateChannel(res) {
      if (res) {
        const res = await this.channel.update({
          name: this.channelName,
          image: this.channelImage
        })
        this.$emit('closeEditeModal')
      } else {
        this.channelName = this.channel.data.name
        this.channelImage = this.channel.data.image
        this.$emit('closeEditeModal')
      }
    },
    reponseProfileImg(res) {
      if (res.ok) {
        this.channelImage = res.data.link
      } else {
        this.notifDanger('There was an error while saving the file')
      }
    }
  },
  mounted() {
    this.channelName = this.channel.data.name
    this.channelImage = this.channel.data.image
  }
}
</script>
