import { useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Marker from "./Marker";
import "../style/GoogleMap.css";

function GoogleMap({socket}) {

    const ref = useRef(null);
    const [googleMap, setGoogleMap] = useState();
    const [clickPosition, setClickPosition] = useState({ lat: null, lng: null });
    const [carPos, setCarPos] = useState({lat: 37, lng: 127})

    socket.on('POS', (msg) => {     // 로봇 위치
        // console.log("lat: "+msg.lat);
        // console.log("lng: "+msg.lng);
        setCarPos({lat: msg.lat, lng: msg.lng});
    });
    
    useEffect(() => {
        if (ref.current) {
            const initialMap = new window.google.maps.Map(ref.current, {
                center: {       // 초기 위치 대운동장
                    // 정보 저장 소수점 아래 5자리
                    lat: 37.86832,
                    lng: 127.74315
                },
                zoom: 18,
                mapId: '47775df8eb56b6df',

                // Standard UI control
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false
            });

            // check click position
            initialMap.addListener("click", (event) => {
                const lat = event.latLng.lat();
                const lng = event.latLng.lng();
                setClickPosition({ lat, lng }); // 클릭한 위치의 위도와 경도를 상태에 저장
                console.log("Clicked location:", { lat, lng }); // 콘솔에 출력
            });

            setGoogleMap(initialMap);
        }

    }, []);

    return (
        <Container fluid="xs" className="d-flex justify-content-center align-items-center">
            <div id="map" ref={ref} />
            {googleMap && (
                <>
                    <Marker
                        user={1}
                        map={googleMap}
                        position={{
                            lat: 37.86832,
                            lng: 127.74315
                        }}
                        title="My position"
                    />
                    {/* <Marker
                        user={0}
                        map={googleMap}
                        position={{
                            lat: 37.86881,
                            lng: 127.74305
                        }}
                        title="Car1"
                    /> */}
                    <Marker
                        user={0}
                        map={googleMap}
                        position={carPos}
                        title="Car2"
                    />
                </>
            )} 
        </Container>
    );
}

export default GoogleMap;