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
                    <template v-if='item.default === defaults.money'>
                        <v-col class='flex-shrink-1 flex-grow-0'>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-col>
                        <v-col class='flex-grow-1 flex-shrink-0'>
                            <money :label='item.label'></money>
                        </v-col>
                    </template>
                    <v-text-field v-else single-line :prepend-icon="item.icon" :label='item.label'></v-text-field>
                </v-row>
            </v-card-text>
            <v-card-actions class='white'>
                <v-spacer></v-spacer>
                <v-btn
                    color="grey text--darken"
                    text
                    @click="closeDialog">
                    Cancel
                </v-btn>
                <v-btn
                    color="primary white--text"
                    >
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { Money } from 'v-money'
export default {
    components: {Money},
    name: 'edit-panel-dialog',
    model: {
        prop: 'show',
        event: 'show-change'
    },
    data: () => ({
        defaults: {
            money: '0.00',
            text: 'N/A',
            date: '--/--/----',
            percent: '0'
        }
    }),
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
        },
        closeDialog() {
            this.$emit('show-change', false)
        }
    }
}
</script>