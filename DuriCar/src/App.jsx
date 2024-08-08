import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "./components/GoogleMap"
import './App.css'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const render = (status) => {
    switch (status) {
        case Status.LOADING:
            return <p>로딩중...</p>;
        case Status.FAILURE:
            return <p>에러 발생</p>;
        case Status.SUCCESS:
            return (
                <div className="mapWrapper">
                    <GoogleMap />
                </div>
            )
    }
};

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Wrapper apiKey={import.meta.env.VITE_GOOGLEMAP_KEY} render={render} />
        </>
    )
}

export default App