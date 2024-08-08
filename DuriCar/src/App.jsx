import { Status, Wrapper } from "@googlemaps/react-wrapper";
import GoogleMap from "./components/GoogleMap"

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <GoogleMap />
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