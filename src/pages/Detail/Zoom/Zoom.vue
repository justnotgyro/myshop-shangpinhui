<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentIndex].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuImageList[currentIndex]?.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import emitter from "@/utils/eventBus";
import { ref } from "vue";
export default {
  name: "Zoom",
  props: ["skuImageList"],
  setup() {
    const currentIndex = ref(0);
    emitter.on("getIndex", (index) => {
      currentIndex.value = index.value;
    });
    const mask = ref();
    const big = ref();
    const handler = (e) => {
      let top = e.offsetY - mask.value.offsetHeight / 2;
      let left = e.offsetX - mask.value.offsetWidth / 2;
      if (top < 0) top = 0;
      if (top > mask.value.offsetWidth) top = mask.value.offsetWidth;
      if (left < 0) left = 0;
      if (left > mask.value.offsetHeight) left = mask.value.offsetHeight;
      mask.value.style.top = top + "px";
      mask.value.style.left = left + "px";
      big.value.style.left = -left * 2 + "px";
      big.value.style.top = -top * 2 + "px";
    };

    return {
      currentIndex,
      handler,
      mask,
      big,
    };
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(255, 255, 255, 0.689);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
