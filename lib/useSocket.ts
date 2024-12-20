import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket'); // Trigger the serverless API

      const socket = io({
        path: '/api/socket', // Match the server's path
      });

      socket.on('connect', () => {
        console.log('Socket connected');
        setIsConnected(true);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });

      socketRef.current = socket;
    };

    socketInitializer();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return { socket: socketRef.current, isConnected };
};
