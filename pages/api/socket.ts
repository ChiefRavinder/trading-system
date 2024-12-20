import { Server as SocketIOServer } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';

export interface CustomNextApiResponse extends NextApiResponse {
  socket: any;
}

let io: SocketIOServer | undefined;

const SocketHandler = (req: NextApiRequest, res: CustomNextApiResponse) => {
  if (!io) {
    console.log('Socket is initializing');
    const httpServer: NetServer = res.socket.server as any;
    io = new SocketIOServer(httpServer, {
      path: '/api/socket', // Ensure custom path
    });

    io.on('connection', (socket) => {
      console.log('Client connected');
      
      socket.on('newOrder', (order) => {
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
