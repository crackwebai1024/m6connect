<template>
  <v-container @mouseenter="isHover = true" @mouseleave="isHover = false">
    <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-form ref="form" v-model="valid" class="white">
            <v-card class="pa-0">
                <v-card-title class="blue darken-3 white--text">
                    <span class="headline font-weight-light white--text">Update Install Support</span>
                </v-card-title>
                <v-tabs v-model="tabs.current" fixed-tabs background-color="blue darken-3" slider-color="blue lighten-3" color="white" dark>
                    <v-tab :key="'tab' + index" v-for="(tab, index) in tabs.items" class="text-caption">{{tab.tab}}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tabs.current" class="px-16 form-labels">
                    <!-- Tab for General -->
                    <v-tab-item :key="0">
                        <v-container class="px-5">
                            <v-col class="pa-0" v-for="(formElement, index) in itemLabels.general" :key="'generalitem' + index">
                                <v-select v-if="formElement.type === 'select'"
                                    :label="formElement.label" 
                                    :items="options.general[formElement.value]"
                                    v-model="itemInfo[formElement.value]"
                                    :rules="selectRules"
                                ></v-select>
                                <v-text-field v-if="formElement.type === 'text'"
                                    :label="formElement.label" 
                                    v-model="itemInfo[formElement.value]"
                                    :rules="textRules"
                                ></v-text-field>
                            </v-col>
                        </v-container>
                    </v-tab-item>
                    <!-- Tab for Attachments -->
                    <v-tab-item :key="1">
                        <v-container>
                            <v-btn color="green" dark>Upload File</v-btn>
                            <v-data-table></v-data-table>
                        </v-container>
                    </v-tab-item>
                    <!-- Tab for Support Information -->
                    <v-tab-item :key="2">
                        <v-container class="px-5">
                            <v-row  v-for="(formElement, index) in itemLabels.support" :key="'supportitem' + index">
                                <!-- All of them are checkboxes and v-text -->
                                <v-col cols="4" class="pa-0 d-flex">
                                    <v-checkbox
                                        v-model="itemInfo[formElement.value]"
                                        :label="formElement.label"
                                    ></v-checkbox>
                                </v-col>
                                <v-col cols="8" class="pa-0 d-flex">
                                    <v-text-field
                                        :label="formElement.label + ' Notes'"
                                        v-model="itemInfo[formElement.value + 'Text']"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item :key="3">
                        <v-container class="px-5">
                            <v-col>
                                <v-textarea
                                    v-model="itemInfo.previousSoftwareVersion"
                                    rows="3" 
                                    label="Previous Software Version">
                                </v-textarea>
                            </v-col>
                            <v-col>
                                <v-textarea
                                    v-model="itemInfo.adGroupsMachine"
                                    rows="3" 
                                    label="AD Groups Machine">
                                </v-textarea>
                            </v-col>
                            <v-col>
                                <v-textarea
                                    v-model="itemInfo.adGroupsUser"
                                    rows="3" 
                                    label="AD Groups User">
                                </v-textarea>
                            </v-col>
                        </v-container>
                    </v-tab-item>
                </v-tabs-items>
                <v-card-text>
                <v-container class="">
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="closeDialog">Close</v-btn>
                <v-btn :disabled="!valid" color="primary" @click="updateItemDescription">Save Changes</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
    <v-subheader style="position:relative" class="primary rounded-t white--text">
    Installation
    <v-btn
        :color="isHover ? 'orange' : 'blue'"
        dark
        small
        absolute
        bottom
        right
        fab
        @click="showUpdateDialog(info)">
        <v-icon>mdi-pencil</v-icon>
    </v-btn>
    </v-subheader>
    <v-expansion-panels accordion>
        <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-medium">General</v-expansion-panel-header>
            <v-expansion-panel-content>
                <!--Vamos a hacer el item más compacto en caso de que su value esté vacio-->
                <v-list-item :key="'general-' + index"
                    v-for="(item, index) in itemLabels.general">
                    <v-list-item-content class="d-flex justify-space-between flex-nowrap mx-2 ">
                        <v-list-item-title class="text-body-2">{{item.label}}</v-list-item-title>
                        <v-list-item-subtitle class="text-right">{{info[item.value]}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-expansion-panel-content>
        </v-expansion-panel>
        
        <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-medium">Attachments</v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-data-table>

                </v-data-table>
            </v-expansion-panel-content>
        </v-expansion-panel>
        
        <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-medium">Install Support</v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-list-item :key="'support-' + index"
                    v-for="(item, index) in itemLabels.support">
                    <v-list-item-content class="d-flex justify-space-between flex-nowrap mx-2 ">
                        <v-list-item-title class="text-body-2">{{item.label}}</v-list-item-title>
                        <v-list-item-subtitle>{{info[item.value]}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-expansion-panel-content>
        </v-expansion-panel>
        
        <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-medium">Additional Package Build Information</v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-list-item :key="'support-' + index"
                    v-for="(item, index) in itemLabels.build_info">
                    <v-list-item-content class="d-flex justify-space-between flex-nowrap mx-2 ">
                        <v-list-item-title class="text-body-2">{{item.label}}</v-list-item-title>
                        <v-list-item-subtitle>{{info[item.value]}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import {items} from "@/mixins/items"
import {validations} from "@/mixins/form-validations"

export default {
    name: "Installation",
    mixins: [items, validations],
    data: () => ({
        isHover: false,
        // initial information
        info: {
            // General Information
            installType: 'APM',
            priority: 2,
            delivery: 'Citrix',
            odbcConnection: 'Yes',
            odbcName: 'description contact name',
            windowsDct: 'No',
            executable: '/srv/info/alala',
            odbcSettings: 'settings description',
            ldapAuth: 'null',
            notes: 'notes description',
            // Support Information
            firewallExceptions: true,
            installNotes: false,
            mappedDrives: true,
            registryChanges: true,
            antivirusExclusion: false,
            iniChang: true,
            shortcutModifications: false,
            firewallExceptionsText: '', //text description
            installNotesText: '',
            mappedDrivesText: '',
            registryChangesText: '',
            antivirusExclusionText: '',
            iniChangText: '',
            shortcutModificationsText: '',
            // Build Information
            previousSoftwareVersion: 'Previous Software Version Description',
            adGroupsMachine: 'AD Groups Machine',
            adGroupsUser: 'AD Groups User',
            // attachments
            files: []
        },
        switches: {
            firewall_exceptions: false,
            install_notes: false,
            mapped_drives: false,
            registry_changes: false
        },
        tabs: {
            current: null,
            items: [
                {tab: 'General'},
                {tab: 'Attachments'},
                {tab: 'Install Support'},
                {tab: 'Additional Package Build Information'}
            ]
        },
        options: {
            general: {
                installType: ['APM','LANDesk Software Dist.','Manual', 'Vendor'],
                priority: [5,4,3,2,1],
                delivery: ['APM/MANUAL','Citrix','Desktop Install','NA','Web', 'Web or Citrix'],
                odbcConnection: ['Yes', 'No'],
                windowsDct: ['Yes', 'No', 'Windows not needed'],
                ldapAuth: ['first option', 'second option']
            },
        },
        // Object to update the data and not touch the real data inside this.info
        itemInfo: {},
        // Labels to create the form and the boxes to show the information
        itemLabels: {
            general: [
                { label: "Install Type", value: "installType", type: 'select' },
                { label: "Priority", value: "priority", type: 'select' },
                { label: "Delivery Method", value: "delivery", type: 'select' },
                { label: "(ODBC) Connection Required", value: "odbcConnection", type: 'select' },
                { label: "(ODBC) Contact Name", value: "odbcName", type: 'text' },
                { label: "Windows Passed DCT", value: "windowsDct", type: 'select' },
                { label: "Path to Executable", value: "executable", type: 'text' },
                { label: "(ODBC) Settings", value: "odbcSettings", type: 'text' },
                { label: "LDAP/AD Authentication", value: "ldapAuth", type: 'select' },
                { label: "General Notes", value: "notes", type: 'text' },
            ],
            support: [
                { label: "Firewall Exceptions", value: "firewallExceptions" },
                { label: "Install Notes", value: "installNotes" },
                { label: "Mapped Drives", value: "mappedDrives" },
                { label: "Registry Changes", value: "registryChanges" },
                { label: "Antivirus Exclusion", value: "antivirusExclusion" },
                { label: "INI Changes", value: "iniChang" },
                { label: "Shortcut Modifications", value: "shortcutModifications" },
            ],
            build_info: [
                { label: "Previous Software Version", value: "previousSoftwareVersion" },
                { label: "AD Groups - Machine", value: "adGroupsMachine" },
                { label: "AD Groups - User", value: "adGroupsUser" }
            ],
            attachments: {
                items: [],
                headers: [
                    {text: "File name"},
                    {text: "Attachment"},
                    {text: "Revision notes"},
                    {text: "Created at"},
                    {text: "Submitter"},
                    {text: "Action"},
                ]
            }
        }
    }),
    methods: {
        updateItemDescription() {
            if(this.valid) {
                let info = [this.info,this.itemInfo];
                this.info = Object.assign(...info);
                this.closeDialog()
            }
        }
    }
}
</script>

<style>
.v-expansion-panels {
    z-index: 0;
}
</style>