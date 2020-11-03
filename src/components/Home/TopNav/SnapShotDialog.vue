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
                                            v-for="item in rapidItem.notes"
                                            :key="item.id"
                                            :config=" {
                                                x: item.x,
                                                y: item.y,
                                                id: item.id,
                                                draggable: true,
                                                width: 20,
                                                height: 20,
                                                fill: 'red',
                                                shadowBlur: 10,
                                                opacity: 0.5
                                            }"
                                        />
                                    </v-layer> 
                                </v-stage>
                            </div>
                        </v-col>
                        <v-col sm="3" class="sidebar-custom" >
                            
                            <div 
                                v-for="(n, i) in rapidItem.notes" :key="`notes-${n.id}`" 
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
                                    <v-text-field outlined class="ma-0 pa-0" label="Title" v-model="rapidItem.notes[i].title" />
                                    <v-btn color="red darken-2" icon @click="removeNote(n)" v-show="rapidItem.notes.length > 1" >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </div>
                                <v-textarea outlined  label="Description" v-model="rapidItem.notes[i].text" />

                            </div>

                        </v-col>
                    </v-row>

                </v-container>
            </v-card-text>
            
            <v-card-actions>

                <v-spacer />

                <v-btn color="red" text > 
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

export default {

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
        rapidItem: { notes: [], company: {}, user: {} },
        notes: [],
        dragItemId: null,
        configKonva: {
            width: width,
            height: height
        }
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
            
            try {
                const res = await this.createRapidTicket(this.rapidItem)
                console.log('res------')
                console.log(res)
            } catch(e) {
                console.log('e------')
                console.log(e)
            }

            console.log('this.rapidItem')
            console.log(this.rapidItem)
        },

        removeNote(n) {
            this.rapidItem.notes = this.rapidItem.notes.filter( note => note.id !== n.id )
        },
        
        addNotes() {
            const id = Math.floor(+ new Date + ( Math.random() * 1000 ))
            const coords = this.getRandCoordinates()
            const note = { id, ...this.defaultNote, ...coords}
            this.rapidItem.notes.push(note)
            console.log('this.rapidItem------')
            console.log(this.rapidItem)
        },

        handleDragstart(e) {
            // save drag element:
            this.dragItemId = e.target.id()
            this.rapidItem.notes = this.rapidItem.notes.map( n => ({...n, selected: false}) )
            const item = this.rapidItem.notes.find(i => i.id === this.dragItemId);
            item.selected = true
        },

        handleDragend(e) {
            this.rapidItem.notes = this.rapidItem.notes.map(n => ({...n, selected: false}))
            const item = this.rapidItem.notes.find(i => i.id === this.dragItemId);
            
            item.x = e.target.attrs.x
            item.y = e.target.attrs.y
            item.selected = true

            this.notes = this.rapidItem.notes.map( n => n.id !== item.id ? n : item  )

            this.dragItemId = null
        },

        getRandCoordinates() {
            return {
                x: Math.floor(Math.random() * (width/2.3 - width/3) + width/3),
                y: Math.floor(Math.random() * (width/2.3 - width/3) + width/3)
            }
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
</style>