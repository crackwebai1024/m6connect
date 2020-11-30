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
              <div
                v-if="value['value'] && value['value']['id']"
              >
                <v-img
                  :src="getURL(value['value']['id'])"
                  aspect-ratio="1.7"
                  class="mx-1 my-1"
                />
              </div>
              <div v-else-if="value['value'] && typeof value['value'] === 'object' && value['value'][0]['firstName']">
                <div v-for="(item, index) in value['value']" :key="'multi-'+index" >
                  <p class="d-inline-block my-0 py-0"> {{`${item.firstName} ${item.lastName}`}} </p>
                </div>
              </div>
              <div v-else-if="value['value'] && typeof value['value'] === 'object' && typeof value['value'][0] === 'object'">
                <div v-for="(item, index) in value['value']" :key="'multi-'+index" >
                  <p class="d-inline-block my-0 py-0"> {{item.value}} </p>
                </div>
              </div>
              <div v-else-if="value['value'] && typeof value['value'] === 'object' && typeof value['value'][0] === 'string'">
                <v-progress-circular
                  style="margin-left: 45%;"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
              <p class="my-0 py-0" v-else>{{ value["value"] }}</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'RecordUrl',
  data: () => ({
    peopleFields: {},
  }),
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
    ...mapActions('WorkOrderModule', {
      getUsers: 'getUsersList'
    }),
    redirect(file){
      window.open(file,'_blank')
    },
    getURL(id){
      return `${process.env.VUE_APP_HTTP}${process.env.VUE_APP_ENDPOINT}/api/file/url/${id}`
    },
    async getUserData(usersArray){
      let res = await this.getUsers(usersArray);

      return res.data;
    }
  },
  mounted(){
    this.recordInfo.panel.forEach((field, index) => {
      if(field.value && typeof field.value === 'object' && typeof field.value[0] === 'string' ) {
        this.getUserData(field.value).then(res => {
          this.recordInfo.panel[index]['value'] = res;
        });
      }
    })
  }
}
</script>