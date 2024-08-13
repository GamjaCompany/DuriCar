import { useEffect, useState } from 'react'
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { SocketContext } from './components/SocketContext';
import GoogleMap from "./components/GoogleMap"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './style/App.css'
import StatusBar from './components/StatusBar';
import ResultBar from './components/ResultBar';
import FinCard from './components/FinCard';
import socket from './components/Socket';

function App() {
    const [reqest, setReqest] = useState(false);
    const [result, setResult] = useState(false);
    const [displayCard, setDisplayCard] = useState(false);
    // const [carPos, setCarPos] = useState({lat: 37.86832, lng: 127.74315})
    const [conData, setConData] = useState({ trash: 50, plastic: 50, etc: 50 });
    const [prevData, setPrevData] = useState(null);

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
            setConData((prevConData) => {
                const newConData = { trash: msg.trash, plastic: msg.plastic, etc: msg.etc };
                if (!prevData)
                    setPrevData(prevConData);
                return newConData;
            });
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
        

        // return () => {
        //     socket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 해제
        // };
    }, []);

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
            setPrevData(null);
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
                {(reqest) && (<StatusBar conData={conData} handleCall={handleCall} handleCancel={handleCancel} />)}
                {(result) && (<ResultBar conData={conData} handleComplete={handleComplete} />)}
                {(displayCard) && (<FinCard prevData={prevData} conData={conData}/>)}
            </SocketContext.Provider>
        </div>

    )
}

export default App