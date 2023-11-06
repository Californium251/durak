import io from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL as string, {
    transports: ['websocket'],
});