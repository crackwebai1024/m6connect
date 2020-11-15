<template>
  <div>
    <div v-if="!showInput" @click="showInput = !showInput" class="pointer">
      <slot name="btn" />
    </div>
    <v-dialog v-model="showInput" max-width="500">
      <v-card>
        <v-card-title class="headline">
          New Application
        </v-card-title>
        <v-card-text class="record-text vertical-scroll">
          <v-tabs centered v-model="tab">
            <v-tab v-for="item in items" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab+'-app-header'">
              <component
                @closeModal="closeModal"
                @closingGenericRecord="closingGenericRecord"
                v-bind:is="item.component"
                :app="item.app"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
        <v-card-text>
          <v-container class="px-0 py-0 mt-2 white">
            <v-form @submit.prevent ref="form" v-model="valid">
              <v-row class="w-full ma-0">
                <v-col cols="12" class="py-0">
                  <v-text-field
                    ref="inputFeed"
                    :rules="textRules"
                    v-model="itemInfo.title"
                    class="h-full outline-none text-body-1"
                    placeholder="Title"
                  />
                </v-col>
              </v-row>
              <v-row class="w-full ma-0 px-3 py-2">
                <v-btn
                  color="green darken-2"
                  class="white--text text-xl font-weight-bold"
                  @click="post()"
                  :disabled="!valid"
                  block
                  >Submit</v-btn
                >
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DynamicAppForm from "@/components/Home/Forms/DynamicAppForm";
import ItAppForm from "@/components/Home/Forms/ItAppForm";
import { validations } from "@/mixins/form-validations";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreateApp",
  components: {
    DynamicAppForm,
    ItAppForm,
  },
  mixins: [validations],
  data: () => ({
    tab: null,
    showInput: false,
    items: [
      { tab: "ItApp",       component: ItAppForm      },
      { tab: "Dynamic App", component: DynamicAppForm }
    ],
    itemInfo: {},
  }),
  methods: {
    closeModal() {
      this.showInput  = false;
    },
    closingGenericRecord() {
      this.closeModal()
    },
  },
  computed: {},
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
  color: #b6b6b6;
  cursor: not-allowed;
  background-image: none;
}
.record-text {
  height: 75vh;
}
</style>
