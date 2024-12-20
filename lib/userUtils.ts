import * as z from 'zod';
import { Order } from '@/lib/webSocket';

export const formSchema = z.object({
  asset: z.string().min(1, { message: "Asset is required" }),
  quantity: z.number().positive({ message: "Quantity must be positive" }),
  price: z.number().positive({ message: "Price must be positive" }),
  expirationType: z.enum(["duration", "datetime"]),
  expirationValue: z.string().min(1, { message: "Expiration is required" }),
});

export function createNewOrder(
  values: z.infer<typeof formSchema>,
  orderType: 'buy' | 'sell'
): Order {
  const expiration =
    values.expirationType === 'duration'
      ? new Date(Date.now() + parseInt(values.expirationValue) * 1000)
      : new Date(values.expirationValue);

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: orderType,
    asset: values.asset,
    quantity: values.quantity,
    price: values.price,
    expiration,
    status: 'active',
  };
}
