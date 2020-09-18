<template>
    <v-form 
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-row>
            <v-col cols="12" v-for="(item, index) of inputs()" :key="index+'-input'">
                <v-text-field
                    v-model="item.model"
                    :label=item.label
                    :rules="stringsRules(item.label)"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" v-for="(item, index) of selects()" :key="index+'-select'">
                <v-select
                    :items="item.items"
                    item-value="id"
                    item-text="value"
                    v-model="item.model"
                    :label="item.label"
                    :rules="selectRules(item.label)"
                    solo >
                </v-select>
            </v-col>
            <v-col cols="12">
                <v-combobox
                    v-model="chipsAKA"
                    chips
                    clearable
                    label="Also Known AS(AKA)"
                    multiple>
                    <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="removeAKA(item)"
                    >
                        <strong>{{ item }}</strong>&nbsp;
                    </v-chip>
                    </template>
                </v-combobox>
                <v-combobox
                    v-model="chipsFKA"
                    chips
                    clearable
                    label="Formerly Known As(FKA)"
                    multiple>
                    <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="removeFKA(item)"
                    >
                        <strong>{{ item }}</strong>&nbsp;
                    </v-chip>
                    </template>
                </v-combobox>
            </v-col>
            <v-col cols="6" class="pb-0">
                <h2 class="text-md-body-1">
                    Patient/Consumer Facing
                </h2>
            </v-col>
            <v-col cols="6" class="pt-0">
                <v-radio-group v-model="information_security.facing" row :rules="radioRules(information_security.facing)">
                    <v-radio
                        v-for="(n, index) in validation"
                        :key="index+'-facing'"
                        :label="n.label"
                        :value="n.value">
                    </v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="6" class="pb-0">
                <h2 class="text-md-body-1">
                    PHI
                </h2>
            </v-col>
            <v-col cols="6" class="pt-0">
                <v-radio-group v-model="information_security.phi" row :rules="radioRules(information_security.phi)">
                    <v-radio
                        v-for="(n, index) in validation"
                        :key="index+'-facing'"
                        :label="n.label"
                        :value="n.value">
                    </v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="6" class="pb-0">
                <h2 class="text-md-body-1">
                    PCI
                </h2>
            </v-col>
            <v-col cols="6" class="pt-0">
                <v-radio-group v-model="information_security.pci" row :rules="radioRules(information_security.pci)">
                    <v-radio
                        v-for="(n, index) in validation"
                        :key="index+'-facing'"
                        :label="n.label"
                        :value="n.value">
                    </v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" >
                <v-select
                    :items="ssn"
                    item-value="id"
                    item-text="value"
                    v-model="information_security.ssn"
                    label="SSN"
                    :rules="selectRules('SSN')"
                    solo >
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <v-btn
                color="error"
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
    name: "ItAppForm",
    data: () => ({
        valid: false,
        // General Info
        general_ifo:{
            app_id: null,
            vendor_id:'',
            version:'',
            status_settings_id:null,
            first_contact_group_settings_id:null,
            category_settings_id: null,
            sub_category_settings_id: 1,
            type_settings_id: null,
            app_management_settings_id: null,
            server_hosting_model_settings_id: null,
            capabilities: null
        },
        // RecordInfo
        title:"",
        description:"",
        // Tags
        chipsFKA: [],
        chipsAKA: [],
        // Information Security
        information_security:{
            app_id: null,
            facing: null,
            phi: null,
            pci: null,
            ssn: null
        },
        // Lists
        server_hosting_model_settings_id:[],
        first_contact_group_settings_id:[],
        app_management_settings_id:[],
        category_settings_id:[],
        status_settings_id:[],
        type_settings_id:[],
        ssn: [],
        validation:[{
                label: "Yes",
                value: true
            },{
                label: "No",
                value: false
            }],
    }),
    methods: {
        ...mapActions('ITAppsModule',[
            'get_selects', 'post_it_apps', 'post_it_app_image', 'post_general_ifo', 'post_info_security'
        ]),
        postNewITApp(){
            this.post_it_apps({
                title: this.title,
                description: this.description
            }).then((res) => {
                this.general_ifo.app_id = res.data.app_id;
                this.information_security.app_id = res.data.app_id;

                this.post_it_app_image({
                    app_id: res.data.app_id
                });
                this.post_general_ifo(this.general_ifo);
                this.post_info_security(this.information_security);
            });
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
        removeFKA (item) {
            this.chipsFKA.splice(this.chipsFKA.indexOf(item), 1)
            this.chipsFKA = [...this.chipsFKA]
        },
        removeAKA (item) {
            this.chipsAKA.splice(this.chipsAKA.indexOf(item), 1)
            this.chipsAKA = [...this.chipsAKA]
        },
        validate () {
            if(this.$refs.form.validate())
                this.postNewITApp();
        },
        inputs() {
            return[
                {
                    model:this.general_ifo.vendor_id,
                    label:"Vendor"
                },{
                    model:this.title,
                    label:"Name"
                },{
                    model:this.general_ifo.version,
                    label:"Version"
                },{
                    model:this.description,
                    label:"Description"
                }
            ]
        },
        selects() {
            return [
                {
                    items: this.status_settings_id,
                    model: this.general_ifo.status_settings_id,
                    label:"Status"
                },{
                    items: this.first_contact_group_settings_id,
                    model: this.general_ifo.first_contact_group_settings_id,
                    label:"First"
                },{
                    items: this.type_settings_id,
                    model: this.general_ifo.type_settings_id,
                    label:"Type"
                },{
                    items: this.app_management_settings_id,
                    model: this.general_ifo.app_management_settings_id,
                    label:"App"
                },{
                    items: this.category_settings_id,
                    model: this.general_ifo.category_settings_id,
                    label:"Category"
                },{
                    items: this.server_hosting_model_settings_id,
                    model: this.general_ifo.server_hosting_model_settings_id,
                    label:"Server"
                }
            ];

        }
    },
    created(){
        this.get_selects('/AppInfoGeneralStatus').then(
            response => (this.status_settings_id = response.data)
        );
        this.get_selects('/AppInfoGeneralFirstContactGroup').then(
            response => (this.first_contact_group_settings_id = response.data)
        );
        this.get_selects('/AppInfoGeneralCategory').then(
            response => (this.category_settings_id = response.data)
        );
        this.get_selects('/AppInfoGeneralType').then(
            response => (this.type_settings_id = response.data)
        );
        this.get_selects('/AppInfoGeneralAppManagement').then(
            response => (this.app_management_settings_id = response.data)
        );
        this.get_selects('/AppInfoGeneralServerHostingModel').then(
            response => (this.server_hosting_model_settings_id = response.data)
        );
        this.get_selects('/AppInfoSecuritySSN').then(
            response => (this.ssn = response.data)
        );
    }
}
</script>