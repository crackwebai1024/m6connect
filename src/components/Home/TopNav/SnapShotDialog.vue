<template>
   <v-dialog v-model="showDialog" fullscreen persistent >

        <v-card>
            <v-card-title class="blue dakren-2 white--text">
                <h1 class="white--text">Snapshot</h1>

                <v-spacer />

                <v-btn @click="showDialog = false" color="white" dark icon >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="card-text" >
                <v-container fluid class="grey lighten-5 p-4" >
                    <v-row>
                        <v-col sm="9" >
                            <img class="img-custom" :src="imageTest" alt="">
                        </v-col>
                        <v-col sm="3" class="sidebar-custom" >
                            
                            <div v-for="(n, i) in notes" :key="`notes-${i}`" >
                                <div class="inline" >
                                    <v-avatar
                                        color="blue darken-2"
                                        size="30"
                                        class="mr-2"
                                    >
                                        <span class="white--text headline">{{ i + 1 }}</span>
                                    </v-avatar>
                                    <v-text-field class="ma-0 pa-0" label="Title" v-model="notes[i].title" />
                                </div>
                                <v-textarea label="Description" v-model="notes[i].text" />
                            </div>
                        </v-col>
                    </v-row>

                </v-container>
            </v-card-text>
            
            <v-card-actions>
                <v-btn color="red" text > 
                    close
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn color="blue darken-3" fab x-small class="white--text" @click="addNotes" >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

                <v-btn color="green darken-2" class="white--text" >
                    Save
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
const noteModel = { title: "", text: "" }

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
        notes: [ noteModel ]
    }),

    methods: {
        addNotes() {
            this.notes.push(this.defaultNote)
        }
    }
}
</script>

<style lang="scss" scoped>
.card-text {
  overflow:auto;
  // width: 79vw;
}
.img-custom {
  width: 69vw;
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