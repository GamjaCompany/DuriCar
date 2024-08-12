import { useEffect, useState } from 'react'
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "./components/GoogleMap"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.css'
import StatusBar from './components/StatusBar';
import ResultBar from './components/ResultBar';
import { io } from 'socket.io-client';
import FinCard from './components/FinCard';

function App() {
    const [reqest, setReqest] = useState(false);
    const [result, setResult] = useState(false);
    const [displayCard, setDisplayCard] = useState(false);

    // server-client setting
    const [message, setMessage] = useState("");

    // dummy serverUrl
    const socket = io(`http://localhost:3000`, {
        cors: {
            orign: "*"
        }
    });

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

    // server calls
    socket.on('server', (msg) => {
        console.log(msg);
    });
    socket.on('ARR', (msg) => {
        console.log(msg)
        handleArrived();
    });
    socket.on('POS', (msg) => {     // 현위치
        console.log(msg)
        handleArrived();
    });

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
            <Wrapper apiKey={import.meta.env.VITE_GOOGLEMAP_KEY} render={render} />
            {(!reqest) && (
                <Button
                    className='callBtn position-fixed bottom-0 end-0 mb-2 me-2'
                    variant='dark'
                    size='lg'
                    onClick={handleRequest}
                >호출요청</Button>
            )}
            {(reqest) && (<StatusBar handleCall={handleCall} handleCancel={handleCancel}/>)}
            {(result) && (<ResultBar handleComplete={handleComplete} />)}
            {(displayCard) && (<FinCard />)}
            {/* <div className='tmp' onClick={handleResult}>임시 신호</div> */}
        </div>
    )

    // return <FinCard />;
}

export default App