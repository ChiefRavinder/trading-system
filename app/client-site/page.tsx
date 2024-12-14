"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Schema for order validation
const orderSchema = z.object({
  asset: z.string().nonempty("Asset is required"),
  quantity: z.number().positive("Quantity must be greater than 0"),
  price: z.number().positive("Price must be greater than 0"),
  expirationType: z.enum(["duration", "datetime"]),
  expirationValue: z.union([
    z.string().nonempty("Expiration is required"), // For datetime
    z.number().positive("Duration must be greater than 0"), // For duration
  ]),
});

// Typescript types
type OrderForm = z.infer<typeof orderSchema>;
type Order = {
  id: string;
  asset: string;
  quantity: number;
  price: number;
  expiration: string; // Ensure it's always a string
  status: "Active" | "Completed" | "Canceled";
};

const ClientPage = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Order storage
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const { control, handleSubmit, reset, watch } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      asset: "",
      quantity: 0,
      price: 0,
      expirationType: "duration",
      expirationValue: "",
    },
  });

  const onSubmit = (data: OrderForm) => {
    const expiration =
      data.expirationType === "datetime"
        ? data.expirationValue.toString() // Explicitly convert to string
        : `${data.expirationValue} ${data.expirationType}`; // Convert number + type to string

    const newOrder: Order = {
      id: Date.now().toString(),
      asset: data.asset,
      quantity: data.quantity,
      price: data.price,
      expiration, // Now guaranteed to be a string
      status: "Active",
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    toast.success("Order successfully created!");
    // setResponseMessage("Order placed successfully!");
    reset();
  };

  const handleOrderModification = (
    id: string,
    status: "Completed" | "Canceled"
  ) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
    setResponseMessage(`Order ${status.toLowerCase()}!`);
  };

  const expirationType = watch("expirationType");

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Client Interface</h1>

      {/* Order Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 border p-4 rounded"
      >
        <Controller
          name="asset"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label className="block font-medium">Asset</label>
              <select {...field} className="w-full border rounded p-2">
                <option value="" disabled>
                  Select an asset
                </option>
                <option value="BTC-USDT">BTC-USDT</option>
                <option value="ETH-USDT">ETH-USDT</option>
              </select>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="quantity"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label className="block font-medium">Quantity</label>
              <input
                {...field}
                type="number"
                onChange={(e) => field.onChange(e.target.valueAsNumber)} // Convert to number
                className="w-full border rounded p-2"
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label className="block font-medium">Price</label>
              <input
                {...field}
                type="number"
                onChange={(e) => field.onChange(e.target.valueAsNumber)} // Convert to number
                className="w-full border rounded p-2"
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="expirationType"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block font-medium">Expiration Type</label>
              <select {...field} className="w-full border rounded p-2">
                <option value="duration">Duration</option>
                <option value="datetime">Specific Date/Time</option>
              </select>
            </div>
          )}
        />

        <Controller
          name="expirationValue"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label className="block font-medium">
                {expirationType === "datetime"
                  ? "Specific Date/Time"
                  : "Duration"}
              </label>
              {expirationType === "datetime" ? (
                <input
                  {...field}
                  type="datetime-local"
                  className="w-full border rounded p-2"
                />
              ) : (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter duration"
                  className="w-full border rounded p-2"
                />
              )}
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Place Order
        </button>
      </form>

      {/* Response Message */}
      {responseMessage && (
        <p className="mt-4 text-green-600">{responseMessage}</p>
      )}

      {/* Active Orders Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Active Orders</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Asset</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Expiration</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) => order.status === "Active")
              .map((order) => (
                <tr key={order.id}>
                  <td className="border p-2">{order.asset}</td>
                  <td className="border p-2">{order.quantity}</td>
                  <td className="border p-2">{order.price}</td>
                  <td className="border p-2">{order.expiration}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() =>
                        handleOrderModification(order.id, "Completed")
                      }
                      className="bg-green-500 text-white p-1 rounded"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() =>
                        handleOrderModification(order.id, "Canceled")
                      }
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Order History Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Order History</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Asset</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Expiration</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) => order.status !== "Active")
              .map((order) => (
                <tr key={order.id}>
                  <td className="border p-2">{order.asset}</td>
                  <td className="border p-2">{order.quantity}</td>
                  <td className="border p-2">{order.price}</td>
                  <td className="border p-2">{order.expiration}</td>
                  <td className="border p-2">{order.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ClientPage;
