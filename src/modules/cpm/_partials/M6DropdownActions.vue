<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-btn
        color="info"
        dark
        small
        v-on="on"
      >
        <v-icon
          class="mr-2"
          dark
        >
          arrow_circle_down
        </v-icon>
        Actions
      </v-btn>
    </template>
    <v-list dense>
      <template v-for="(option, index) in options">
        <v-list-tile
          v-if="!option.hide"
          :key="index"
          class="list-item"
        >
          <v-list-tile-title @click="emitEvent(option.event)">
            <v-row class="align-center list-item">
              <v-col class="shrink">
                <v-icon
                  v-if="option.icon"
                  class="mr-2"
                >
                  {{ option.icon }}
                </v-icon>
              </v-col>
              <v-col class="grow">
                <span class="line-item-text">
                  {{ option.title }}
                </span>
              </v-col>
            </v-row>
          </v-list-tile-title>
        </v-list-tile>
      </template>
    </v-list>
  </v-menu>
</template>

<script>

/* HOW TO USE
 *
 * Options: Array[Objects]
 *
 * OPTION ITEMS PROPERTIES:
 * icon(optional): material icon name
 * title: title that will be displayed on the right of the icon
 * event: the event that you wanna catch in the parent and execute your action
 * hide(optional): set true to hide the option
 *
 * Enjoy it :D
*/
export default {
  name: 'M6DropdownActions',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({}),
  methods: {
    emitEvent(eventToEmit) {
      this.$emit(eventToEmit)
    }
  }
}
</script>

<style lang="scss">
  .list-item {
    cursor: pointer;
    transition: 0s all;
  }
  .list-item:hover {
    background: #24b6ff;
    color: white;
  }
  .list-item:hover line-item-text {
    background: #24b6ff;
    color: white;
  }
  .list-item:hover i {
    background: #24b6ff;
    color: white;
  }
</style>
