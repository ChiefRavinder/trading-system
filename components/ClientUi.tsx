"use client";

import { useState } from "react";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTrading, Order } from "@/lib/webSocket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formSchema, createNewOrder } from "@/lib/userUtils";

export default function UserUi() {
  const { orders, addOrder, lastPrice } = useTrading();
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset: "BTC-USDT",
      quantity: 0,
      price: 0,
      expirationType: "duration",
      expirationValue: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newOrder = createNewOrder(values, orderType);
    addOrder(newOrder);
    form.reset();
  }

  return (
    <div className="space-y-8">
      {/* Place New Order Card */}
      <Card className="bg-gray-900 rounded-lg shadow-xl">
        <div className="flex justify-between items-center ">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-blue-400">
              Place New Order
            </CardTitle>
            <CardDescription className="text-gray-300">
              Current BTC-USDT price:{" "}
              {lastPrice ? `$${lastPrice.toFixed(2)}` : "Loading..."}
            </CardDescription>
          </CardHeader>
          <div className="relative w-full max-w-[200px] ">
            <div
              className={`h-10 bg-gray-700 rounded-lg p-1 grid grid-cols-2 ${
                orderType === "buy" ? "text-green-500" : "text-red-500"
              }`}
            >
              <div
                className={`cursor-pointer flex items-center justify-center rounded-md transition-all ${
                  orderType === "buy"
                    ? "bg-gray-800 text-green-500"
                    : "text-gray-400"
                }`}
                onClick={() => setOrderType("buy")}
              >
                Buy
              </div>
              <div
                className={`cursor-pointer flex items-center justify-center rounded-md transition-all ${
                  orderType === "sell"
                    ? "bg-gray-800 text-red-500"
                    : "text-gray-400"
                }`}
                onClick={() => setOrderType("sell")}
              >
                Sell
              </div>
            </div>
          </div>
        </div>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Replace the existing buy/sell buttons with this toggle */}

              {/* Asset Selection */}
              <FormField
                control={form.control}
                name="asset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Asset</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="bg-gray-700 text-white">
                        <SelectTrigger>
                          <SelectValue placeholder="Select an asset" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-700">
                        <SelectItem className="bg-gray-700" value="BTC-USDT">
                          BTC-USDT
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantity Input */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.00000001"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        className="bg-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price Input */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        className="bg-gray-700 text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expiration Type Selection */}
              <FormField
                control={form.control}
                name="expirationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Expiration Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="bg-gray-700 text-white">
                        <SelectTrigger>
                          <SelectValue placeholder="Select expiration type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="duration">Duration</SelectItem>
                        <SelectItem value="datetime">Date and Time</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Expiration Value Input */}
              <FormField
                control={form.control}
                name="expirationValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Expiration</FormLabel>
                    <FormControl>
                      {form.watch("expirationType") === "duration" ? (
                        <Input
                          type="number"
                          placeholder="Duration in seconds"
                          {...field}
                          className="bg-gray-700 text-white"
                        />
                      ) : (
                        <Input
                          type="datetime-local"
                          {...field}
                          className="bg-gray-700 text-white"
                        />
                      )}
                    </FormControl>
                    <FormDescription className="text-white">
                      {form.watch("expirationType") === "duration"
                        ? "Enter duration in seconds"
                        : "Select expiration date and time"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
              >
                Place Order
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Active Orders Card */}
      <Card className="bg-gray-800 rounded-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-400">
            Active Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="text-gray-200">
            <TableCaption>A list of your active orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders
                .filter((order) => order.status === "active")
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.asset}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>${order.price.toFixed(2)}</TableCell>
                    <TableCell>{order.expiration.toLocaleString()}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order History Card */}
      <Card className="bg-gray-800 rounded-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-400">
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="text-gray-200">
            <TableCaption>A list of your order history.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders
                .filter((order) => order.status !== "active")
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.asset}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>${order.price.toFixed(2)}</TableCell>
                    <TableCell>{order.expiration.toLocaleString()}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
