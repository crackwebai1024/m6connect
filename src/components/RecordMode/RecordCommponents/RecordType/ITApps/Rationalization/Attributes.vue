<template>
  <v-container>
    <v-subheader class="primary rounded-t white--text">Rationalization Attributes</v-subheader>
    <v-card class="px-3">
      <v-row>
        <v-col cols="6">
          <v-select label="Meeting customer needs" :items="['yes', 'no']"></v-select>
        </v-col>
        <v-col cols="6">
          <v-select label="Rationalization"
                    :items="['Eliminate', 'Invest', 'Migrate', 'Tolerate']"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-input hint="$ 312,540.00" persistent-hint>Total Annual Cost</v-input>
        </v-col>
        <v-col cols="6">
          <v-input hint="5" persistent-hint>Estimated Users</v-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-input hint="$ 62,508.00" persistent-hint>Ratio of Cost to User</v-input>
        </v-col>
        <v-col cols="6">
          <v-select label="Capabilities"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select label="Application Value" multiple chips :items="application_value"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field flat label="Retire" prepend-icon="mdi-calendar"></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    application_value: [
      'Financial/Revenue',
      'Only Vendor',
      'Additional Comments',
      'Quality',
      'Regulatory/Compliance',
      'Safety/Reliability',
      'Service/Productivity'
    ]
  })
}
</script>

<style>

</style>