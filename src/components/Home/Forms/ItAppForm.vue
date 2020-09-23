<template>
    <v-form 
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-row>
            <v-col cols="12" >
                <v-text-field
                    v-model="general_ifo.vendor_id"
                    label="Vendor"
                    :rules="stringsRules('Vendor')"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-text-field
                    v-model="title"
                    label="Name"
                    :rules="stringsRules('Name')"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-text-field
                    v-model="general_ifo.version"
                    label="Version"
                    :rules="stringsRules('Version')"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="12" >
                <v-text-field
                    v-model="description"
                    label="Description"
                    :rules="selectRules('Description')"
                    required
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-select
                    :items="status_settings_id"
                    item-value="id"
                    item-text="value"
                    v-model="general_ifo.status_settings_id"
                    label="Status"
                    :rules="selectRules('Status')"
                    solo >
                </v-select>
            </v-col>
            <v-col cols="12" sm="6">
                <v-select
                    :items="first_contact_group_settings_id"
                    item-value="id"
                    item-text="value"
                    v-model="general_ifo.first_contact_group_settings_id"
                    label="First Contact Group"
                    :rules="selectRules('First Contact Group')"
                    solo >
                </v-select>
            </v-col>
            <v-col cols="12" sm="6">
                <v-select
                    :items="type_settings_id"
                    item-value="id"
                    item-text="value"
                    v-model="general_ifo.type_settings_id"
                    label="Type"
                    :rules="selectRules('Type')"
                    solo >
                </v-select>
            </v-col>
            <v-col cols="12" sm="6">
                <v-select
                    :items="app_management_settings_id"
                    item-value="id"
                    item-text="value"
                    v-model="general_ifo.app_management_settings_id"
                    label="App Management"
                    solo >
                </v-select>
            </v-col>
            <v-col cols="12" sm="6">
                <v-select
                    :items="category_settings_id"
                    item-value="id"
                    item-text="value"
                    v-model="general_ifo.category_settings_id"
                    label="Category"
                    :rules="selectRules('Category')"
                    solo >
                </v-select>
            </v-col>
            <v-col cols="12" sm="6">
                <v-select
                    :items="server_hosting_model_settings_id"
                    item-value="id"
                    item-text="value"
                    v-model="general_ifo.server_hosting_model_settings_id"
                    label="Server Hosting Model"
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
            app_id: undefined,
            vendor_id:'',
            version:'',
            status_settings_id:undefined,
            first_contact_group_settings_id:undefined,
            category_settings_id: undefined,
            sub_category_settings_id: undefined,
            type_settings_id: undefined,
            app_management_settings_id: undefined,
            server_hosting_model_settings_id: undefined
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
            'get_all_selects', 'post_it_apps', 'post_it_app_image', 'post_general_ifo', 'post_info_security', 
            'post_tag'
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
                this.post_fka_aka(res.data.app_id);
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
        post_fka_aka(app_id){
            this.chipsAKA.forEach(item =>{
                this.post_tag({
                    field: 'also_know_as',
                    value: item,
                    foreign_id: app_id
                });
            });
            this.chipsFKA.forEach(item =>{
                this.post_tag({
                    field: 'formerly_known_as',
                    value: item,
                    foreign_id: app_id
                });
            });
        },
        validate () {
            if(this.$refs.form.validate())
                this.postNewITApp();
        }
    },
    created(){
        this.get_all_selects({
            params:['AppInfoGeneralStatus',
                'AppInfoGeneralFirstContactGroup',
                'AppInfoGeneralCategory',
                'AppInfoGeneralType',
                'AppInfoGeneralAppManagement',
                'AppInfoGeneralServerHostingModel',
                'AppInfoSecuritySSN'
            ]
        }).then(
            res => (
                this.server_hosting_model_settings_id = res.data.AppInfoGeneralServerHostingModel,
                this.first_contact_group_settings_id = res.data.AppInfoGeneralFirstContactGroup,
                this.app_management_settings_id = res.data.AppInfoGeneralAppManagement,
                this.category_settings_id = res.data.AppInfoGeneralCategory,
                this.status_settings_id = res.data.AppInfoGeneralStatus,
                this.type_settings_id = res.data.AppInfoGeneralType,
                this.ssn = res.data.AppInfoSecuritySSN
            )
        );
    }
}
</script>