import { useEffect } from "react";
// const { AdvancedMarkerElement, PinElement } = google.maps.marker;  // Marker에서 사용


function Marker({ type, map, position, title }) {
    useEffect(() => {
        if (map) {
            const pin = new google.maps.marker.PinElement({ // 핀 스타일
                background: "#267CB5",
                borderColor: "#ffffff",
                glyphColor: "white"
            })

            new google.maps.marker.AdvancedMarkerElement({      // render point
                map,
                content: pin.element,
                position: { lat: position.lat, lng: position.lng },
                title: title
            });
        }
    }, [map, position, title]);

    return null;    // html 객체 렌더링 안함
}

export default Marker;