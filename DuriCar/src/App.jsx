import { useEffect, useState } from 'react'
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { SocketContext } from './components/SocketContext';
import GoogleMap from "./components/GoogleMap"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.css'
import StatusBar from './components/StatusBar';
import ResultBar from './components/ResultBar';
import { io } from 'socket.io-client';
import FinCard from './components/FinCard';

const socket = io(`http://localhost:3000`, {
    cors: {
        orign: "*"
    }
});

function App() {
    const [reqest, setReqest] = useState(false);
    const [result, setResult] = useState(false);
    const [displayCard, setDisplayCard] = useState(false);
    // const [carPos, setCarPos] = useState({lat: 37.86832, lng: 127.74315}) const [conData, setConData] = useState({ trash: 0, plastic: 0, etc: 0 });

    // server-client setting
    // const [message, setMessage] = useState("");

    // const socket = io(`http://192.168.0.188:3000`, {
    //     cors: {
    //         orign: "*"
    //     }
    // });

    // dummy serverUrl

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // server calls
        socket.on('server', (msg) => {
            console.log(msg);
        });
        socket.on('CDT', (msg) => {
            console.log(msg);
        });
        socket.on('ARR', (msg) => {
            console.log(msg);
            handleArrived();
        });
        // socket.on('POS', (msg) => {     // 로봇 위치
        //     // console.log("lat: "+msg.lat);
        //     // console.log("lng: "+msg.lng);
        //     setCarPos({ lat: msg.lat, lng: msg.lng });
        // });

        return () => {
            socket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
        };
    }, []); // 빈 배열을 주어 한 번만 실행되도록 설정

    const render = (status) => {
        switch (status) {
            case Status.LOADING:
                return <p>로딩중...</p>;
            case Status.FAILURE:
                return <p>에러 발생</p>;
            case Status.SUCCESS:
                google.maps.importLibrary('marker');
                return (
                    <div className="mapWrapper">
                        <GoogleMap />
                    </div>
                )
            default:
                return null;
        }
    };

    // 호출 도착하면 실행
    // server -> ARR
    const handleArrived = () => {
        setReqest(false);
        setResult(true);
    }

    // btn events
    // REQ
    const handleRequest = () => {
        socket.emit('REQ', "Focus by client");
        setReqest(true);
    }

    // CAL
    const handleCall = () => {
        socket.emit('CAL', "calling...");
    }

    // CAN
    const handleCancel = () => {
        socket.emit('CAN', "canceled");
    }

    // FIN
    const handleComplete = () => {
        socket.emit('FIN', "Completed!");
        setResult(false);
        setDisplayCard(true);
        setTimeout(() => {
            closeCard();
            console.log("fincard");
        }, 3000);
    }

    // close fincard
    const closeCard = () => {
        setDisplayCard(false);
    }

    return (

        <div className='content'>
            <SocketContext.Provider value={socket}>
                <Wrapper apiKey={import.meta.env.VITE_GOOGLEMAP_KEY} render={render} />
                {(!reqest) && (
                    <Button
                        className='callBtn position-fixed bottom-0 end-0 mb-2 me-2'
                        variant='dark'
                        size='lg'
                        onClick={handleRequest}
                    >호출요청</Button>
                )}
                {(reqest) && (<StatusBar handleCall={handleCall} handleCancel={handleCancel} />)}
                {(result) && (<ResultBar handleComplete={handleComplete} />)}
                {(displayCard) && (<FinCard />)}
                {/* <div className='tmp' onClick={handleResult}>임시 신호</div> */}
            </SocketContext.Provider>
        </div>

    )

    // return <FinCard />;
}

export default App