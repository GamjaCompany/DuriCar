import { useState } from 'react'
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "./components/GoogleMap"
import CallButton from "./components/CallButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/App.css'

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
                    <CallButton />
                </div>
            )
    }
};

function App() {
    return (
        <>
            <Wrapper apiKey={import.meta.env.VITE_GOOGLEMAP_KEY} render={render} />
        </>
    )
}

export default App