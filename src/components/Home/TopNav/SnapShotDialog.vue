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
                                            v-for="item in notes"
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
                                v-for="(n, i) in notes" :key="`notes-${n.id}`" 
                                :style="`background-color: ${ n.selected ? '#f2f2f2' : null }; border-radius: 10%;`"
                                class="pa-2"
                            >

                                <div class="inline" >
                                    <v-avatar
                                        color="blue darken-2"
                                        size="30"
                                        class="mr-2"
                                    >
                                        <span class="white--text headline">{{ i + 1 }}</span>
                                    </v-avatar>
                                    <v-text-field class="ma-0 pa-0" label="Title" v-model="notes[i].title" />
                                    <v-btn color="red darken-2" icon @click="removeNote(n)" >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </div>
                                <v-textarea label="Description" v-model="notes[i].text" />

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
        list: [],
        notes: [],
        dragItemId: null,
        configKonva: {
            width: width,
            height: height
        }
    }),

    methods: {
        saving() {
        },

        removeNote(n) {
            this.notes = this.notes.filter( note => note.id !== n.id )
        },
        
        addNotes() {
            const id = Math.floor(+ new Date + ( Math.random() * 1000 ))
            const coords = this.getRandCoordinates()
            const note = { id, ...this.defaultNote, ...coords}
            this.notes.push(note)
        },

        handleDragstart(e) {
            // save drag element:
            this.dragItemId = e.target.id();
            // move current element to the top:
            
            this.notes = this.notes.map(n => ({...n, selected: false}))
            const item = this.notes.find(i => i.id === this.dragItemId);
            
            item.selected = true

            this.notes = this.notes.map( n => n.id !== item.id ? n : item  )
        },

        handleDragend(e) {
            this.dragItemId = null;
        },

        getRandCoordinates() {
            return {
                x: Math.floor(Math.random() * (width/2.3 - width/3) + width/3),
                y: Math.floor(Math.random() * (width/2.3 - width/3) + width/3)
            }
        }
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