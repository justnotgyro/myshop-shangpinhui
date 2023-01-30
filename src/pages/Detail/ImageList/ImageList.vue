<template>
  <swiper
    :modules="modules"
    :slides-per-view="5"
    :space-between="0"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
  >
    <swiper-slide v-for="(carousel, index) in skuImageList" :key="carousel.id">
      <img
        :src="carousel.imgUrl"
        alt=""
        :class="{ active: currentIndex === index }"
        @click="changeCurrentIndex(index)"
      />
    </swiper-slide>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import "swiper/less";
import "swiper/less/navigation";

import { ref } from "vue";

import emitter from "@/utils/eventBus";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const currentIndex = ref(0);
    const changeCurrentIndex = (index) => {
      currentIndex.value = index;
      emitter.emit("getIndex", currentIndex);
    };

    return {
      modules: [Navigation],
      currentIndex,
      changeCurrentIndex,
    };
  },
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  margin-top: 8px;
  position: relative;
  padding-left: 20px;
  .swiper-wrapper {
    .swiper-slide {
      width: 56px;
      height: 100%;

      img {
        height: 56px;
        width: 56px;
        border: 1px solid #ccc;

        &.active {
          box-sizing: border-box;
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }
  }

  .swiper-button-next {
    right: 20px;
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next,
  .swiper-button-prev {
    position: absolute;
    top: 0;
    // box-sizing: border-box;
    width: 10px;
    height: 56px;
    margin-top: 0;
    display: block;
    background: #ebebeb;
    border: 1px solid rgb(204, 204, 204);
    &::after {
      display: block;
      font-size: 12px;
      line-height: 56px;
      text-align: center;
    }
  }
}
</style>
