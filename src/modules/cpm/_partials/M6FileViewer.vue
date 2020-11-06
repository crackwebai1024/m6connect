<template>
  <v-dialog
    v-model="show"
    :width="showWithIframe ? '90%' : '300px'"
  >
    <v-card :style="showWithIframe ? 'height: 90vh' : ''">
      <v-card-title>
        <span
          class="headline"
          v-text="name"
        />
      </v-card-title>

      <p
        v-if="!showWithIframe"
        class="headline pt-5 text-center"
      >
        Downloading
      </p>

      <img
        v-if="isImage"
        :alt="`Error loading - ${name}`"
        :src="urlDecoded"
        style="width: 100%"
      >

      <iframe
        v-else
        class="pa-4"
        frameborder="0"
        :src="urlDecoded"
        :style="showWithIframe ? 'width: 100%; height: calc(100% - 70px);' : 'width: 0; height: 0'"
      />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'M6FileViewer',

  props: {
    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      default: ''
    },

    url: {
      type: String,
      required: true
    }
  },

  data: () => ({
    show: true
  }),

  computed: {
    isImage() {
      // TODO: validate with extension
      return this.type === 'image'
    },

    showWithIframe() {
      return (
        this.isImage ||
        this.url
          .toString()
          .toLowerCase()
          .includes('.pdf')
      )
    },

    urlDecoded() {
      return decodeURIComponent(this.url)
    }
  },

  watch: {
    show(v) {
      if (!v) {
        this.$emit('closed')
      }
    }
  }
}
</script>
