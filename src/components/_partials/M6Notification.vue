<template>
    <v-snackbar
      v-model="snackbar"
      :bottom="bottom"
      :color="notifColor"
      :left="left"
      :multi-line="multiLine"
      :right="right"
      :timeout="timeout"
      :top="top"
      :vertical="vertical"
    >
      <span class="white--text" >{{ text }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="$emit('closing')"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
import colors from 'vuetify/lib/util/colors'

export default {
    name: 'M6Notification',
    props: {
        snackbar: {
            type: Boolean,
            default: false
        },
        success: {
            type: Boolean,
            default: false
        },
        warning: {
            type: Boolean,
            default: false
        },
        danger: {
            type: Boolean,
            default: false
        },
        timeout: {
            type: Number,
            default: 5000
        },
        top: {
            type: Boolean, 
            default: false
        },
        bottom: {
            type: Boolean,
            default: false
        },
        left: {
            type: Boolean,
            default: false
        },
        right: {
            type: Boolean,
            default: false
        },
        multiLine: {
            type: Boolean,
            default: false
        },
        vertical: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: ''
        }
    },
    computed: {
        notifColor(){
            let str = ""
            switch (true) {
                case this.success:
                    str = colors.green.darken1
                    break;
                case this.warning:
                    str = colors.yellow.darken1
                    break;
                case this.danger:
                    str = colors.red.darken1
                    break;

                default:
                    str = colors.blue.darken1
                    break;
            }

            return str
        }
    },
}
</script>