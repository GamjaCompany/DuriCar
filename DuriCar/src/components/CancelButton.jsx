import Button from 'react-bootstrap/Button';
import '../style/CancelButton.css'

function CancelButton() {

    return (
        <Button
            className='cancelBtn'
            variant='secondary'
            size='lg'
        >호출취소</Button>
    )
}

export default CancelButton;