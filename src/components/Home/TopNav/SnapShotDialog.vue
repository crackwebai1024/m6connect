<template>
   <v-dialog v-model="showDialog" fullscreen persistent >

        <v-card>
            <v-card-title class="blue dakren-2 white--text">
                <h1 class="white--text">Snapshot</h1>

                <v-spacer />

                <v-btn color="white" icon @click="addNotes" >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

            </v-card-title>

            <v-card-text class="card-text" >
                <v-container fluid class="grey lighten-5 p-4" >
                    <v-row>
                        <v-col sm="9" >
                            <div 
                            >
                                <v-stage
                                    :style='`background-image: url("${ imageTest }"); background-size: 100% auto`' 
                                    ref="stage"
                                    id="stage-layer"
                                    :config="configKonva"
                                    @dragstart="handleDragstart"
                                    @dragend="handleDragend"
                                >
                                    <v-layer ref="layer">
                                        <!-- <v-star
                                            v-for="item in list"
                                            :key="item.id"
                                            :config="{
                                                x: item.x,
                                                y: item.y,
                                                rotation: item.rotation,
                                                id: item.id,
                                                numPoints: 5,
                                                innerRadius: 30,
                                                outerRadius: 50, fill: '#89b717',
                                                opacity: 0.8,
                                                draggable: true,
                                                scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                                                scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                                                shadowColor: 'black',
                                                shadowBlur: 10,
                                                shadowOffsetX: dragItemId === item.id ? 15 : 5,
                                                shadowOffsetY: dragItemId === item.id ? 15 : 5,
                                                shadowOpacity: 0.6
                                            }"
                                        /> -->
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
                                                fill: $h.dg( ratingChosen, 'color', '#37474F' ), // blue-grey darken-3
                                                shadowBlur: 25,
                                                opacity: 0.9
                                            }"
                                        />
                                    </v-layer> 
                                </v-stage>
                            </div>
                        </v-col>
                        <v-col sm="3" class="sidebar-custom" >
                            
                            <div 
                                v-for="(n, i) in rapidItem.items" :key="`notes-${n.id}`" 
                                class="pa-2"
                            >

                                <div class="inline" >
                                    <v-avatar
                                        :color=" n.selected ? 'green darken-2' : 'blue darken-2'"
                                        size="30"
                                        class="mr-2"
                                    >
                                        <span class="white--text headline">{{ i + 1 }}</span>
                                    </v-avatar>
                                    <v-text-field outlined class="ma-0 pa-0" label="Title" v-model="rapidItem.items[i].title" />
                                    <v-btn color="red darken-2" icon @click="removeNote(n)" v-show="rapidItem.items.length > 1" >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </div>
                                <v-textarea outlined  label="Description" v-model="rapidItem.items[i].text" />
                                <div class="inline" >
                                    <v-btn 
                                        v-for="(u, i) in userReactions" 
                                        :key="`user-${i}`" 
                                        fab 
                                        x-small 
                                        @click="pickingEmoji(u)"
                                    >
                                        <span 
                                            v-html="u.emoji" 
                                            class="emoji-font-size"
                                        />
                                    </v-btn>
                                </div>
                            </div>

                        </v-col>
                    </v-row>

                </v-container>

                <m6-loading :loading="loading" />
            </v-card-text>
            
            <v-card-actions>

                <v-btn
                    v-for="(r, i) in ratings"
                    :key="`rate-btn-${i}`"
                    :color="r.color"
                    fab
                    x-small
                    @click=" $emit('changingColor', r) "
                >
                    <span v-if="r.color === ratingChosen.color" style="font-size: 1.7rem; color: white;" >&#10004;</span>
                </v-btn>

                <v-spacer />

                <v-btn color="red" text @click="closing" > 
                    close
                </v-btn>


                <v-btn color="green darken-2" class="white--text" @click="saving" >
                    Save
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>

import { mapState, mapActions } from 'vuex'
const width = window.innerWidth * .7;
const height = window.innerHeight * .7;
const noteModel = { 
    title: "", 
    text: "", 
    x: Math.floor(width/2), 
    y: Math.floor(height/2), 
    rotation: 180,
    selected: false
}
const rapidItemDefault = { items: [], company: {}, user: {}, imgLink: "" }

export default {

    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        imageTest: {
            type: String,
            default: '' 
        },
        ratingChosen: {
            type: Object,
            default: () => ({})
        },
        ratings: {
            type: Object,
            default: () => ({})
        }
    },

    data: () => ({
        defaultNote: noteModel,
        rapidItem: {...rapidItemDefault},
        rapidItemDefault: rapidItemDefault,
        notes: [],
        dragItemId: null,
        configKonva: {
            width: width,
            height: height
        },
        loading: false,
        userReactions: [
            { emoji: "&#128578;", level: 5, text: 'Ok' }, //smiley face
            { emoji: "&#128577;", level: 4, text: 'Not Ok' }, //frowney face
            { emoji: "&#128580;", level: 3, text: "Help" }, //rolling eyes face
            { emoji: "&#129301;", level: 2, text: "Quick" }, //bandaged face
            { emoji: "&#129298;", level: 1, text: "Help Please" }, //sick face with thermometer
            { emoji: "&#129324;", level: 0, text: "Angry!" } //angry cursing face
        ]
    }),

    methods: {
        ...mapActions('RapidTicket', {
            createRapidTicket: 'createRapidTicket'
        }),
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
                const res = await this.createRapidTicket(this.rapidItem)
                this.loading = false
            } catch(e) {
                this.loading = false
            }
        },

        closing(){
            this.rapidItem = this.rapidItemDefault
            this.$emit('closing')
        },

        removeNote(n) {
            this.rapidItem.items = this.rapidItem.items.filter( note => note.id !== n.id )
        },
        
        addNotes() {
            const id = Math.floor(+ new Date + ( Math.random() * 1000 ))
            const coords = this.getRandCoordinates()
            const note = { id, ...this.defaultNote, ...coords}
            this.rapidItem.items.push(note)
        },

        handleDragstart(e) {
            // save drag element:
            this.dragItemId = e.target.id()
            this.rapidItem.items = this.rapidItem.items.map( n => ({...n, selected: false}) )
            const item = this.rapidItem.items.find(i => i.id === this.dragItemId);
            item.selected = true
        },

        handleDragend(e) {
            this.rapidItem.items = this.rapidItem.items.map(n => ({...n, selected: false}))
            const item = this.rapidItem.items.find(i => i.id === this.dragItemId);
            
            item.x = e.target.attrs.x
            item.y = e.target.attrs.y
            item.selected = true

            this.notes = this.rapidItem.items.map( n => n.id !== item.id ? n : item  )

            this.dragItemId = null
        },

        getRandCoordinates() {
            return {
                x: Math.floor(Math.random() * (width/2.3 - width/3) + width/3),
                y: Math.floor(Math.random() * (width/2.3 - width/3) + width/3)
            }
        },

        processingB64(ImageURL){
            const block = ImageURL.split(";");
            // Get the content type of the image
            const contentType = block[0].split(":")[1];// In this case "image/gif"
            // get the real base64 content of the file
            const realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

            return { data, contentType}
        },

        b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;

                const byteCharacters = atob(b64Data);
                const byteArrays = [];

                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    let slice = byteCharacters.slice(offset, offset + sliceSize);

                    let byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    let byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

              const blob = new Blob(byteArrays, {type: contentType});
              return blob;
        },

        pickingEmoji(reaction) {
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
    },

}
</script>

<style lang="scss" scoped>
.card-text {
  overflow:auto;
  // width: 79vw;
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