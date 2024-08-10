import { useEffect } from "react";
import "../style/Marker.css";
// const { AdvancedMarkerElement, PinElement } = google.maps.marker;  // Marker에서 사용


function Marker({ user, map, position, title }) {
    useEffect(() => {
        if (map) {
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

            if (user) {
                new google.maps.marker.AdvancedMarkerElement({      // render point
                    map,
                    content: userPin.element,
                    position: { lat: position.lat, lng: position.lng },
                    title: title
                });
            } else {
                new google.maps.marker.AdvancedMarkerElement({      // render point
                    map,
                    content: duriPin,
                    position: { lat: position.lat, lng: position.lng },
                    title: title
                });
            }
        }
    }, [map, position, title]);

    return null;    // html 객체 렌더링 안함
}

export default Marker;