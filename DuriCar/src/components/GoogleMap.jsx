import { useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Marker from "./Marker";
import "../style/googleMap.css";


function GoogleMap() {

    const ref = useRef(null);
    const [googleMap, setGoogleMap] = useState();
    const [clickPosition, setClickPosition] = useState({lat:null, lng:null});

    useEffect(() => {
        if (ref.current) {
            const initialMap = new window.google.maps.Map(ref.current, {
                center: {
                    lat: 37.5,
                    lng: 127.0,
                },
                zoom: 16,
                mapId: '47775df8eb56b6df',

                // Standard UI control
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,

                minZoom: 10,
                maxZoom: 18,
            });

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
            {/* {googleMap && (
                <Marker
                    map={googleMap}
                    position={{ 
                            lat: 37.5, 
                            lng: 127.0 
                        }}
                    title="Hello World!"
                />
            )} */}
        </Container>
    );
}

export default GoogleMap;