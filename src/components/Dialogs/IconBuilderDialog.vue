<template>
  <v-card class="rounded-lg">
    <v-card-title class="headline">
      <v-text-field
        v-model="searchKey"
        label="Search Icon"
        single-line
      />
    </v-card-title>
    <v-row>
      <v-col cols="8">
        <div class="icon-list__container">
          <div
            v-for="(icon, index) in iconList"
            :key="index"
            :class="['icon__div', {'selected': selectedIcon===icon}]"
            @click="selectIcon(icon)"
          >
            <v-icon size="60">
              {{ `mdi-${icon}` }}
            </v-icon>
          </div>
        </div>
      </v-col>
      <v-col cols="4">
        <sketch-picker v-model="iconBackgroundColor" />
        <div
          v-if="selectedIcon !== ''"
          class="align-center d-flex justify-center py-4 w-full"
        >
          <v-avatar
            class="pointer"
            :color="iconBackgroundColor.hex"
            size="100"
          >
            <v-icon
              :color="iconColor.hex"
              size="60"
            >
              {{ 'mdi-' + selectedIcon }}
            </v-icon>
          </v-avatar>
        </div>
      </v-col>
    </v-row>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="green darken-1"
        outlined
        @click="btnClick(false)"
      >
        Cancel
      </v-btn>
      <v-btn
        color="green darken-1"
        outlined
        @click="btnClick(true)"
      >
        Select
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Sketch } from 'vue-color'
import icons from '@/utils/iconList'

export default {
  name: 'IconBuilderDialog',
  components: {
    'sketch-picker': Sketch
  },
  data: () => ({
    iconBackgroundColor: {
      hex: '#000'
    },
    iconColor: {
      hex: '#fff'
    },
    selectedIcon: '',
    iconList: [],
    searchKey: ''
  }),
  watch: {
    searchKey() {
      if (this.searchKey === '') {
        this.iconList = icons
      } else {
        this.iconList = icons.filter(row => row.toUpperCase().indexOf(this.searchKey.toUpperCase()) !== -1)
      }
    }
  },
  mounted() {
    this.iconList = icons
  },
  methods: {
    btnClick(selected) {
      this.searchKey = ''
      this.iconList = icons
      this.$emit('selectIconAction', selected, {
        icon: `mdi-${this.selectedIcon}`,
        background: this.iconBackgroundColor.hex ? this.iconBackgroundColor.hex : '#AAA'
      })
    },
    selectIcon(e) {
      this.selectedIcon = e
    }
  }
}
</script>

<style>
.icon-list__container {
  max-height: 500px;
  overflow: auto;
  display: flex;
  flex-flow: wrap;
}
.icon__div {
  width: 80px;
  height: 80px;
  margin: 10px;
  border: 1px solid #8d8d8d;
  border-radius: 10px;
  justify-content: center;
  display: flex;
}
.icon__div:hover {
  background: #42b883;
  color: #fbfbfb;
}
.selected {
  background: #42b883;
  color: #fbfbfb;
}
</style>
