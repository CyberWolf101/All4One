import React, { useContext } from 'react';
import { userContext } from '../../contexts/userContext';
import { Fade } from 'react-reveal';
import { useParams } from 'react-router-dom';
import { Send } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

function RoomExist({ message, setMessage, chatHistory }) {
    const [userDetails] = useContext(userContext)
    const { senderID } = useParams();

    return (
        <div>
            {chatHistory.messages &&
                chatHistory?.messages?.map((msg, index) => (
                    <div key={index}>
                        {msg.text || msg.mediaUrls ? (
                            <Fade bottom>
                                <div className={`message shadow2 my-4 ${userDetails._id === msg.senderId ? 'owner' : 'receiver'}`}>
                                    <p>{msg.text}</p>
                                    <div className="">
                                        {msg?.mediaUrls?.length > 0 && (
                                            <div className='flex straight rounded mb-2' style={{ height: 'auto', width: 'auto', overflow: 'hidden', flexDirection: 'column' }}>
                                                {msg.mediaUrls.map((media, mediaIndex) => (
                                                    <React.Fragment key={mediaIndex}>
                                                        {media.endsWith('.jpg') || media.endsWith('.jpeg') || media.endsWith('.png') ? (
                                                            <img src={media} alt="" style={{ height: 'auto', borderRadius: '8px', margin: '10px 0px' }} />
                                                        ) : media.endsWith('.mp4') ? (
                                                            <div style={{ height: 'auto',  margin: '10px 0px' }}>
                                                                <video controls width="100%" height="auto">
                                                                    <source src={media} type="video/mp4" />
                                                                    unsupported file format
                                                                </video>
                                                            </div>
                                                        ) : (
                                                            <span>Unsupported file type</span>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                    <p className='tiny'>{msg.timestamp && formatDistanceToNow(new Date(msg.timestamp))} ago</p>
                                </div>
                            </Fade>
                        ) : (
                            <span></span>
                        )}
                    </div>
                ))}
        </div>
    );
}

export default RoomExist;
