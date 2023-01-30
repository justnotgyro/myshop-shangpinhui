<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-if="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";

import { mapActions, mapState, useStore } from "vuex";
export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    const store = useStore();
    store.dispatch("categoryList");
  },
};
</script>

<style lang="less" scoped></style>
