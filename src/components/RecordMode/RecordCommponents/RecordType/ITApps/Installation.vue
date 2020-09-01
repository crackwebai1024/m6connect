<template>
  <v-container>
      <v-subheader class="primary rounded-t white--text">Installation</v-subheader>
      <v-expansion-panels accordion>
          <v-expansion-panel>
              <v-expansion-panel-header>General</v-expansion-panel-header>
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
              <v-expansion-panel-header>Attachments</v-expansion-panel-header>
              <v-expansion-panel-content>
                  contenido aki
              </v-expansion-panel-content>
          </v-expansion-panel>
          
          <v-expansion-panel>
              <v-expansion-panel-header>Install Support</v-expansion-panel-header>
              <v-expansion-panel-content>
                  contenido aki
              </v-expansion-panel-content>
          </v-expansion-panel>
          
          <v-expansion-panel>
              <v-expansion-panel-header>Additional Package Build Information</v-expansion-panel-header>
              <v-expansion-panel-content>
                  contenido aki
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
            }
        }
    }),
}
</script>

<style>

</style>