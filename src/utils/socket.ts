import io from 'socket.io-client';

export const socket = io(process.env.SOCKET_IO_URL as string, {
    transports: ['websocket'],
});
