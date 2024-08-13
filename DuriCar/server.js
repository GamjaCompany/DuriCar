import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*", // 모든 도메인 허용
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
    socket.emit('POS', { lat: 37.86706, lng: 127.74075 });
    socket.emit('CDT', { trash: 30, plastic: 20, etc: 20 });
  }, 1000);

  const cdtInterval = {
    flag: true,
    id: null
  }; // 타이머 ID 초기화

  socket.on('disconnect', () => {
    clearInterval(timerId);
    if (cdtInterval.id) {
      clearInterval(cdtInterval.id); // 연결 종료 시 CDT 타이머 정리
      cdtInterval.flag = false;
    }
    console.log('user disconnected');
  });

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
    // CAN 이벤트 처리
    socket.on('CAN', (msg) => {
      clearTimeout(calId);    // cancel ARR 타이머
      console.log('CAN: ' + msg);
      socket.emit('server', "CANCEL");
    });
  });

  socket.on('FIN', (msg) => {
    if (cdtInterval.flag) {
      cdtInterval.flag = false;
      clearInterval(cdtInterval.id); // CDT 이벤트 타이머 정지
      cdtInterval.id = null; // 타이머 ID 초기화
    }
    cdtInterval.flag = false;
    console.log('FIN: ' + msg);
    socket.emit('server', "COMPLETE");
  });
});


const port = 4000
server.listen(port, '0.0.0.0', () => {
  // console.log(`server running at http://localhost:${port}`);
  console.log(`server running at http://0.0.0.0:${port}`);
});