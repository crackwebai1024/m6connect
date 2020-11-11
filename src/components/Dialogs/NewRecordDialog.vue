<template>
    <v-card>
        <v-card-title class="headline grey lighten-2">
            Create Record
        </v-card-title>
        <v-card-text
            class="record-text vertical-scroll">
            <v-tabs 
                centered
                v-model="tab">
                <v-tab v-for="item in items" :key="item.tab" >
                    {{ item.tab }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item.tab" >
                    <component 
                        @closeModal="closeModal" 
                        @closingGenericRecord="closingGenericRecord" 
                        v-bind:is="item.component" 
                        :app="item.app" 
                    />
                </v-tab-item> 
            </v-tabs-items>
        </v-card-text>
    </v-card>
</template>

<script>
import ItAppForm from "@/components/Home/Forms/ItAppForm";
import GenericRecord from '@/components/Home/Forms/GenericRecord';
import { mapActions, mapMutations } from 'vuex'

export default {
    name: "NewRecordDialog",

    components: {
        ItAppForm,
        GenericRecord
    },

    methods: {
        ...mapActions('AppBuilder', {
            getAppList: 'getAppList'
        }),

        ...mapMutations('RecordsInstance', {
            setCurrentRecord: 'setCurrentRecord',
            setDisplayShow: 'setDisplayAppBuilderShow'
        }),

        closeModal(){
            this.$emit('closeModal');
        },
        closingGenericRecord() {
            this.closeModal()
        }
    },

    data: () => ({
        tab: null,
        items:[
            {
                tab: "ItApp",
                component: ItAppForm
            }
        ]
    }),
 
    async mounted() {
        try {
            const res = await this.getAppList()
            for (let x = 0; x < res.length; x++) {
               this.items.push({ isGeneric: true, tab: res[x].title, component: "GenericRecord", app: res[x] }) 
            }
        } catch(e) {
        }
    }
}
</script>
<style scoped>
.record-text {
    height: 80vh;
}
</style>