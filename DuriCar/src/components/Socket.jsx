import io from "socket.io-client";
const serverUrl = "http://localhost:3000";

const socket = io.connect(`${serverUrl}`, {
    cors: {
        orign: "*"
    }
});

const sendMessage = () => {
    console.log("send")
    socket.emit("send_message", { message: 'Hello' });
};

export default sendMessage;