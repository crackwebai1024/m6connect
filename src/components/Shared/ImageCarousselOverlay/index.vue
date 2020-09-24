<template>
  <transition name="fade">
    <v-overlay opacity="0.6" :value="overlay">
      <v-card class="h-viewport w-viewport">
        <v-row no-gutters align="center" justify="center" class="fill-height">
          <v-col cols="8" class="relative">
            <v-avatar
              @click="closeOverlay()"
              size="50"
              color="grey lighten-2"
              class="pointer absolute top-0"
              style="height: 50px; width: 50px; left: 15px; z-index: 100;"
            >
              <v-icon size="30" color="black">mdi-close</v-icon>
            </v-avatar>
            <carousel
              class="w-full"
              :navigationEnabled="false"
              :paginationEnabled="false"
              :perPage="1"
              :navigateTo="navigate"
            >
              <slide v-for="(item,index) in images" :key="index">
                <carousel-image :image="item"></carousel-image>
              </slide>
            </carousel>
          </v-col>
          <v-col cols="4" class="h-viewport white"></v-col>
        </v-row>
      </v-card>
    </v-overlay>
  </transition>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import CarouselImage from "@/components/Shared/ImageCarousselOverlay/CarouselImage";

export default {
  components: {
    Carousel,
    Slide,
    CarouselImage,
  },
  props: {
    value: {
      default: false,
    },
    images: {
      required: true,
    },
    selected: {
      required: true,
    },
  },
  data() {
    return {
      overlay: false,
      navigate: 0,
    };
  },
  watch: {
    value(val) {
      this.overlay = val;
    },
    selected(val) {
      this.navigate = [this.images.indexOf(val), false];
    },
  },
  methods: {
    closeOverlay() {
      this.overlay = false;
      this.$emit("restartImageArray");
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>