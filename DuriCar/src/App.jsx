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
    const [req, setReq] = useState(false);
    const [res, setRes] = useState(false);

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
    socket.on('chat message', (msg) => {
        console.log(msg)
    });

    // btn events
    const handleRequest = () => {
        socket.emit('chat message', "call by client");
        setReq(true);
    }

    const handleResult = () => {
        setReq(false);
        setRes(true);
    }

    return (

        <div className='content'>
            <Wrapper apiKey={import.meta.env.VITE_GOOGLEMAP_KEY} render={render} />
            {(!req) && (
                <Button
                    className='callBtn position-fixed bottom-0 end-0 mb-2 me-2'
                    variant='dark'
                    size='lg'
                    onClick={handleRequest}
                >호출요청</Button>
            )}
            {(req) && (<StatusBar />)}
            {(res) && (<ResultBar />)}
            {/* <div className='tmp' onClick={handleResult}>임시 신호</div> */}
        </div>
    )

    // return <FinCard />;
}

export default App