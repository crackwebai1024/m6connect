<template>
  <v-dialog
    v-model="showing"
    max-width="480"
  >
    <v-card class="m6_connect_card">
      <v-card-title class="headline">
        <span style="color: white">{{ title }}</span>
      </v-card-title>

      <v-card-text v-html="message">
        <div>
          <div
            v-for="(item, indexD) in details"
            :key="indexD"
          >
            <b v-text="`${item.key}: `" />
            <span v-text="item.value" />
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="error"
          :disabled="deleting"
          flat="flat"
          @click="$emit('cancel')"
        >
          No
        </v-btn>

        <v-btn
          color="blue darken-1"
          :disabled="deleting"
          flat="flat"
          @click="$emit('confirm')"
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'M6ConfirmDelete',

  props: {
    confirm: {
      type: Boolean,
      default: false
    },

    deleting: {
      type: [Boolean, Number, String],
      default: false
    },

    details: {
      type: Array,
      default: () => []
    },

    message: {
      type: String,
      default: 'Are you sure you want to delete this resource?'
    },

    show: {
      type: [Boolean, Number, String],
      required: true
    },

    title: {
      type: String,
      default: 'Confirmation'
    }
  },

  data: () => ({
    showing: false
  }),

  watch: {
    show(v) {
      this.showing = v
    },

    showing(v) {
      if (!v) {
        this.$emit('cancel')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m6_connect_card {
  width: 100%;
  max-width: 100%;

  .v-card__title {
    padding: 10px;
    background: #1976d2;
    color: #fff;

    h3 {
      font-weight: 100;
    }
  }

  .cursor-pointer-row {
    cursor: pointer;
  }
}
</style>
