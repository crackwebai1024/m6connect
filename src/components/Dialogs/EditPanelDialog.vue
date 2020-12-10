<template>
    <v-dialog 
      max-width="600px"
      persistent
      class=''
      v-model='show'>
        <v-card class=''>
            <v-card-title class='primary elevation-1'>
                <span class='white--text font-weight-bold'>{{ panel.title || 'Panel Title' }}</span>
            </v-card-title>
            <v-card-text :style='{height: height(), overflowX: "hidden"}' class='vertical-scroll pa-0'>
                <v-row class='my-4 white px-5' :key='index' v-for="(item, index) in panel.items">
                    <v-text-field single-line :prepend-icon="item.icon" :label='item.label'></v-text-field>
                </v-row>
            </v-card-text>
            <v-card-actions class='white'>
                <v-spacer></v-spacer>
                <v-btn
                    color="grey text--darken"
                    text
                    @click="show = false">
                    Cancel
                </v-btn>
                <v-btn
                    color="primary white--text"
                    @click="submitSave">
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'edit-panel-dialog',
    model: {
        prop: 'show',
        event: 'show-change'
    },
    props: {
        show: {
            type: [Boolean, String],
            default: false
        },
        panel: {
            type: [Object, Array],
            default: () => {}
        }
    },
    methods: {
        height () {
            let viewportSize = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
            ) * 0.6

            return `${viewportSize}px`
        }
    }
}
</script>