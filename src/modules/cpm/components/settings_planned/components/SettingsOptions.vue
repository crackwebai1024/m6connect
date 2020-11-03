<template>
  <v-card height="100%">
    <v-card-text>
      <v-list>
        <template v-for="(item, index) in options">
          <v-list-tile
            :key="index"
            :class="optSelected === item.name ? 'm6_optActive' : ''"
            @click="selectOption(item)"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="item.name" />
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="'divider' + index" />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    options: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      optSelected: ''
    }
  },
  mounted() {
    this.options.sort()
  },
  methods: {
    selectOption(item) {
      this.optSelected = item.name
      this.$emit('updateOption', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.m6_optActive {
  color: #fff;
  background: #0277bd;
}
</style>
