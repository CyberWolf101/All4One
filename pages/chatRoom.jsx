import { AccountBalance, AccountBalanceWallet, AccountBalanceWalletOutlined, ArrowBackIos, CameraAltOutlined, Cancel, Send, WalletOutlined } from '@mui/icons-material';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchChatHistory } from '../hook/useChat';
import { userContext } from '../contexts/userContext';
import MildSpiner from '../components/partials/mildSpiner';
import NewRoom from '../components/chat/newRoom';
import RoomExist from '../components/chat/roomExist';
import { io } from 'socket.io-client';
import SendMoneyModal from '../components/chat/sendMoneyModal';
import { useDisclosure } from '@chakra-ui/react';
import SelectedFile from '../components/chat/selectedFile';
import Axios from 'axios';

function ChatRoom() {
    const { senderID, receiverID, receiverUserName } = useParams();
    const [message, setMessage] = useState('');
    const [userDetails] = useContext(userContext);
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const [showChatRoom, setShowChatRoom] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isVideoModalOpen, setVideoModalOpen] = useState(false);
    // const [selectedVideoSrc, setSelectedVideoSrc] = useState('');
    const [selectedVideoSrc, setSelectedVideoSrc] = useState([]);

    const [chatHistory, setChatHistory] = useState({
        messages: [],
    });
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isOpen, onClose, onOpen } = useDisclosure()
    const url = 'http://localhost:4000/';

    const { loading: loadingChat, error: chatError } = useFetchChatHistory(
        senderID,
        receiverID,
        setShowChatRoom,
        setChatHistory
    );
    const chatContainerRef = useRef(null);



    const sendMessage1 = async () => {
        if (message.trim() === '' && !file) return;
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${url}chats/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: senderID,
                    receiverId: receiverID,
                    text: message,
                    senderUserName: userDetails.userName,
                    receiverUserName: receiverUserName,
                    dpUrl: userDetails.dpUrl,
                    timestamp: Date.now(),
                    files: file,  // Add files array directly to the JSON payload
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            socket.emit('newMessage', {
                senderId: senderID,
                receiverId: receiverID,
                text: message,
                senderUserName: userDetails.userName,
                receiverUserName: receiverUserName,
                dpUrl: userDetails.dpUrl,
                timestamp: Date.now(),
            });

            const data = await response.json();
            setChatHistory(data.chat);
            setMessage('');

            if (!showChatRoom) {
                setShowChatRoom(true);
            }
        } catch (error) {
            setError(error.message || 'Failed to send message');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (message.trim() === '' && (!file || file.length === 0)) return; // Do not send empty messages

        try {
            setLoading(true);
            setError(null);

            // Create a FormData object to send both JSON data and files
            const formData = new FormData();

            // Append JSON data to the FormData object
            formData.append('senderId', senderID);
            formData.append('receiverId', receiverID);
            formData.append('text', message);
            formData.append('senderUserName', userDetails.userName);
            formData.append('receiverUserName', receiverUserName);
            formData.append('dpUrl', userDetails.dpUrl);
            formData.append('timestamp', Date.now());


            if (file) {
                for (let i = 0; i < file.length; i++) {
                    formData.append("files", file[i]);
                }
            }
            // Send the combined FormData object
            const response = await fetch(`${url}chats/send-message`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            socket.emit('newMessage', {
                senderId: senderID,
                receiverId: receiverID,
                text: message,
                senderUserName: userDetails.userName,
                receiverUserName: receiverUserName,
                dpUrl: userDetails.dpUrl,
                timestamp: Date.now(),
            });

            const data = await response.json();
            setChatHistory(data.chat);
            setMessage('');
            setFile(null)
            setVideoModalOpen(false)
            setSelectedVideoSrc([])
            setSelectedImage(null)
            setSelectedImages([])
            if (!showChatRoom) {
                setShowChatRoom(true);
            }
        } catch (error) {
            setError(error.message || 'Failed to send message');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchSocket = async () => {
            try {
                const socketInstance = await io.connect('http://localhost:4000', {
                    query: {
                        userId: userDetails._id,
                    },
                });
                setSocket(socketInstance);

                socketInstance.on('connect', () => {
                    console.log('Socket connected:', socketInstance.id);
                });

                socketInstance.on('recieve_message', (chat) => {
                    setChatHistory((prevChatHistory) => ({
                        ...prevChatHistory,
                        messages: [...prevChatHistory.messages, chat],
                    }));
                });

                socketInstance.on('disconnect', () => {
                    console.log('Socket disconnected');
                });

                return () => {
                    socketInstance.disconnect();
                };
            } catch (error) {
                console.error('Error connecting to Socket.io:', error);
            }
        };

        fetchSocket();
    }, [userDetails._id]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, file, selectedImage, selectedImages, selectedVideoSrc]);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };





    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const newSelectedFiles = files.map((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (file.type.startsWith('image/')) {
                    setSelectedImages((prevSelectedImages) => [...prevSelectedImages, reader.result]);
                } else if (file.type.startsWith('video/')) {
                    setVideoModalOpen(true);
                    setSelectedVideoSrc((prevSelectedVideoSrc) => [...prevSelectedVideoSrc, reader.result]);
                }
            };

            reader.readAsDataURL(file);
            return file;
        });

        setFile(newSelectedFiles);
        // Clear the file input value to allow selecting the same file again
        fileInputRef.current.value = '';
    };





    if (loadingChat) return <MildSpiner size='xxl' />;
    return (
        <div className='mx-2'>

            <br />
            <div className='grid3'>
                <div className='text-teal' onClick={() => window.history.back()}><ArrowBackIos fontSize='small' /></div>
                <div className='ls small straight text-teal'>{receiverUserName}</div>
                <div
                    className='straight text-teal'
                    style={{ justifyContent: 'flex-end' }}
                    onClick={() => onOpen()}
                >
                    <AccountBalanceWalletOutlined />
                </div>
            </div>
            <br />
            <div
                className='chat-container'
                ref={chatContainerRef}
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
                {showChatRoom ? (
                    <RoomExist
                        message={message}
                        setMessage={setMessage}
                        chatHistory={chatHistory}
                    />
                ) : (
                    <NewRoom
                        message={message}
                        setMessage={setMessage}
                        chatHistory={chatHistory}
                    />
                )}

                <SelectedFile
                    selectedImages={selectedImages}
                    setFile={setFile}
                    setSelectedImages={setSelectedImages}
                />





                {isVideoModalOpen && (
                    <div className="video-modal-overlay">
                        <div className="video-modal-content" style={{ opacity: '0.7' }}>
                            {selectedVideoSrc.map((videoSrc, index) => (
                                <video key={index} controls width="100%" height="auto" src={videoSrc} />
                            ))}
                            <button
                                onClick={() => { setVideoModalOpen(false); setSelectedVideoSrc([]) }}
                                className='small btn text-teal'
                            >
                                <small> Close Video <Cancel fontSize='inherit' /></small>
                            </button>
                        </div>
                        <br />
                    </div>
                )}
            </div>

            <div className="flex input-area bg-white box-shadow">
                <button onClick={handleButtonClick} className='txt-teal mx-1'>
                    <CameraAltOutlined />
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                    multiple
                />
                <textarea
                    rows="1"
                    className="form-control add-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='type message...'
                />
                <button
                    className="btn teal add-btn"
                    onClick={sendMessage}
                    disabled={loading}
                >
                    {loading ? <div className='px-1'><MildSpiner size='sm' /></div> : <Send />}
                </button>
            </div>

            <SendMoneyModal isOpen={isOpen} onClose={onClose} userDetails={userDetails} senderID={senderID} recieverID={receiverID} roomData={chatHistory} senderId={senderID} />

        </div>
    );
}

export default ChatRoom;
