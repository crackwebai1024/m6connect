<template>
  <v-sheet
    style="position: relative; height:95vh;"
  >
    <v-container class="fill-height">
      <slot></slot>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      class="no-scroll"
      expand-on-hover
    >
      <v-list dense>
        <!-- <v-list-item
          link
          @click="asd()"
        >
          <v-list-item-content>
            <v-list-item-title>asdasd</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item
          v-for="(item, index) in get_views_list()"
          :key="index"
          link
          @click="set_status_bootom_template(true)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.iconName }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        drawer: true,
        mini: true,
      }
    },
    computed: {
      // get_views_list has a list of objects with name, iconName, route
      ...mapGetters(["get_views_list"]),
    },
    methods: {
      ...mapActions(["set_status_bootom_template"]),
      asd(){
        console.log(this.drawer)
      }
    }
  }
</script>

<style scoped lang="scss">
  .no-scroll {
    overflow-x: hidden!important;

    ::-webkit-scrollbar {
      -webkit-appearance: none !important;
      width: 0px !important;
    }
  }
</style>