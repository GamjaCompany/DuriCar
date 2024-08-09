import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Gauge from './Gauge';
import '../style/StatusBar.css';
import { useEffect, useRef, useState } from 'react';
import Gomduri from '../assets/img/gomduri.png';

function StatusBar() {
    const [call, setCall] = useState(false);
    const [visible, setVisible] = useState(true);

    const statusBarRef = useRef(null);

    useEffect(() => {
        if (visible) {
            const handleClickOutside = (e) => {
                if (visible && !statusBarRef.current.contains(e.target)) {
                    setVisible(false);
                }
            };

            document.addEventListener('click', handleClickOutside);

            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    }, [visible]);

    const handleClickHeader = () => {
        setVisible(true);
    }

    const handleCall = () => {
        setCall(true);
    }

    const handleCancel = () => {
        setCall(false);
    }

    return (
        <div className='contents w-100 position-absolute' ref={statusBarRef}>
            {(call) && (
                <Button
                    className='cancelBtn mb-1'
                    variant='secondary'
                    size='lg'
                    onClick={handleCancel}
                >호출취소</Button>
            )}
            <Card
                bg="light"
                text="dark"
                className="w-100"
            >
                <Card.Header onClick={handleClickHeader}>{/* style */}</Card.Header>
                {(visible) && (
                    <Card.Body>
                        <Container>
                            <Row className='detailInfo'>
                                <Col
                                    xs={7}
                                >
                                    <h2>곰두리_BOT</h2>
                                    <div className='graph'>
                                        <Gauge type="일반" value={50} />
                                        <Gauge type="플라스틱" value={50} />
                                        <Gauge type="그외" value={50} />
                                    </div>
                                </Col>
                                <Col
                                    xs={5}
                                >
                                    <div className='speech-bubble mb-2 p-2'>카트가 보이면 <br/> 손을 들어주세요</div>
                                    <div className='img'></div>
                                </Col>
                            </Row>

                        </Container>
                        {(!call) && (
                            <Button
                                className='justCall btn w-80 mt-2'
                                variant='dark'
                                size='lg'
                                onClick={handleCall}
                            > 즉시호출 </Button>
                        )}
                    </Card.Body>
                )}
            </Card>
        </div>
    );
}

export default StatusBar;