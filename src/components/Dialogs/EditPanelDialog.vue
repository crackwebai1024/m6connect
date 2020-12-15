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
                <v-row class='my-4 white px-5 d-block' :key='index' v-for="(item, index) in panel.items">
                    
                    <template v-if='item.default === defaults.money'>
                        <div class='d-flex'>
                            <v-col class='flex-shrink-1 flex-grow-0 pa-0 d-flex align-center'>
                                <v-icon>{{item.icon}}</v-icon>
                            </v-col>
                            <v-col class='flex-grow-1 flex-shrink-0'>
                                <label class='text-subtitle-2'> {{item.label}} </label>
                                <money v-model='panelItems[camelize(item.label)]' :label='item.label'></money>
                            </v-col>
                        </div>
                    </template>

                    <template v-else-if='item.default === defaults.date'>
                        <label class='text-subtitle-2 ml-8'> {{item.label}} </label>
                        <v-menu offset-y v-model='datePickers[index]' :close-on-content-click='false'>
                            <template v-slot:activator='{on, attrs}'>
                                <v-text-field single-line
                                    :prepend-icon="item.icon"
                                    :label='item.label'
                                    v-on='on'
                                    v-model='panelItems[camelize(item.label)]'
                                    v-bind='attrs'>
                                </v-text-field>
                            </template>
                            <v-date-picker
                                elevation="13"
                                header-color="white"
                                v-model="panelItems[camelize(item.label)]"
                                @input="datePickers[index] = false">
                            </v-date-picker>
                        </v-menu>
                    </template>
                    <template v-else>
                        <label class='text-subtitle-2 ml-8'> {{item.label}} </label>
                        <v-text-field v-model='panelItems[camelize(item.label)]' single-line :prepend-icon="item.icon" :label='item.label'></v-text-field>
                    </template>
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
                    @click='savePanel()'>
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { Money } from 'v-money'
import { db } from '@/utils/Firebase'


export default {
    components: {Money},
    name: 'edit-panel-dialog',
    model: {
        prop: 'show',
        event: 'show-change'
    },
    data: () => ({
        datePickers: {},
        defaults: {
            money: '0.00',
            text: 'N/A',
            date: '--/--/----',
            percent: '0'
        },
        panelItems: {} // we can still use the same object
                       // as prop and create a custom key for vmodels, so we dont modify current value
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
    mounted () {
        this.panel.items.forEach((item, index) => {
            this.panelItems[this.camelize(item.label)] = item.value
        })
    },
    methods: {
        camelize (str) {
            return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
            }).replace(/\s+/g, '').replace('/', '');
        },
        height () {
            let viewportSize = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
            ) * 0.6

            return `${viewportSize}px`
        },
        closeDialog() {
            this.$emit('show-change', false)
        },
        //Move this function to Vuex mutations
        savePanel() {
            let map = {}

            if (this.panel.title == 'Project Quickview') {
                map = {
                    basic: this.panelItems
                }
            } else if (this.panel.title == 'Schedule & Budget') {
                map = {
                    schedule: this.panelItems
                }
            }else {
                map = {
                    milestones: this.panelItems
                }
            }

            
            //this.$snotify.success('Changes saved')
            db.collection('cpm_projects').doc(this.$route.params.id).update(map)
            .then(doc => {
                this.$snotify.success('Changes saved')
                this.$emit('update')
                this.closeDialog()
            })
            .catch(err => this.$snotify.error('Something went wrong', 'Changes not saved'))
        }
    }
}
</script>
<style>
.v-text-field {
    margin-top: 0px
}
</style>