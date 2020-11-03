<template>
  <v-card>
    <v-card-title
      class="title"
      primary-title
    >
      {{ title }}
    </v-card-title>
    <v-card-text>
      <v-container
        fluid
        grid-list-md
      >
        <v-layout
          row
          wrap
        >
          <template v-for="(fileObj, index) in files">
            <v-flex
              v-if="fileObj.inReport && (fileObj.file === 'image/jpeg' || fileObj.file === 'image/png')"
              :key="index"
              md3
            >
              <v-img
                v-if="fileObj.url"
                aspect-ratio="1"
                :src="fileObj.url"
              >
                <template v-slot:placeholder>
                  <v-layout
                    align-center
                    fill-height
                    justify-center
                    ma-0
                  >
                    <v-progress-circular
                      color="blue lighten-2"
                      indeterminate
                    />
                  </v-layout>
                </template>

                <v-layout
                  class="lightbox white--text"
                  column
                  fill-height
                  pa-2
                >
                  <v-spacer />
                  <v-flex shrink>
                    <v-chip
                      v-for="(tag, index) in fileObj.tags"
                      :key="index"
                      color="blue lighten-2"
                      text-color="white"
                    >
                      {{ tag }}
                    </v-chip>
                  </v-flex>
                </v-layout>
              </v-img>
            </v-flex>
          </template>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    files: {
      type: Array,
      default: []
    }
  }
}
</script>
