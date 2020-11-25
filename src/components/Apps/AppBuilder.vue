<template>
  <v-container class="w-main-content px-0 ma-0 pt-5 pb-0 d-flex vertical-scroll dont-show-scroll h-full">
    <!-- General use list component-->
    <template>
      <!-- Project List Component -->
      <apps-list class="main-content align-content-start"/>
    </template>
  </v-container>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex';
import AppsList from "@/components/RecordMode/RecordComponents/RecordType/DynamicApp/AppsList";

export default {
  name: "AppBuilder",
  components: {
    AppsList,
  },
  computed: {
  },
  methods: {
  }
};
</script>