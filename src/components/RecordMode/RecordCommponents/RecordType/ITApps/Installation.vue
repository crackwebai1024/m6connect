<template>
  <v-container>
      <v-subheader class="primary rounded-t white--text">Installation</v-subheader>
      <v-expansion-panels accordion>
          <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-medium">General</v-expansion-panel-header>
              <v-expansion-panel-content>
                  <!--Vamos a hacer el item más compacto en caso de que su value esté vacio-->
                    <v-list-item :two-line="item.value.length > 0" :key="'general-' + key"
                        v-for="(item, key) in installation.general">
                        <v-list-item-content>
                            <v-list-item-title class="text-body-2">{{item.label}}</v-list-item-title>
                            <v-list-item-subtitle>{{item.value}}</v-list-item-subtitle>
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
                    <v-list-item :two-line="item.value.length > 0" :key="'support-' + key"
                        v-for="(item, key) in installation.support">
                        <v-list-item-content>
                            <v-list-item-title class="text-body-2">{{item.label}}</v-list-item-title>
                            <v-list-item-subtitle>{{item.value}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
              </v-expansion-panel-content>
          </v-expansion-panel>
          
          <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-medium">Additional Package Build Information</v-expansion-panel-header>
              <v-expansion-panel-content>
                  <v-list-item :two-line="item.value.length > 0" :key="'support-' + key"
                        v-for="(item, key) in installation.build_info">
                        <v-list-item-content>
                            <v-list-item-title class="text-body-2">{{item.label}}</v-list-item-title>
                            <v-list-item-subtitle>{{item.value}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
              </v-expansion-panel-content>
          </v-expansion-panel>
      </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        installation: {
            general: {
                install_type: {
                    label: "Type",
                    value: ""
                },
                priority: {
                    label: "Priority",
                    value: ""
                },
                executable: {
                    label: "Executable",
                    value: ""
                },
                odbc_connection: {
                    label: "(ODBC) Connection Required",
                    value: ""
                },
                odbc_contact: {
                    label: "(ODBC) Contact name",
                    value: ""
                },
                odbc_settings: {
                    label: "(ODBC) Settings",
                    value: ""
                },
                windows_passed: {
                    label: "Windows Passed DCT",
                    value: ""
                },
                delivery: {
                    label: "Delivery Method",
                    value: ""
                },
                notes: {
                    label: "General Notes",
                    value: ""
                },
            },
            support: {
                firewall_exceptions: {
                    label: "Firewall Exceptions",
                    value: ""
                },
                antivirus_exclusion: {
                    label: "Firewall Exceptions",
                    value: ""
                },
                mapped_drives: {
                    label: "Mapped Drives",
                    value: ""
                },
                shortcut_modifications: {
                    label: "Shortcut Modifications",
                    value: ""
                },
                ini_changes: {
                    label: "INI Changes",
                    value: ""
                },
                install_notes: {
                    label: "Install Notes",
                    value: ""
                },
                registry_changes: {
                    label: "Registry Changes",
                    value: ""
                }
            },
            build_info: {
                previous_version: {
                    label: "Previous Software Version",
                    value: ""
                },
                ad_machine: {
                    label: "AD Groups - Machine",
                    value: ""
                },
                ad_user: {
                    label: "AD Groups - User",
                    value: ""
                }
            },
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
}
</script>

<style>

</style>