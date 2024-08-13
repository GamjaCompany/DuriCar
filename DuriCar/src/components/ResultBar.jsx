import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Gauge from './Gauge';
import '../style/ResultBar.css';
import { useRef, useState } from 'react';
import PieChart from './PieChat';

// let dummy = [
//     {
//         "id": "ruby",
//         "label": "ruby",
//         "value": 439,
//         "color": "hsl(35, 70%, 50%)"
//     },
//     {
//         "id": "php",
//         "label": "php",
//         "value": 255,
//         "color": "hsl(315, 70%, 50%)"
//     },
//     {
//         "id": "lisp",
//         "label": "lisp",
//         "value": 408,
//         "color": "hsl(56, 70%, 50%)"
//     },
//     {
//         "id": "c",
//         "label": "c",
//         "value": 562,
//         "color": "hsl(203, 70%, 50%)"
//     },
//     {
//         "id": "stylus",
//         "label": "stylus",
//         "value": 329,
//         "color": "hsl(264, 70%, 50%)"
//     }
// ]

function ResultBar({ socket, handleComplete }) {
    const [conData, setConData] = useState({ trash: 0, plastic: 0, etc: 0});

    const statusBarRef = useRef(null);

    // 쓰레기통 용량 측정
    // socket.on('CDT', (msg) => {
    //     console.log(msg);
    //     setConData({ trash: msg.trash, plastic: msg.plastic, etc: msg.etc})
    // });

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
                                    <Gauge type="일반" value={conData.trash} />
                                    <Gauge type="플라스틱" value={conData.plastic} />
                                    <Gauge type="그외" value={conData.etc} />
                                    {/* <PieChart data={dummy} /> */}
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