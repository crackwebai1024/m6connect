<template>
    <div class="pa-0" >
        
        <v-btn color="yellow darken-2" dark icon @click="executeHtml2Canvas">
            <v-icon>mdi-help-circle</v-icon>
        </v-btn>
        
        <SnapShotDialog 
            :showDialog="showDialog"
            :imageTest="imageTest"
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
        loading: false
    }),

    methods: {

        executeHtml2Canvas(){
            this.loading = true 
            html2canvas(document.body).then((canvas) => {
                this.imageTest = canvas.toDataURL()
                this.showDialog = true 
                this.loading = false 
            })
        }

    },
}
</script>