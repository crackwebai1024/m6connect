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
          <dynamic-app-form @closeModal="closeModal" @closingGenericRecord="closingGenericRecord" />
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
</style>
