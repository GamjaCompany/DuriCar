import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Gauge from './Gauge';
import '../style/ResultBar.css';
import { useEffect, useRef, useState } from 'react';
import Gomduri from '../assets/img/gomduri.png';

function ResultBar() {
    const [req, setReq] = useState(false);

    const statusBarRef = useRef(null);

    // useEffect(() => {
    //     if (visible) {
    //         const handleClickOutside = (e) => {
    //             if (visible && !statusBarRef.current.contains(e.target)) {
    //                 setCall(call);
    //             }
    //         };

    //         document.addEventListener('click', handleClickOutside);

    //         return () => {
    //             document.removeEventListener('click', handleClickOutside);
    //         };
    //     }
    // }, [call]);

    const handleComplete = () => {  // 버튼 누르면 상위 객체로 useState값 전달해줘야 함
        setReq(true);
    }

    return (
        <div className='contents w-100 position-absolute' ref={statusBarRef}>
            <Card
                bg="light"
                text="dark"
                className="w-100"
            >
                <Card.Header>{/* style */}</Card.Header>
                <Card.Body>
                    <Container>
                        <Row className='resultHeader mb-2'>
                            <Col xs={6}>
                                <div className='camImg rounded-3'>
                                    <img alt='camera' />  {/* upload */}
                                </div>
                            </Col>
                            <Col xs={6}>
                                <h2>곰두리_BOT</h2>
                                <div className='img'></div>
                            </Col>
                        </Row>
                        <Row className='resultInfo'>
                            <Col>
                                <h2>안녕하세요 홍길동 님!</h2>
                                {/* pie graph? */}
                                <div className='graph'>
                                    <Gauge type="일반" value={50} />
                                    <Gauge type="플라스틱" value={50} />
                                    <Gauge type="그외" value={50} />
                                </div>
                            </Col>
                        </Row>

                    </Container>
                    <Button
                        className='complete btn w-80 mt-2'
                        variant='primary'
                        size='lg'
                        onClick={handleComplete}
                    > 처리완료했어요! </Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ResultBar;