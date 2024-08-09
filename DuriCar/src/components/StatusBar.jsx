import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Gauge from './Gauge';
import '../style/StatusBar.css';

function StatusBar() {
    return (
        <Card
            bg="light"
            text="dark"
            style={{ width: '18rem' }}
            className="w-100"
        >
            <Card.Header>{/* style */}</Card.Header>
            <Card.Body>
                <Container>
                    <Row className='detailInfo'>
                        <Col
                            xs={7}
                        >
                            <h2>곰두리_BOT</h2>
                            <div className='graph'>
                                <Gauge type="일반" value={50}/>
                                <Gauge type="플라스틱" value={50}/>
                                <Gauge type="그외" value={50}/>
                            </div>
                        </Col>
                        <Col 
                            xs={5}
                        >
                            <div className='img'>image</div>
                        </Col>
                    </Row>

                </Container>
                <Button
                    className='justCall btn w-80 mt-2'
                    variant='dark'
                    size='lg'
                > 즉시호출 </Button>
            </Card.Body>
        </Card>
    );
}

export default StatusBar;