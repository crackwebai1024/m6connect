<template>
  <div class="py-0 my-0 px-5" >
    <p
      class="pointer text-subtitle-1 font-weight-bold blue--text"
      @click="redirect(recordInfo['url'])"
    >
      {{ recordInfo["url"] }}
    </p>

    <v-row
      no-gutters
      class="px-1 mx-2 py-0 my-0  text-left"
      style="borderLeft: thick solid rgb(238 238 238);"
      align="center"
    >
      <v-col cols="12">
        <div class="d-inline-block">
          <v-img
            v-if="recordInfo['image']"
            width="50"
            height="50"
            aspect-ratio="1.7"
            class="mx-1 my-0 rounded"
            :src="recordInfo['image']"
            @click="previewImage(image)"
          />
          <v-icon class="mx-1 my-0" v-else size="50">
            mdi-store
          </v-icon>
        </div>
        <div class="d-inline-block pl-2">
          <p class="py-0 my-0 font-weight-medium text--blue-grey">
            {{ recordInfo["subtitle"] }}
          </p>
          <v-spacer></v-spacer>
          <p class="py-0 my-0 font-weight-medium text--blue-grey">
            {{ recordInfo["title"] }}
          </p>
        </div>
      </v-col>
      <v-col cols="12">
        <p class="py-0 my-1 font-weight-medium text--blue-grey">
          {{ type === 'message'  && recordInfo["description"].length > 100 
              ? recordInfo["description"].substr(0, 100)+'...' : type === 'post'  && recordInfo["description"].length > 250 
              ? recordInfo["description"].substr(0, 250)+'...' : recordInfo["description"]}}
        </p>
      </v-col>
      <v-card class="mx-5 my-7" :width="type === 'message' ? '100%' : '50%'">
        <v-card-title class="font-weight-regular pt-3 pb-0 mx-0" :class="type === 'message' ? 'text-subtitle-1' : ''" >
          {{ recordInfo["panel_title"] }}
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="(value, index) of recordInfo['panel']"
              :key="index + '-panel'"
              cols="12"
            >
              <p class="font-weight-light my-0 py-0">
                {{ value["name"] }}
              </p>
              <v-spacer></v-spacer>
              <p class="my-0 py-0">{{ value["value"] }}</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'RecordUrl',
  props: {
    recordInfo: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: 'post'
    }
  },
  methods: {
    redirect(file){
      window.open(file,'_blank')
    },
  }
}
</script>