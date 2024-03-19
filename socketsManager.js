import { Server } from 'socket.io';


export default function initializeSocket(httpServer) {
  const socketServer = new Server(httpServer);


  socketServer.on('connection', async (socket) => {
    console.log("Nuevo cliente conectado");


  });
}