import { getTemp1 } from "./get-temp1";
import { getTemp2 } from "./get-temp2";
import { authHandlers } from "./auth";
import { userHandlers } from "./users";
import { companyHandlers } from "./company";
import { productHandlers } from "./products";
import { orderHandlers } from "./orders";
import { commentHandlers } from "./comments";
import { favoriteHandlers } from "./favorites";
import { mediaHandlers } from "./media";
import { notificationHandlers, notificationWsHandlers } from "./notifications";

export const handlers = [
  ...notificationWsHandlers, // WS handler must be registered first
  ...authHandlers,
  ...userHandlers,
  ...companyHandlers,
  ...productHandlers,
  ...orderHandlers,
  ...commentHandlers,
  ...favoriteHandlers,
  ...mediaHandlers,
  ...notificationHandlers,
  getTemp1,
  getTemp2,
];
