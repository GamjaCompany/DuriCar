import ProgressBar from 'react-bootstrap/ProgressBar';
import "../style/Gauge.css"

function Gauge({ type, value }) {
    const color = () => {
        switch (type) {
            case "일반":
                return "danger";
            case "플라스틱":
                return "info";
            case "그외":
                return "success";
        }
    }
    return (
        <div className='gauge mb-2'>
            <p className='cap'>{type}</p>
            <ProgressBar variant={color()} now={value} />
        </div>
    )
}

export default Gauge;