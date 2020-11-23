<template>
  <v-dialog
    v-model="showDialog"
    fullscreen
    persistent
  >
    <v-card>
      <v-card-title class="blue dakren-2 white--text">
        <h1 class="white--text">
          Snapshot
        </h1>

        <v-spacer />

        <v-btn
          color="white"
          icon
          @click="addNotes"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="card-text">
        <v-container
          class="grey lighten-5 p-4"
          fluid
        >
          <v-row>
            <v-col sm="9">
              <div>
                <v-stage
                  id="stage-layer"
                  ref="stage"
                  :config="configKonva"
                  :style="`background-image: url(&quot;${ imageTest }&quot;); background-size: 100% auto`"
                  @dragend="handleDragend"
                  @dragstart="handleDragstart"
                >
                  <v-layer ref="layer">
                    <v-circle
                      v-for="item in rapidItem.items"
                      :key="item.id"
                      :config=" {
                        x: item.x,
                        y: item.y,
                        id: item.id,
                        draggable: true,
                        width: 20,
                        height: 20,
                        fill: $h.dg( item, 'rating.color', '#37474F' ), // blue-grey darken-3
                        shadowBlur: 25,
                        opacity: 0.9
                      }"
                    />
                  </v-layer>
                </v-stage>
              </div>
            </v-col>
            <v-col
              class="sidebar-custom"
              sm="3"
            >
              <v-expansion-panels accordion v-model="panelModel" >
                <v-expansion-panel
                  v-for="(n, i) in rapidItem.items"
                  :key="`notes-${n.id}-${i}`"
                >
                  <v-expansion-panel-header color="grey lighten-4" >
                    {{ i + 1 }}: RAP-{{ i + 1 }}-{{ new Date().getFullYear() }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="inline mt-2">
                      <div>
                        <speed-dial @expanding="colorPickerBool">
                          <template v-slot:activatorBtn>
                            <v-avatar
                              class="mr-2"
                              :color="$h.dg(n, 'rating.color', '#37474F')"
                              size="28"
                            >
                              <span class="subtitle-2 white--text">{{ generatePriorityScore( generatePriorityScore(n) ) }}</span>
                            </v-avatar>
                          </template>
                          <template v-slot:options>
                            <v-tooltip 
                              right
                              v-for="(r, i) in ratings"
                              :key="`rating-${i}`"
                              color="grey darken-1"
                            >
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  :color="r.color"
                                  dark
                                  fab
                                  small
                                  v-on="on"
                                  @click="n.rating = r"
                                />
                              </template>
                              <span class="pa-2 white--text">{{ r.text }}</span>
                            </v-tooltip>
                          </template>
                        </speed-dial>
                        <speed-dial v-if="colorPickerSwitchShow">
                          <template v-slot:activatorBtn>
                            <span
                              style="font-size: 1.5rem;"
                              v-html="n.reaction.emoji"
                            />
                          </template>
                          <template v-slot:options>
                            <v-tooltip
                              v-for="(u, i) in userReactions"
                              :key="`user-reaction-${i}`"
                              color="grey darken-1"
                              right
                            >
                              <template v-slot:activator="{ on }">
                                <v-btn
                                  fab
                                  x-small
                                  v-on="on"
                                  @click="n.reaction = u"
                                >
                                  <span
                                    class="emoji-font-size"
                                    v-html="u.emoji"
                                  />
                                </v-btn>
                              </template>
                              <span class="pa-1 white--text">{{ u.text }}</span>
                            </v-tooltip>
                          </template>
                        </speed-dial>
                      </div>
                      <v-text-field
                        v-model="rapidItem.items[i].title"
                        label="Title"
                        outlined
                      />
                      <v-btn
                        v-show="rapidItem.items.length > 1"
                        color="red darken-2"
                        icon
                        @click="removeNote(n)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <v-textarea
                      v-model="rapidItem.items[i].text"
                      label="Description"
                      outlined
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-container>

        <m6-loading :loading="loading" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="red"
          text
          @click="closing"
        >
          close
        </v-btn>


        <v-btn
          class="white--text"
          color="green darken-2"
          @click="saving"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import SpeedDial from '@/components/_partials/SpeedDial.vue'
const width = window.innerWidth * .7
const height = window.innerHeight * .7
const noteModel = {
  title: '',
  text: '',
  x: Math.floor(width / 2),
  y: Math.floor(height / 2),
  rotation: 180,
  selected: false,
  rating: { color: '#2E7D32', level: 5, text: 'Experience Is Awesome' },
  reaction: { emoji: '&#128578;', level: 5, text: 'Ok' },
  user: {},
  company: {},
  url: ''
}
const rapidItemDefault = { items: [], company: {}, user: {}, imgLink: '' }

export default {

  components: {
    SpeedDial
  },

  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    imageTest: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    defaultNote: noteModel,
    rapidItem: { ...rapidItemDefault },
    rapidItemDefault: rapidItemDefault,
    notes: [],
    dragItemId: null,
    configKonva: {
      width: width,
      height: height
    },
    loading: false,
    userReactions: [
      { emoji: '&#129324;', level: 6, text: 'Upset' }, // angry cursing face
      {
        emoji: '&#129298;',
        level: 5,
        text: 'Frustrated'
      }, // sick face with thermometer
      { emoji: '&#128580;', level: 4, text: 'Not Sure' }, // rolling eyes face
      { emoji: '&#128577;', level: 3, text: 'Sad' }, // frowney face
      { emoji: '&#129319;', level: 2, text: 'Looking Good' }, // bandaged face
      { emoji: '&#128578;', level: 1, text: 'Happy' } // smiley face
    ],
    ratings: [
      { color: '#C62828', level: 6, text: 'Stopped Working' }, // red darken-3
      { color: '#EF6C00', level: 5, text: 'Clunky' }, // orange darken-3
      { color: '#F9A825', level: 4, text: 'It Works' }, // yellow darken-3
      {
        color: '#1565C0',
        level: 3,
        text: 'I Wish You Could'
      }, // blue darken-3
      { color: '#2E7D32', level: 2, text: 'Good' }, // green darken-3
      {
        color: '#6A1B9A',
        level: 1,
        text: 'Experience Is Awesome'
      } // purple darken-3
    ],
    colorPickerSwitchShow: true,
    ratingChosen: {},
    panelModel: null
  }),

  methods: {
    ...mapActions('RapidTicket', {
      createRapidTicket: 'createRapidTicket'
    }),

    colorPickerBool(bool) {
      this.colorPickerSwitchShow = !bool
    },

    async saving() {
      this.rapidItem.user = {
        id: this.currentUser.id,
        email: this.currentUser.email,
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName
      }

      this.rapidItem.company = {
        id: this.currentCompany.id,
        email: this.currentCompany.email,
        legalCompanyName: this.currentCompany.legalCompanyName,
        name: this.currentCompany.name,
        phone: this.currentCompany.phone
      }

      this.loading = true
      try {
        // const res = await this.createRapidTicket(this.rapidItem)
        console.log('this.rapidItem')
        console.log(this.rapidItem)
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },

    closing() {
      this.rapidItem = this.rapidItemDefault
      this.$emit('closing')
    },

    removeNote(n) {
      this.rapidItem.items = this.rapidItem.items.filter(note => note.id !== n.id)
    },

    addNotes() {
      const id = Math.floor(+new Date + (Math.random() * 1000))
      const coords = this.getRandCoordinates()
      const note = {
        id,
        ...this.defaultNote,
        ...coords,
        url: window.location.href
      }
      this.rapidItem.items.push(note)
    },

    handleDragstart(e) {
      // save drag element:
      this.dragItemId = e.target.id()
      this.rapidItem.items = this.rapidItem.items.map(n => ({
        ...n,
        selected: false
      }))
      
      this.panelModel = this.rapidItem.items.map(i => i.id).indexOf(this.dragItemId)
    },

    handleDragend(e) {
      this.rapidItem.items = this.rapidItem.items.map(n => ({
        ...n,
        selected: false
      }))
      const item = this.rapidItem.items.find(i => i.id === this.dragItemId)

      item.x = e.target.attrs.x
      item.y = e.target.attrs.y
      item.selected = true

      this.notes = this.rapidItem.items.map(n => n.id !== item.id ? n : item)

    },

    getRandCoordinates() {
      return {
        x: Math.floor(Math.random() * (width / 2.3 - width / 3) + width / 3),
        y: Math.floor(Math.random() * (width / 2.3 - width / 3) + width / 3)
      }
    },

    processingB64(ImageURL) {
      const block = ImageURL.split(';')
      // Get the content type of the image
      const contentType = block[0].split(':')[1]// In this case "image/gif"
      // get the real base64 content of the file
      const realData = block[1].split(',')[1]// In this case "R0lGODlhPQBEAPeoAJosM...."

      return { data, contentType }
    },

    b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      const byteCharacters = atob(b64Data)
      const byteArrays = []

      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }

      const blob = new Blob(byteArrays, { type: contentType })
      return blob
    },

    generatePriorityScore(item) {
      return (
        this.$h.dg(item, 'reaction.level', 0) + this.$h.dg(item, 'rating.level', 0)
      ) / 2
    }

  },

  computed: {
    ...mapState('Companies', {
      currentCompany: 'currentCompany'
    }),
    ...mapState('Auth', {
      currentUser: 'user'
    })
  },

  mounted() {
    this.addNotes()
  }

}
</script>

<style lang="scss" scoped>
.card-text {
  overflow:auto;
}
.img-custom {
  width: 50rem;
  height: auto;
}
.sidebar-custom {
  height: 70vh;
  overflow: auto;
}
.inline {
  display: flex;
  display: -ms-flexbox;
  display: -webkit-flex;
  justify-content: space-between;
}
.emoji-font-size{
  font-size:30px;
}

</style>
