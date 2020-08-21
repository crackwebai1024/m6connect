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
      class="withScroll"
      expand-on-hover
    >
      <v-list dense>
        <v-list-item
          v-for="(item, index) in get_views_list()"
          :key="index"
          link
          @click="mini=true"
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
  import { mapGetters } from 'vuex'

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
  }
</script>

<style scoped lang="scss">
  .withScroll{
    overflow-y: hidden!important; /* Hide vertical scrollbar */
    overflow-x: hidden!important; /* Hide horizontal scrollbar */
  }
</style>