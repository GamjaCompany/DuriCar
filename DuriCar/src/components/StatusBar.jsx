import { SocketContext } from './SocketContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Gauge from './Gauge';
import '../style/StatusBar.css';
import { useEffect, useRef, useState, useContext } from 'react';


function StatusBar({ conData, handleCall, handleCancel }) {
    const socket = useContext(SocketContext);
    const statusBarRef = useRef(null);
    const [call, setCall] = useState(false);
    const [visible, setVisible] = useState(true);
    // const [conData, setConData] = useState({ trash: 0, plastic: 0, etc: 0});

    

    // useEffect(() => {
        // socket.on('CDT', (msg) => {
        //     setConData({ trash: msg.trash, plastic: msg.plastic, etc: msg.etc });
        // });

    //     return () => {
    //         socket.off('CDT'); // Clean up
    //     };
    // }, [socket]);

    useEffect(() => {
        if (visible) {
            const handleClickOutside = (e) => {
                if (visible && !statusBarRef.current.contains(e.target) && !e.target.closest('.btn')) {
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

    const handleCallsubmit = () => {
        handleCall();
        setCall(true);
    }

    const handleCancelsubmit = () => {
        handleCancel();
        setCall(false);
    }

    return (
        <>
            <div className='contents w-100 position-absolute' ref={statusBarRef}>
                {(call) && (
                    <Button
                        className='cancelBtn mb-1'
                        variant='secondary'
                        size='lg'
                        onClick={handleCancelsubmit}
                    >호출취소</Button>
                )}
                <Card
                    bg="light"
                    text="dark"
                    className="animate__animated animate__slideInUp w-100"
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
                                            <Gauge type="일반" value={conData.trash} />
                                            <Gauge type="플라스틱" value={conData.plastic} />
                                            <Gauge type="그외" value={conData.etc} />
                                        </div>
                                    </Col>
                                    <Col
                                        xs={5}
                                    >
                                        {(call) && (<div className='speech-bubble mb-2 p-2'>카트가 보이면 <br /> 손을 들어주세요</div>)}
                                        <div className='img'></div>
                                    </Col>
                                </Row>

                            </Container>
                            {(!call) && (
                                <Button
                                    className='justCall btn w-80 mt-2'
                                    variant='dark'
                                    size='lg'
                                    onClick={handleCallsubmit}
                                > 즉시호출 </Button>
                            )}
                        </Card.Body>
                    )}
                </Card>
            </div>
        </>
    );
}

export default StatusBar;