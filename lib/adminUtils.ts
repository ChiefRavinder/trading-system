// lib/orderUtils.ts
import { Order } from "@/lib/webSocket";

export const filterActiveOrders = (orders: Order[]): Order[] =>
  orders.filter((order) => order.status === "active");

export const filterMatchedOrders = (activeOrders: Order[]): Order[] =>
  activeOrders.filter((order) => {
    const matchingOrders = activeOrders.filter(
      (o) =>
        o.type !== order.type &&
        o.asset === order.asset &&
        ((order.type === "buy" && o.price <= order.price) ||
          (order.type === "sell" && o.price >= order.price))
    );
    return matchingOrders.length > 0;
  });
