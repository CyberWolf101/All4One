import React, { useContext, useEffect, useState } from 'react';
import { useFetchRecentChats } from '../hook/useChat';
import LoadingChat from '../components/partials/loadingChat';
import Nav from '../components/partials/nav';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '@chakra-ui/react';
import { userContext } from '../contexts/userContext';
import { io } from 'socket.io-client';
import { Image, MovieCreation } from '@mui/icons-material';

function InboxMessages(props) {
    const { id } = useParams();
    const { loading, error, recentChats } = useFetchRecentChats(id)
    const nav = useNavigate()


    if (loading) return <LoadingChat />

    return (
        <div>
            <Nav />
            <div className='mx-2'>

                <center><div className='ls text-success'>CHATS</div></center>
                {recentChats
                    .sort((a, b) => {
                        const timeA = a.messages.length > 0 ? a.messages[a.messages.length - 1].timestamp : 0;
                        const timeB = b.messages.length > 0 ? b.messages[b.messages.length - 1].timestamp : 0;
                        return timeB - timeA;
                    })
                    .map((message) => (
                        <div key={message._id} className='shadow2 rounded p-2 mt-4'
                            onClick={() => { nav(`/user/chat-room/${id}/${id === message.users.receiverId ? message.users.senderId : message.users.receiverId}/${message.users.receiverName}`) }}
                        >
                            <div className='flex'>
                                <Avatar size="sm" />
                                &nbsp;<small>{message.users.senderId === id ? message.users.receiverName : message.users.senderName}</small>
                            </div>
                            {message.messages.length > 0 && (
                                <div className='mt-3 bg-success text-white p-2 rounded' >
                                    <Link to={`/user/chat-room/${id}/${id === message.users.receiverId ? message.users.senderId : message.users.receiverId}/${message.users.receiverName}`} >
                                        {message.messages[message.messages.length - 1].text ? (
                                            <span>{message.messages[message.messages.length - 1].text.length > 25
                                                ? `${message.messages[message.messages.length - 1].text.slice(0, 25)}...`
                                                : message.messages[message.messages.length - 1].text
                                            }</span>
                                        ) : (
                                            <div className='flex straight rounded mb-2' style={{ height: 'auto', width: 'auto', overflow: 'hidden', flexDirection: 'column', fontSize: '13px' }}>
                                                {message.messages[message.messages.length - 1].mediaUrls?.map((media, mediaIndex) => (
                                                    <React.Fragment key={mediaIndex}>
                                                        {media.endsWith('.jpg') || media.endsWith('.jpeg') || media.endsWith('.png') ? (
                                                            <div>
                                                                <Image fontSize='small'/> Photo
                                                            </div>
                                                        ) : media.endsWith('.mp4') ? (
                                                            <div>
                                                                <MovieCreation fontSize='small'/> Video
                                                            </div>
                                                        ) : (
                                                            <span >Unsupported file type</span>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        )}
                                        <div className="tiny text-white">
                                            {formatDistanceToNow(new Date(message.messages[message.messages.length - 1].timestamp), { addSuffix: true })}
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                {recentChats?.length < 1 && (<center className='faint small mt-5'>No recent conversations</center>)}

            </div>
        </div>
    );
}

export default InboxMessages;