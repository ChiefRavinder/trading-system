"use client";

import { useTrading, Order } from "@/lib/webSocket";
import { filterActiveOrders, filterMatchedOrders } from "@/lib/adminUtils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminUi() {
  const { orders, updateOrder } = useTrading();

  const handleAccept = (order: Order) => {
    updateOrder(order.id, { status: "filled" });
  };

  const handleReject = (order: Order) => {
    updateOrder(order.id, { status: "cancelled" });
  };

  const activeOrders = filterActiveOrders(orders);
  const matchedOrders = filterMatchedOrders(activeOrders);

  return (
    <div className="space-y-8">
      {/* Match Opportunities */}
      <Card className="bg-gray-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-400 text-2xl font-semibold">
            Match Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full text-left border-separate border-spacing-y-3">
            <TableCaption className="text-gray-400">
              A list of potential trade matches.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-800">
                <TableHead className="text-purple-400">Type</TableHead>
                <TableHead className="text-purple-400">Asset</TableHead>
                <TableHead className="text-purple-400">Quantity</TableHead>
                <TableHead className="text-purple-400">Price</TableHead>
                <TableHead className="text-purple-400">Expiration</TableHead>
                <TableHead className="text-purple-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matchedOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="bg-green-800 hover:bg-green-700 transition-colors"
                >
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.asset}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.price.toFixed(2)}</TableCell>
                  <TableCell>{order.expiration.toLocaleString()}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      onClick={() => handleAccept(order)}
                      className="bg-blue-500 hover:bg-blue-400 text-white"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleReject(order)}
                      className="bg-red-500 hover:bg-red-400 text-white"
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* All Active Orders */}
      <Card className="bg-gray-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-400 text-2xl font-semibold">
            All Active Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full text-left border-separate border-spacing-y-3">
            <TableCaption className="text-gray-400">
              A list of all active orders.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-800">
                <TableHead className="text-purple-400">Type</TableHead>
                <TableHead className="text-purple-400">Asset</TableHead>
                <TableHead className="text-purple-400">Quantity</TableHead>
                <TableHead className="text-purple-400">Price</TableHead>
                <TableHead className="text-purple-400">Expiration</TableHead>
                <TableHead className="text-purple-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.asset}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.price.toFixed(2)}</TableCell>
                  <TableCell>{order.expiration.toLocaleString()}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      onClick={() => handleAccept(order)}
                      className="bg-blue-500 hover:bg-blue-400 text-white"
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleReject(order)}
                      className="bg-red-500 hover:bg-red-400 text-white"
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card className="bg-gray-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-400 text-2xl font-semibold">
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full text-left border-separate border-spacing-y-3">
            <TableCaption className="text-gray-400">
              A list of all settled orders.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-800">
                <TableHead className="text-purple-400">Type</TableHead>
                <TableHead className="text-purple-400">Asset</TableHead>
                <TableHead className="text-purple-400">Quantity</TableHead>
                <TableHead className="text-purple-400">Price</TableHead>
                <TableHead className="text-purple-400">Expiration</TableHead>
                <TableHead className="text-purple-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders
                .filter((order) => order.status !== "active")
                .map((order) => (
                  <TableRow
                    key={order.id}
                    className="bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.asset}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>${order.price.toFixed(2)}</TableCell>
                    <TableCell>{order.expiration.toLocaleString()}</TableCell>
                    <TableCell className="capitalize">{order.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
