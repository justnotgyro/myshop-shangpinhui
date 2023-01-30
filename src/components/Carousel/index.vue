<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="10"
    :loop="true"
    :autoplay="{ delay: 2000, disableOnInteraction: false }"
    navigation
    :pagination="{ clickable: true }"
  >
    <swiper-slide v-for="(carousel, index) in list" :key="carousel.id">
      <img :src="carousel.imgUrl" alt="" />
    </swiper-slide>
    ...
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/less";
import "swiper/less/navigation";
import "swiper/less/pagination";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["list"],
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay],
    };
  },
};
</script>

<style lang="less" scoped></style>
