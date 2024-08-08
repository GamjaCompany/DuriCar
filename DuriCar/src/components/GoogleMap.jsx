import { useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/ThemeProvider';
import "../style/googleMap.css";


function GoogleMap() {

    const ref = useRef(null);
    const [googleMap, setGoogleMap] = useState();

    useEffect(() => {
        if (ref.current) {
            const initialMap = new window.google.maps.Map(ref.current, {
                center: {
                    lat: 37.5,
                    lng: 127.0,
                },
                zoom: 16,
            });

            setGoogleMap(initialMap);
        }
    }, []);

    return (
        <Container fluid className="d-flex justify-content-center align-items-center">
            <div id="map" ref={ref} />
        </Container>
    );
}

export default GoogleMap;