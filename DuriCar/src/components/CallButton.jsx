import Button from 'react-bootstrap/Button';
import '../style/CallButton.css'

function CallButton() {

    return (
        <Button
            className='callBtn'
            variant='dark'
            size='lg'
        >호출요청</Button>
    )
}

export default CallButton;