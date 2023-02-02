import { nanoid } from "nanoid";
const getNanoid = () => {
  let guestId = localStorage.getItem("GUESTID");
  if (!guestId) {
    guestId = localStorage.setItem("GUESTID", nanoid());
  }
  return guestId;
};

getNanoid();
