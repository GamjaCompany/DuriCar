import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "../style/FinCard.css";

function FinCard({prevData, conData }) {
    return (
        // Gomduri.head
        <Card
            bg='info'
            text="white"
            className="fin w-80 justify-content-center"
        >
            <Card.Header><h2>수거한 품목</h2></Card.Header>
            <Card.Body>
                <Container className='mb-3'>
                    <Row>
                        <Col>
                        <p>일반</p>
                        </Col>
                        <Col>
                        <p>플라스틱</p>
                        </Col>
                        <Col>
                        <p>그외</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <strong>{conData.trash-prevData.trash}g</strong>
                        </Col>
                        <Col>
                        <strong>{conData.plastic-prevData.plastic}g</strong>
                        </Col>
                        <Col>
                        <strong>{conData.etc-prevData.etc}g</strong>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
        // <h2>쓰레기들은 이 곰두리 봇이 <br /> 치울테니 언제나 불러줘~</h2>
    );
}

export default FinCard;