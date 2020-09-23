<template>
    <v-card max-height="600px" class="scroll">
        <v-card-title class="headline grey lighten-2">
            Create Record
        </v-card-title>
        <v-card-text
            style="overflow-y: scroll; height: 90vh;">
            <v-tabs 
                centered
                v-model="tab">
                <v-tab v-for="item in items" :key="item.tab" >
                    {{ item.tab }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item.tab" >
                    <component v-bind:is="item.component"></component>
                </v-tab-item>
            </v-tabs-items>
        </v-card-text>
    </v-card>
</template>

<script>
import ItAppForm from '../Forms/ItAppForm'

export default {
    name: "NewRecordDialog",
    data: () => ({
        tab: null,
        items:[{
            tab: "ItApp",
            component: ItAppForm
        }]
    }),
}
</script>