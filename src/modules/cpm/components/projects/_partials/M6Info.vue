<template>
  <v-dialog
    :value="true"
    persistent
    :width="600"
  >
    <v-card>
      <v-card-title class="info white--text title">
        <v-layout align-center>
          <v-flex shrink>
            {{ title }}
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex shrink>
            <v-icon @click="close" dark>close</v-icon>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'M6Info',
    
    props: {
      title: {
        type: String,
        required: true
      }
    },
    
    methods: {
      close() {
        this.$emit('close')
      }
    }
  }
</script>
