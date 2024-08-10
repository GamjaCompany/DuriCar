import { useEffect } from "react";

function Marker({map, position, title}) {
    useEffect(() => {
        if (map) {
            new window.google.maps.Marker({
                position,
                map,
                title,
            });
        }
    }, [map, position, title]);

    return null;    // html 객체 렌더링 안함
}

export default Marker;