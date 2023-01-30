<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑之商品分类 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 面包屑之关键字 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 面包屑之品牌 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 面包屑之商品性质 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isActive }" @click="changeOrder('1')">
                  <a
                    >综合
                    <span v-show="isActive">{{ isDesc ? "↓" : "↑" }}</span></a
                  >
                </li>
                <li :class="{ active: !isActive }" @click="changeOrder('2')">
                  <a
                    >价格
                    <span v-show="!isActive">{{ isDesc ? "↓" : "↑" }}</span></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`detail/${good.id}`"
                      ><img :src="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- pagination -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    // 为啥这里不直接把属性赋为动态值??....
    const searchParams = reactive({
      category1Id: "",
      category2Id: "",
      category3Id: "",
      categoryName: "",
      keyword: "",
      order: `1:desc`,
      pageNo: 1,
      pageSize: 10,
      props: [],
      trademark: "",
    });
    const store = useStore();

    Object.assign(searchParams, route.query, route.params);
    store.dispatch("searchList", searchParams);
    const goodsList = computed(() => store.getters.goodsList);
    watch(
      route,
      () => {
        // 因为三级分类属性可以共存，但是只需要一个，所以要清空
        // 而需要的那一级分类来自于路由的query参数
        searchParams.category1Id = undefined;
        searchParams.category2Id = undefined;
        searchParams.category3Id = undefined;
        searchParams.pageNo = 1;
        Object.assign(searchParams, route.query, route.params);
        store.dispatch("searchList", searchParams);
      },
      {
        deep: true,
        immediate: true,
      }
    );

    // 总之无论是移除categoryName还是移除keyword都需要跳转路由
    const removeCategoryName = () => {
      // 为了清除面包屑的数据，需要removeCategoryName
      // searchParams.category1Id = undefined;
      // searchParams.category2Id = undefined;
      // searchParams.category3Id = undefined;
      searchParams.categoryName = undefined;
      // 这句可以不写的，因为路由变化会自动派发该事件
      // store.dispatch("searchList", searchParams);
      router.push({ name: "search", params: route.params });
    };

    const removeKeyword = () => {
      searchParams.keyword = undefined;
      router.push({ name: "search", query: route.query });
    };

    const trademarkInfo = (trademark) => {
      searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 点击品牌后路由没跳转但是面包屑多了
      store.dispatch("searchList", searchParams);
    };

    const removeTrademark = () => {
      searchParams.trademark = undefined;
      store.dispatch("searchList", searchParams);
    };

    const attrInfo = (attr, attrValue) => {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      searchParams.props.push(props);
      searchParams.props = [...new Set(searchParams.props)];
      store.dispatch("searchList", searchParams);
    };

    const removeAttr = (index) => {
      searchParams.props.splice(index, 1);
      // 写到这里的时候有个疑惑，就是改变searchParams的数据之后如果不派发事件,面包屑就不变
      // 后来试了一下，发现加上reactive(searchParams)后就可以了，推测是响应式的原因
      // 所以为什么派发事件可以把数据变成响应式的？
      // setTimeout(() => {
      //   store.dispatch("searchList", searchParams);
      // }, 2000);
      // 用定时器测试了一下发现在2秒后面包屑变化了，说明面包屑的变化依赖于网络请求回来的数据？
      // 而非searchParams.props
      store.dispatch("searchList", searchParams);
    };

    const isActive = computed(() => searchParams.order.indexOf("1") != -1);
    const isDesc = computed(() => searchParams.order.indexOf("desc") != -1);

    // 通过点击事件获取当前的排序方式和方向
    // 总之点击事件要么换方式（且换方式后一定为综合降序和价格升序）要么换方向
    // 点击的flag与order不一致时，换方式
    // 点击的flag与order一致时，换方向
    // 且发送网络请求只需要最后的order值
    const changeOrder = (flag) => {
      if (flag === searchParams.order.split(":")[0]) {
        // 换方向
        if (isDesc.value) {
          // 这个地方忘记写.value所以永远判断为真！！！！！
          searchParams.order = `${flag}:asc`;
        } else {
          searchParams.order = `${flag}:desc`;
        }
      } else {
        // 换方式
        if (flag === "2") {
          searchParams.order = `2:asc`;
        } else {
          searchParams.order = `1:desc`;
        }
      }
      store.dispatch("searchList", searchParams);
    };

    const total = computed(() => store.state.search.searchList.total);
    const getPageNo = (pageNo) => {
      searchParams.pageNo = pageNo;
      store.dispatch("searchList", searchParams);
    };

    return {
      goodsList,
      searchParams,
      removeCategoryName,
      removeKeyword,
      trademarkInfo,
      removeTrademark,
      attrInfo,
      removeAttr,
      isActive,
      isDesc,
      changeOrder,
      total,
      getPageNo,
    };
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
