<template>
    <div class="pa-0 speedDial" >

        <v-speed-dial
            v-show="showSpeedDial"
            v-model="expandOptions"
            open-on-hover
            transition="slide-y-transition"
            direction="bottom"
            bottom
            top
        > 
            <template v-slot:activator>
                <v-btn color="red darken-2" dark icon v-if="expandOptions" >
                    <v-icon >
                        mdi-close
                    </v-icon>
                </v-btn>
                <v-btn color="yellow darken-2" dark icon v-else >
                    <v-icon>mdi-help-circle</v-icon>
                </v-btn>
            </template>
            <v-btn
                v-for="(r, i) in ratings"
                :key="`rating-${i}`"
                fab
                dark
                small
                :color="r.color"
                @click="executeHtml2Canvas(r)"
            >
            </v-btn>
        </v-speed-dial>
        
        <!-- <v-btn color="yellow darken-2" dark icon @click="executeHtml2Canvas">
            <v-icon>mdi-help-circle</v-icon>
        </v-btn> -->
        
        <SnapShotDialog 
            :showDialog="showDialog"
            :imageTest="imageTest"
            :ratingChosen="ratingChosen"
            @closing="showDialog = false"
            :ratings="ratings"
            @changingColor=" e => ratingChosen = e "
        />

        <m6-loading :loading="loading" />
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import SnapShotDialog from '@/components/Home/TopNav/SnapShotDialog'

export default {
    name: "SnapShotNav",

    components: {
        SnapShotDialog
    },

    data: () => ({
        imageTest: "",
        showDialog: false,
        loading: false,
        expandOptions: false,
        ratings: [
            { color: "#C62828", level: 0 }, //red darken-3
            { color: "#6A1B9A", level: 1 }, //purple darken-3
            { color: "#1565C0", level: 2 }, //blue darken-3
            { color: "#EF6C00", level: 3 }, //orange darken-3
            { color: "#F9A825", level: 4 }, //yellow darken-3
            { color: "#2E7D32", level: 5 }  //green darken-3
        ],
        ratingChosen: {},
        showSpeedDial: true 
    }),

    methods: {
        executeHtml2Canvas(ratingChosen){
            this.showSpeedDial = false
            this.loading = true 
            this.$nextTick( () => {
                html2canvas(document.body).then((canvas) => {
                    this.imageTest = canvas.toDataURL()
                    this.showDialog = true 
                    this.loading = false 
                    
                    this.$nextTick( () => {
                        this.ratingChosen = {...ratingChosen}
                        this.showSpeedDial = true
                    })
                })
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.speedDial .v-speed-dial {
    position: relative !important;
    z-index: 1 !important;
}

.speedDial .v-speed-dial--bottom {
    bottom: 0px;
}

.speedDial .v-speed-dial--top {
    top: 0px;
}
</style>