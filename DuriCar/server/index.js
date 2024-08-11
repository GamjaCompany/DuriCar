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

// const __dirname = dirname(fileURLToPath(import.meta.url)); //file send

app.get('/', (req, res) => {
  res.send('<h1>TEMP BICONNECTION SERVER</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

// cli->svr events
  socket.on('REQ', (msg) => {
    console.log('REQ: ' + msg);
    socket.emit('server',"REQEST");
  });
  socket.on('CAL', (msg) => {
    console.log('CAL: ' + msg);
    socket.emit('server', "CALL");
    // setTimeout(socket.emit('ARR', "ARRIVED"), 100)
  });

  socket.on('CAN', (msg) => {
    console.log('CAN: ' + msg);
    socket.emit('server', "CANCEL");
  });
  socket.on('FIN', (msg) => {
    console.log('FIN: ' + msg);
    socket.emit('server', "COMPLETE");
  });

});
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});