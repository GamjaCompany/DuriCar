import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*", // all-domains allowed
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('<h1>TEMP BICONNECTION SERVER</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // car position
  const timerId = setInterval(() => {
    socket.emit('POS', { lat: 37.86799, lng: 127.74232 });
    socket.emit('CDT', { trash: 20, plastic: 20, etc: 20 });
  }, 1000);

  socket.on('disconnect', () => {
    clearInterval(timerId);
    console.log('user disconnected');
  });

  // cli->svr events
  socket.on('REQ', (msg) => {
    console.log('REQ: ' + msg);
    socket.emit('server', "REQEST");
  });

  socket.on('CAL', (msg) => {
    console.log('CAL: ' + msg);
    socket.emit('server', "CALL");

    const calId = setTimeout(() => {
      socket.emit('ARR', "ARRIVED");
    }, 3000); // test tine: 3s

    // CAN 이벤트 처리
    socket.on('CAN', (msg) => {
      clearTimeout(calId);    // cancel
      console.log('CAN: ' + msg);
      socket.emit('server', "CANCEL");
    });
  });

  socket.on('FIN', (msg) => {
    console.log('FIN: ' + msg);
    socket.emit('server', "COMPLETE");
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});