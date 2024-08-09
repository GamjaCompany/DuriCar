import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
                            xs={8}
                        >
                            <h2>곰두리_BOT</h2>
                            <div className='graph'>
                                <p>일반</p>
                                {/* 일반 게이지 */}
                                <p>플라스틱</p>
                                {/* 플라스틱 게이지 */}
                                <p>그외</p>
                                {/* 그외 */}
                            </div>
                        </Col>
                        <Col 
                            xs={4}
                        >
                            <div className='img'>image</div>
                        </Col>
                    </Row>

                </Container>
                <Button
                    className='justCall btn w-80'
                    variant='dark'
                    size='lg'
                > 즉시호출 </Button>
            </Card.Body>
        </Card>
    );
}

export default StatusBar;