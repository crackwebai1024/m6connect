<template>
    <div>
        <img
            @click="dialog = true"
            v-if="$h.dg(currentCompany, 'logo', '')"
            :alt="currentCompany.name" 
            class="rounded ml-6 pointer" 
            width="62" 
            height="45" 
            :src="currentCompany.logo"
        >
        <template>
            <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
            >
            <v-card class="relative" tile>
                <v-btn
                    class="absolute top-0 left-0 ml-3 mt-1"
                    icon
                    light
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <div class="max-w-lg pt-6 pb-4 w-full mx-auto d-flex justify-space-between align-center">
                    <div class="d-flex align-center">
                        <img
                            v-if="$h.dg(currentCompany, 'logo', '')"
                            :alt="currentCompany.name" 
                            class="rounded pointer" 
                            width="180" 
                            height="150" 
                            :src="currentCompany.logo"
                        >
                        <div class="ml-8">
                            <p class="font-weight-regular text-h5 mb-1">{{ currentCompany.name }}</p>
                            <p>{{ currentCompany.legalCompanyName }}</p>
                        </div>
                    </div>
                    <div>
                        <v-btn
                            class="blue left-0 ml-3 mt-1 px-8 py-6 white--text font-weight-black"
                            text
                            light
                        >
                            Connect
                        </v-btn>
                    </div>
                </div>
                <v-divider class="max-w-lg w-full mx-auto blue-grey lighten-5"></v-divider>
                <div class="max-w-lg w-full pt-1 mx-auto d-flex justify-space-between align-center">
                    <template>
                        <v-tabs
                            color="white"
                        >
                            <v-tab class="capitalize">Home</v-tab>
                            <v-tab class="capitalize">People</v-tab>
                            <v-tab class="capitalize">Topics</v-tab>
                            <v-tab class="capitalize">Store</v-tab>
                        </v-tabs>
                    </template>
                    <div class="d-flex align-center">
                        <v-btn
                            class="grey capitalize lighten-2 grey--text text--darken-3 left-0 ml-3 pa-3 font-weight-black"
                            text
                            light
                        >
                            Follow
                        </v-btn>
                        <v-btn
                            class="grey capitalize lighten-2 grey--text text--darken-3 left-0 ml-3 pa-3 font-weight-black"
                            text
                            light
                        >
                            Message
                        </v-btn>
                        <v-btn
                            elevation="0"
                            class="grey capitalize lighten-2 grey--text text--darken-3 left-0 ml-3 pa-1 font-weight-black"
                            light
                        >
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </div>
                </div>
                <div class="grey lighten-3 h-full">
                    <div class="max-w-lg w-full pt-1 mx-auto d-flex justify-space-between align-center">
                        content
                    </div>
                </div>
            </v-card>
            </v-dialog>
        </template>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CompanyDetails",
  computed: {
    ...mapState("Companies", {
      currentCompany: "currentCompany"
    })
  },
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false
  })
};
</script>

<style lang="scss" scoped>
</style>