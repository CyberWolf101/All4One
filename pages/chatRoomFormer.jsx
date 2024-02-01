import React, { useState, useEffect, useRef } from 'react';
import { UseGetMessage } from '../hooks/useSendMessage';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/auth';
import { UseSendMessage } from '../hooks/useSendMessage';
import { AccountBalanceWalletOutlined, ArrowCircleLeftOutlined, ArrowLeft, Camera, CameraAltOutlined, Cancel, PaymentsOutlined, Remove, Send } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { Fade } from 'react-reveal';
import { Avatar } from '@mui/material';
import { Spinner, useDisclosure } from '@chakra-ui/react';
import { useContext } from 'react';
import { userContext } from '../contexts/userContext';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import SendMoneyModal from '../components/shop/sendMoneyModal';
function ChatRoom() {
    const { senderID, recieverID } = useParams();
    const { user, loading } = useAuth();
    const { getMessages, roomData } = UseGetMessage(senderID, recieverID);
    const [newMessage, setNewMessage] = useState('');
    const { sendMessage } = UseSendMessage();
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
    const { id } = useAuth()
    const chatContainerRef = useRef(null);
    const nav = useNavigate()
    const [loadingSend, setLoadingSend] = useState(false)
    const fileInputRef = useRef(null);
    const [img, setImg] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const [userDetails] = useContext(userContext)
    const { isOpen, onClose, onOpen } = useDisclosure()

    useEffect(() => {
        scroll.scrollToBottom();
        window.scrollTo(100, document.body.scrollHeight);
        setTimeout(() => {
            scroll.scrollToBottom();
        }, 50);

    }, []);



    useEffect(() => {
        getMessages();
        setShouldScrollToBottom(true);
        window.scrollTo(100, document.body.scrollHeight);

    }, [senderID, recieverID, img]);

    const handleSendMessage = async (id) => {
        if (newMessage.trim() !== '' || img) {
            setLoadingSend(true)
            await sendMessage(user.id, recieverID, newMessage, id, img);
            setNewMessage('');
            setSelectedImage(null);
            setImg(null);
            setLoadingSend(false)
            setShouldScrollToBottom(true); // Trigger scroll to bottom when new message is sent
            scroll.scrollToBottom();
        }
    };
    useEffect(() => {
        setShouldScrollToBottom(true); // Trigger scroll to bottom when new message is sent

        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [])

    useEffect(() => {
        // Scroll to the bottom when new messages are added or updated
        if (shouldScrollToBottom && chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            setShouldScrollToBottom(false);
        }
    }, [roomData, shouldScrollToBottom]);

    const handleImageUpload = (e) => {
        const imageFile = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        reader.readAsDataURL(imageFile);
        setImg(imageFile);
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        // Clear the file input value to allow selecting the same file again
        fileInputRef.current.value = '';
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };


    return (
        <div>
            <div ref={chatContainerRef} className='chat-container'>
                {roomData && (
                    <div>
                        <div className=' text-center flex_normal py-3 fixed-top shadow2' style={{ position: 'fixed', background: 'teal', color: 'white' }}>
                            <div className="flex text-white p-1 rounded-pill" >
                                {/* <div className="flex txt-teal p-1 rounded-pill" style={{ position: 'absolute' }}> */}
                                <div onClick={() => nav(-1)}>
                                    <ArrowCircleLeftOutlined />
                                </div>
                            </div>
                            <small>{roomData[0]?.senderID === id ? roomData[0]?.recieverName : roomData[0]?.senderName}</small>
                            <div>
                                <button
                                    className='btn btn-outline-light btn-sm me-1'
                                    onClick={() => onOpen()}
                                >
                                    <AccountBalanceWalletOutlined fontSize='small' />
                                </button>
                            </div>
                        </div>
                        <br />
                        <br />
                        {roomData[0]?.messages
                            ?.slice()
                            .sort((a, b) => a.timestamp - b.timestamp)
                            .map((msg) => (
                                <Fade bottom key={msg.timestamp}>
                                    <div className={`message shadow2 my-4 ${userDetails.id === msg.senderID ? 'owner' : 'receiver'}`}>
                                        <p className='straight'>{
                                            msg.img && (
                                                <img src={msg.img} alt="failed to load image" className='img-fluid' />
                                            )
                                        }
                                        </p>
                                        <p>{msg.text}</p>
                                        
                                        <div className="">
                                            <p className='tiny'>{formatDistanceToNow(msg.timestamp)} ago</p>
                                            {
                                                msg.product_url && (
                                                    <div className='flex straight rounded' style={{ height: '90px', width: '90px', overflow: 'hidden', }}>
                                                        <img src={msg?.product_url} alt="" style={{ height: 'auto', borderRadius: '8px' }} />
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </Fade>
                            ))}
                    </div>
                )}
                {selectedImage && (
                    <div className={`message shadow2 my-receiver`} style={{ position: 'relative', opacity: '0.8' }}>
                        <img
                            src={selectedImage}
                            alt="Selected" style={{ opacity: 0.9 }}

                        />
                        <div
                            onClick={() => {
                                setSelectedImage(null);
                                setImg(null); // Clear the image file as well if needed
                            }}
                            style={{ position: 'absolute', top: '0', width: '100%', }}
                            className='txt-teal'
                        >
                            <Cancel fontSize='large' />

                        </div>
                    </div>
                )
                }
            </div>

            <div className='input-area light shadow2 straight'>
                <div>
                    {/* Button to trigger file input */}
                    <button onClick={handleButtonClick} className='txt-teal'>
                        <CameraAltOutlined />
                    </button>
                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                </div>
                <input
                    type="text"
                    placeholder="Type message..."
                    value={newMessage}
                    className='form-control add-input'
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    className='btn teal add-btn'
                    disabled={loadingSend}
                    onClick={() => handleSendMessage(roomData[0].roomID)}
                >
                    {
                        loadingSend ? <Spinner thickness='3px' emptyColor='gray.300' color='teal.600' /> : <Send />
                    }
                </button>
            </div>

            <SendMoneyModal isOpen={isOpen} onClose={onClose} userDetails={userDetails} senderID={senderID} recieverID={recieverID} roomData={roomData[0]} id={id} />
        </div>
    );
}

export default ChatRoom;
