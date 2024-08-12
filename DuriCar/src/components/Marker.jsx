import { useEffect, useState } from "react";
import "../style/Marker.css";
// const { AdvancedMarkerElement, PinElement } = google.maps.marker;  // Marker에서 사용


function Marker({ user, map, position, title }) {
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    const [marker, setMarker] = useState(null);

    const isValidPosition = (lat, lng) => {
        const isLatValid = typeof lat === 'number';
        const isLngValid = typeof lng === 'number';
        return isLatValid && isLngValid;
    };

    useEffect(() => {
        const checkGoogleMapsLoaded = () => {
            if (window.google && window.google.maps.marker) {
                setGoogleMapsLoaded(true);
            } else {
                setTimeout(checkGoogleMapsLoaded, 100); // 100ms 간격으로 재시도
            }
        };

        checkGoogleMapsLoaded();
    }, []);
    
    useEffect(() => {
        if (map && googleMapsLoaded) {
            if (!isValidPosition(position.lat, position.lng)) {
                console.error("Invalid position provided:", position);
                return;
            }

            const userPin = new google.maps.marker.PinElement({ // 핀 스타일
                background: "#267CB5",
                borderColor: "#ffffff",
                glyphColor: "white"
            })

            // custom pin
            const duriPin = document.createElement("div");
            duriPin.className = "duriPin";

            // const carPin = new google.maps.marker.PinElement({ // duriPin - legacy 
            //     glyphColor: "white"
            // })

            if (!marker) {
                const newMarker = new google.maps.marker.AdvancedMarkerElement({
                    map,
                    content: user ? userPin.element : duriPin,
                    position: { lat: position.lat, lng: position.lng },
                    title: title
                });
    
                setMarker(newMarker);
            } else {
                marker.position = { lat: position.lat, lng: position.lng };
                marker.title = title;
            }
        }
    }, [map, position, title, googleMapsLoaded]);

    useEffect(() => {
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    return null;    // html 객체 렌더링 안함
}

export default Marker;