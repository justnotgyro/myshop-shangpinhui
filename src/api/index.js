import requests from "./request";
import mockRequests from "./mockRequest";

export const reqCategoryList = () => {
  return requests({
    url: "/api/product/getBaseCategoryList",
    method: "GET",
  });
};

export const reqBannerList = () => {
  return mockRequests({
    url: "/banner",
    method: "GET",
  });
};

export const reqFloorList = () => {
  return mockRequests({
    url: "/floor",
    method: "GET",
  });
};

export const reqSearchInfo = (params) => {
  return requests({
    url: "/api/list",
    method: "POST",
    data: params,
  });
};

export const reqGoodsInfo = (skuid) => {
  return requests({
    url: `/api/item/${skuid}`,
    method: "GET",
    data: skuid,
  });
};

export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/api/cart/addToCart/${skuId}/${skuNum}`,
    method: "POST",
  });
};

export const reqCartList = () => {
  return requests({
    url: "/api/cart/cartList",
    method: "GET",
  });
};

export const reqDeleteCartById = (skuId) => {
  return requests({
    url: `/api/cart/deleteCart/${skuId}`,
    method: "DELETE",
  });
};

export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({
    url: `/api/cart/checkCart/${skuId}/${isChecked}`,
    method: "GET",
  });
};

export const reqGetCode = (phone) => {
  return requests({
    url: `/api/user/passport/sendCode/${phone}`,
    method: "GET",
  });
};

export const reqUserRegister = (data) => {
  return requests({
    url: `/api/user/passport/register`,
    method: "POST",
    data,
  });
};
