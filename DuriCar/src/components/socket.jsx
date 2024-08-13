import { io } from 'socket.io-client';

const socket = io(`http://localhost:4000`, {
    cors: {
        origin: "*"
    }
});

// const socket = io(`http://192.168.0.188:3000`, {
//     cors: {
//         orign: "*"
//     }
// });

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

export default socket;