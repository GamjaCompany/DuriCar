import { io } from 'socket.io-client';

const socket = io(`http://localhost:3000`, {
    cors: {
        origin: "*"
    }
});

    // const socket = io(`http://192.168.0.188:3000`, {
    //     cors: {
    //         orign: "*"
    //     }
    // });

export default socket;