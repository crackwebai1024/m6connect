<template>
    <v-form 
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-row >
            <v-col col="12" class="text-center pa-0" >
                <v-avatar size="100" class="mr-2 text-center">
                    <img
                        v-if="appImage !== ''"
                        :alt="appImage"
                        :src="appImage"
                    >
                    <v-icon 
                        size="100"
                        v-else
                    >
                        mdi-application
                    </v-icon>
                </v-avatar>
                <m6-upload 
                    btnButton="purple" 
                    @response="responseRecordImg" 
                    @loading="loading = !loading" 
                >
                    <v-icon size="33">mdi-plus-circle</v-icon>
                </m6-upload>
            </v-col>
            <v-col cols="12" >
                <v-text-field
                    v-model="itemInfo.title"
                    label="Title"
                    :rules="stringsRules('Title')"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-text-field
                    v-model="itemInfo.description"
                    label="Description"
                    :rules="stringsRules('Description')"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols=12 v-for="(tab, index) in itemInfo.tabs" :key="index+'-tab'" >
                <v-chip 
                    color="green"
                >
                    <span class="white--text" >{{ tab.title }}</span>
                </v-chip>
            </v-col>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-btn
                color="error"
                @click="close()"
                class="mr-4">
                Cancel
            </v-btn>
            <v-btn 
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate">
                Create
            </v-btn>
        </v-row>
    </v-form>
</template>
<script>
import {mapActions} from 'vuex';

export default {
    name: "DynamicAppForm",
    data: () => ({
        valid: false,
        showTabInput: false,
        appImage: '',
        loading: false,
        // RecordInfo
        itemInfo: {
            title: "", 
            description: "", 
            tabs: []
        },
        // Lists
        validation:[
            { label: "Yes", value: true },
            { label: "No",  value: false}
        ],
    }),
    methods: {
        ...mapActions('DynamicAppsModule',{
            post_app: "post_app"
        }),
        responseRecordImg(res) {
            if(res.ok) {
                this.appImage = res.data.link;
            } else {
                this.notifDanger('There was an error while saving the file');
            }
        },
        postNewDynamicApp(){ 
            this.itemInfo['image'] = {    
                image_url: this.appImage === '' ? null : this.appImage
            }
            this.post_app(this.itemInfo).then(()=>{});
        },
        pushTab(){
            this.itemInfo['tabs'].push(
                this.tab
            );
            this.tab = {
                readOnly: false,
                title: "",
                weight: 0,
                order: 0
            };
            this.showTabInput = false;
        },
        selectRules(name){
            return [
                v => !!v || name + ' is required'
            ]
        },
        radioRules(model){
            return [
                model != null || "At least one item should be selected"
            ]
        },
        stringsRules(name){
            return [
                v => !!v || name+' is required',
                v => v.length <= 255 || name+' must be less than 255 characters'
            ];
        },
        close(){
            this.$emit('closeModal');
        },
        validate () {
            if(this.$refs.form.validate()){
                this.postNewDynamicApp();
                this.close();
            }
        }
    }
}
</script>
