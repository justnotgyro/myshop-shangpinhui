<template>
  <div>
    <!-- TypeNav是一个全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommand></Recommand>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommand from "@/pages/Home/Recommand";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: {
    ListContainer,
    Recommand,
    Rank,
    Like,
    Floor,
    Brand,
  },
  setup() {
    const store = useStore();
    store.dispatch("floorList");
    const floorList = computed(() => store.state.home.floorList);
    return { floorList };
  },
};
</script>

<style lang="less" scoped></style>
