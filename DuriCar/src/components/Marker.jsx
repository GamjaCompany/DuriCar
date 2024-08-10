import { useEffect } from "react";

function Marker({map, lat, lng, title}) {
    useEffect(() => {
        if (map) {
            new google.maps.marker.AdvancedMarkerElement({
                map,
                position: {lat: 37.4239163, lng: -122.0947209},
                title
            });
        }
    }, [map, lat, lng, title]);

    return null;    // html 객체 렌더링 안함
}

export default Marker;