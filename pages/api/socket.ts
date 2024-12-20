import { Server as SocketIOServer, Socket } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Socket as NetSocket } from 'net'; // For socket typing in Node.js

export interface CustomNextApiResponse extends NextApiResponse {
  socket: NetSocket & {
    server: NetServer;
  };
}

// Define the type for `order` (you can replace `OrderType` with the actual type of the order)
interface OrderType {
  id: string;
  customerName: string;
  amount: number;
}

let io: SocketIOServer | undefined;

const SocketHandler = (req: NextApiRequest, res: CustomNextApiResponse) => {
  if (!io) {
    console.log('Socket is initializing');
    const httpServer: NetServer = res.socket.server; // Typed as NetServer
    io = new SocketIOServer(httpServer, {
      path: '/api/socket', // Custom path
    });

    io.on('connection', (socket: Socket) => {
      console.log('Client connected');
      
      // Use the specific type for `order`
      socket.on('newOrder', (order: OrderType) => {
        io?.emit('newOrder', order);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  } else {
    console.log('Socket already initialized');
  }

  res.end();
};

export default SocketHandler;
