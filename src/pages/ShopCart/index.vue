<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked === 1"
              @change="updateChecked(`${cartInfo.skuId}`, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">&nbsp;</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">￥{{ cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler(cartInfo.skuId, -1, cartInfo.skuNum)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="
                handler(
                  cartInfo.skuId,
                  0,
                  cartInfo.skuNum,
                  $event.target.value * 1
                )
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler(cartInfo.skuId, 1, cartInfo.skuNum)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum"
              >￥{{ cartInfo.cartPrice * cartInfo.skuNum }}</span
            >
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cartInfo.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="operate">
        <div class="select-all">
          <input
            type="checkbox"
            id="chooseAll"
            :checked="isAllChecked"
            @change="updateAllIsChecked"
          />
          <label for="chooseAll">全选</label>
        </div>
        <div class="option">
          <a @click="deleteAllChecked">删除选中的商品</a>
          <a href="#none">移到我的关注</a>
          <a href="#none">清除下柜商品</a>
        </div>
      </div>
      <div class="money-box">
        <div class="sumInfo">
          <div class="chosed">
            已选择 <span>{{ checkedNum }}</span> 件商品
          </div>
          <div class="sumprice">
            <em>总价（不含运费） ：</em>
            <i class="summoney">￥{{ totalPrice }}</i>
          </div>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ShopCart",
  setup() {
    const store = useStore();
    store.dispatch("cartList");
    const cartInfoList = computed(() => store.getters.cartInfoList);
    const totalPrice = computed(() => {
      let sum = 0;
      cartInfoList.value.forEach((cartInfo) => {
        if (cartInfo.isChecked === 1) {
          sum += cartInfo.cartPrice * cartInfo.skuNum;
        }
      });
      return sum;
    });
    const isAllChecked = computed(() =>
      cartInfoList.value.every((cartInfo) => cartInfo.isChecked === 1)
    );
    const handler = async (skuId, type, value, num) => {
      let skuNum = 0;
      switch (type) {
        case -1:
          // 快速连续点击时数量可以变成负，因为此时网络请求的结果还没返回，所以cartInfo.skuNum没来得及变化，即value没变
          if (value <= 1) {
            return;
          }
          skuNum = -1;
          break;
        case 0:
          // if输入非数字或小于1
          if (isNaN(num) || num < 1 || num % 1 !== 0) {
            skuNum = 0;
          } else {
            skuNum = num - value;
          }

          break;
        case 1:
          skuNum = 1;
          break;
      }
      await store.dispatch("addOrUpdateShopCart", { skuId, skuNum });
      await store.dispatch("cartList");
    };
    const deleteCartById = (skuId) => {
      store
        .dispatch("deleteCartById", skuId)
        .then(() => {
          store.dispatch("cartList");
        })
        .catch((err) => {
          alert(err);
        });
    };
    const updateChecked = async (skuId, e) => {
      let isChecked = e.target.checked ? "1" : "0";
      await store
        .dispatch("updateCheckedById", { skuId, isChecked })
        .then(() => {
          store.dispatch("cartList");
        })
        .catch((err) => {
          alert(err);
        });
    };
    const deleteAllChecked = () => {
      store
        .dispatch("deleteAllChecked")
        .then(() => {
          store.dispatch("cartList");
        })
        .catch((err) => {
          alert(err);
        });
    };
    const updateAllIsChecked = async (e) => {
      let isChecked = e.target.checked ? "1" : "0";
      await store
        .dispatch("updateAllIsChecked", isChecked)
        .then(() => {
          store.dispatch("cartList");
        })
        .catch((err) => {
          alert(err);
        });
    };
    const checkedNum = computed(() => {
      let num = 0;
      cartInfoList.value.forEach((el) => {
        num = el.isChecked === 1 ? num + 1 : num;
      });
      return num;
    });
    return {
      cartInfoList,
      totalPrice,
      isAllChecked,
      handler,
      deleteCartById,
      updateChecked,
      deleteAllChecked,
      updateAllIsChecked,
      checkedNum,
    };
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 20px;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 50%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 32px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    .operate {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .select-all {
        margin-right: 20px;
        margin-bottom: 1px;
        input {
          vertical-align: middle;
        }
        label {
          vertical-align: middle;
        }
      }
      .option {
        a {
          padding-right: 20px;
        }
      }
    }
    .money-box {
      display: flex;
      .sumInfo {
        padding-right: 200px;
        .sumprice {
          .summoney {
            color: #e1251b;
          }
        }
      }
      .sumbtn {
        background-color: #e1251b;
        position: absolute;
        right: 0;
        top: 0;
        width: 96px;
        height: 52px;
        line-height: 52px;
        font-size: 18px;
        text-align: center;
        a {
          color: white;
        }
      }
    }
  }
}
</style>
