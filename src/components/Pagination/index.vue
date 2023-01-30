<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="pageNoHandler(pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1" @click="pageNoHandler(1)">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- <template v-if="totalPage > continuesArr.length"
      ><button
        v-for="(page, index) in continuesArr"
        :key="index"
        @click="pageNoHandler(page)"
      >
        {{ page }}
      </button>
    </template>
    <template v-else>
      <button
        v-for="(page, index) in totalPage"
        :key="index"
        @click="pageNoHandler(page)"
      >
        {{ page }}
      </button>
    </template> -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      v-show="page >= startNumAndEndNum.start"
      :key="index"
      @click="pageNoHandler(page)"
      :class="{ active: page === pageNo }"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="pageNoHandler(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo === totalPage" @click="pageNoHandler(pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
import { computed, toRefs, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  setup(props, context) {
    const store = useStore();

    const { pageNo, pageSize, total, continues } = toRefs(props);
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value));

    const startNumAndEndNum = computed(() => {
      let start = 0;
      let end = 0;
      if (totalPage.value < continues.value) {
        start = 1;
        end = totalPage.value;
      } else {
        start = pageNo.value - Math.floor(continues.value / 2);
        end = pageNo.value + Math.floor(continues.value / 2);
      }
      if (start < 1) {
        start = 1;
        end = continues.value;
      }
      if (end > totalPage.value) {
        start = totalPage.value - continues.value + 1;
        end = totalPage.value;
      }
      return { start, end };
    });

    const pageNoHandler = (pageNo) => {
      context.emit("getPageNo", pageNo);
    };

    return {
      totalPage,
      total,
      startNumAndEndNum,
      pageNoHandler,
    };
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
