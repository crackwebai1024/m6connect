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
                        x: item.rapid_x,
                        y: item.rapid_y,
                        id: item.id,
                        draggable: true,
                        width: 20,
                        height: 20,
                        fill: ratings.find( r => r.level == item.rapid_color_rating).color || '#37474F', // blue-grey darken-3
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
                              :color="ratings.find( r => r.level == n.rapid_color_rating).color"
                              size="28"
                            >
                              <span class="subtitle-2 white--text">{{ generatePriorityScore(n) }}</span>
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
                                  @click="n.rapid_color_rating = r.level"
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
                              v-html="userReactions.find( u => u.level == n.rapid_reaction).emoji"
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
                                  @click="n.rapid_reaction = u.level"
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
                        v-model="rapidItem.items[i].rapid_title"
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
                      v-model="rapidItem.items[i].rapid_description"
                      label="Description"
                      outlined
                    />

                    <people-autocomplete 
                      label="Pick Your Maestro"
                      v-model="rapidItem.items[i].rapid_maestro"
                    />

                    <people-autocomplete 
                      label="Pick a Developer"
                      v-model="rapidItem.items[i].rapid_developer"
                    />

                    <date-picker label="Due Date" v-model="rapidItem.items[i].rapid_dueDate" />

                    <v-autocomplete
                      label="Status"
                      v-model="rapidItem.items[i].rapid_status"
                      :items="statusItems"
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

import { mapState, mapActions, mapMutations } from 'vuex'
import SpeedDial from '@/components/_partials/SpeedDial.vue'
import PeopleAutocomplete from '@/components/AppBuilder/Form/Components/PeopleAutocomplete.vue'
import DatePicker from '@/components/AppBuilder/Form/Components/DatePicker.vue'

const width = window.innerWidth * .7
const height = window.innerHeight * .7

const noteModel = {
  rapid_record_number: "",
  rapid_title: '',
  rapid_description: '',
  rapid_x: Math.floor(width / 2),
  rapid_y: Math.floor(height / 2),
  rotation: 180,
  selected: false,
  rapid_color_rating: 1,
  rapid_reaction: 1,
  rapid_url: '',
  rapid_status: 'Pending'
}

const rapidItemDefault = { items: [], imgLink: '' }

export default {

  components: {
    SpeedDial,
    PeopleAutocomplete,
    DatePicker
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
      { emoji: '&#129298;', level: 5, text: 'Frustrated' }, // sick face with thermometer
      { emoji: '&#128580;', level: 4, text: 'Not Sure' }, // rolling eyes face
      { emoji: '&#128577;', level: 3, text: 'Sad' }, // frowney face
      { emoji: '&#129319;', level: 2, text: 'Looking Good' }, // bandaged face
      { emoji: '&#128578;', level: 1, text: 'Happy' } // smiley face
    ],
    ratings: [
      { color: '#C62828', level: 6, text: 'Stopped Working' }, // red darken-3
      { color: '#EF6C00', level: 5, text: 'Clunky' }, // orange darken-3
      { color: '#F9A825', level: 4, text: 'It Works' }, // yellow darken-3
      { color: '#1565C0', level: 3, text: 'I Wish You Could' }, // blue darken-3
      { color: '#2E7D32', level: 2, text: 'Good' }, // green darken-3
      { color: '#6A1B9A', level: 1, text: 'Experience Is Awesome' } // purple darken-3
    ],
    colorPickerSwitchShow: true,
    ratingChosen: {},
    panelModel: null,
    statusItems: [ 'Pending', 'In Progress', 'Code Review', 'Done', 'Deprecated' ]
  }),

  methods: {
    ...mapActions('RapidTicket', {
      createRapidTickets: 'createRapidTickets'
    }),

    ...mapMutations('SnackBarNotif', {
      notifDanger: 'notifDanger',
      notifSuccess: 'notifSuccess' 
    }),

    colorPickerBool(bool) {
      this.colorPickerSwitchShow = !bool
    },

    async saving() {

      const rapidItems = this.rapidItem.items.map( 
        i => ({ 
          ...i, 
          rapid_user: this.currentUser.id,
          rapid_imageLink: this.rapidItem.imageLink,
          rapid_priority: ( i.rapid_color_rating + i.rapid_reaction ) / 2,
          rapid_company: this.currentCompany.id
        })
      )

      this.loading = true

      try {
        const res = await this.createRapidTickets(rapidItems)
        this.notifSuccess('The Rapid Tickets were created')
        this.loading = false
        this.closing()
      } catch (e) {
        this.notifDanger('There was an error while creating the ticket')
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
        rapid_record_number: + new Date(),
        ...this.defaultNote,
        ...coords,
        rapid_url: window.location.href
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

      item.rapid_x = e.target.attrs.x
      item.rapid_y = e.target.attrs.y
      item.selected = true

      this.notes = this.rapidItem.items.map(n => n.id !== item.id ? n : item)

    },

    getRandCoordinates() {
      return {
        rapid_x: Math.floor(Math.random() * (width / 2.3 - width / 3) + width / 3),
        rapid_y: Math.floor(Math.random() * (width / 2.3 - width / 3) + width / 3)
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
        this.$h.dg(item, 'rapid_reaction', 0) + this.$h.dg(item, 'rapid_color_rating', 0)
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
