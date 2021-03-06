<template>
  <div
    class="px-13 py-4 white"
    :style="{
      backgroundImage: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(' + require('@/assets/header-background.png') + ')',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      paddingBottom: '6px!important',
      marginBottom: '8px!important'
    }"
  >
    <div>
      <v-text-field
        v-model="searchInput"
        background-color="white"
        class="font-weight-bold text-capitalize py-2 pt-0 records-search-box"
        dense
        flat
        height="40"
        hide-details
        :label="placeHolder"
        rounded
        single-line
        @change="changeEvent"
      >
        <template #append>
          <general-list-drop-down :currentApp="appList[selected]" v-model="tableView" />
        </template>
      </v-text-field>
    </div>
    <div class="in-here" >
      <flickity
        ref="flickity"
        :options="flickityOptions"
      >
        <div
          v-for="(item, index) in appList"
          :key="index"
          :class="selected > -1 ? (selected === index ? 'flicky-item' : 'flicky-item unselected-item') : 'flicky-item'"
          @click="changingApps(item, index)"
        >
          <div
            class="item-img"
            :class="selected > -1 ? (selected === index ? 'item-img img-shadow' : 'item-img') : 'item-img'"
            :style="{backgroundColor: getBGColor(item)}"
          >
            <v-img
              v-if="item.iconLink && item.iconLink !== ''"
              alt="m6app_img"
              class="image-icon"
              :src="item.iconLink"
            />
            <template v-else-if="item.metadata">
              <template v-if="item.metadata.appIcon">
                <v-icon
                  :color="item.metadata.appIcon.iconColor"
                  size="100"
                >
                  {{ item.metadata.appIcon.icon }}
                </v-icon>
              </template>
              <v-icon
                v-else
                size="100"
              >
                mdi-store
              </v-icon>
            </template>
            <v-icon
              v-else
              size="100"
            >
              mdi-store
            </v-icon>
            <v-btn
              v-if="item.id"
              class="edit-app-button"
              icon
              @click="editApp(item)"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
          </div>
          <div class="item-text">
            {{ item.text }}
          </div>
        </div>
      </flickity>
    </div>
  </div>
</template>

<script>
import GeneralListDropDown from '@/components/Apps/GeneralListDropDown'
import Flickity from 'vue-flickity'

export default {
  name: 'RecordListHeader',
  components: {
    Flickity,
    GeneralListDropDown
  },
  props: {
    appList: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    searchInput: '',
    tableView: {},
    placeHolder: 'Search All Records',
    flickityOptions: {
      initialIndex: 1,
      prevNextButtons: true,
      pageDots: false,
      wrapAround: true
    },
    selected: -1
  }),
  watch: {
    tableView() {
      this.$emit('tableViewChange', this.tableView)
    },
    selected() {
      if (this.selected !== -1) {
        this.placeHolder = 'Search ' + this.appList.find((row, index) => index === this.selected).text
      } else {
        this.placeHolder = 'Search All Records'
      }
    }
  },
  methods: {
    changeEvent(event) {
      this.$emit('changeEvent', event)
    },
    changingApps(item, index) {
      this.selected = index
      this.$emit('changingApps', item)
    },
    getBGColor(item) {
      if (item.metadata) {
        if (item.metadata.appIcon) return item.metadata.appIcon.background
      }
      return item.bgColor
    },
    editApp(appItem) {
      this.$router.push(`/dev/${appItem.id}`)
    }
  }
}
</script>

<style lang="scss">
.header-title {
  font-size: 1.6em;
  line-height: 1;
}
.flicky-item {
  width: 100px;
  height: auto;
  margin: 10px;
  text-align: center;
}
.flicky-item:hover {
  cursor: pointer;
}
.item-img {
  height: 100px;
  border-radius: 15px;
}
.item-text {
  color: white;
}
.image-icon {
  border-radius: 15px;
  height: 100%;
  width: 100%;
}
.unselected-item {
  opacity: 0.7;
}
.flickity-viewport {
  margin-left: -15px;
  margin-right: -25px;
}
/* no circle */
.flickity-button {
  background: transparent;
}
/* big previous & next buttons */
.flickity-prev-next-button {
  width: 100px;
  height: 100px;
}
/* icon color */
.flickity-button-icon {
  fill: white;
}
/* hide disabled button */
.flickity-button:disabled {
  display: none;
}
.flickity-prev-next-button {
  .flickity-button-icon {
    top: 0;
    width: 50%;
    height: 50%;
    left: 25%;
  }
}
.flickity-prev-next-button:hover {
  background: transparent;
}
.flickity-prev-next-button:hover {
  background: transparent;
}
.flickity-prev-next-button.previous {
  left: -70px;
}
.flickity-prev-next-button.next {
  right: -70px;
}
.custom-field-input-field {
  background-color: white;
  color: grey;
}
.img-shadow {
  box-shadow: 0px 0px 4px 4px #ffffff7a;
}
.edit-app-button {
  color: white !important;
  position: absolute !important;
  right: -10px;
  top: -10px;
  z-index: 99;
}
.records-search-box {
  &.v-text-field{
    margin-top: 0!important;
    padding-bottom: 6px!important;
    &.v-input--dense:not(.v-text-field--outlined) input {
      padding: 8px 0 8px;
    }
    .v-btn {
      height: 40px;
    }
  }
}
</style>
