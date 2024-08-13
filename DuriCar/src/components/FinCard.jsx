import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../style/FinCard.css';

function FinCard({ prevData, conData }) {
    return (
        <Container className="d-flex justify-content-center animate__backInUp">
            <Card
                bg='info'
                text="white"
                className="fin animate__animated animate__fadeIn"
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
                                <strong>{conData.trash - prevData.trash}g</strong>
                            </Col>
                            <Col>
                                <strong>{conData.plastic - prevData.plastic}g</strong>
                            </Col>
                            <Col>
                                <strong>{conData.etc - prevData.etc}g</strong>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default FinCard;
