import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUserMessages } from '../hooks/useSendMessage';
import { Avatar } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import LoadingChat from '../components/partials/loadingChat';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import Nav from '../components/partials/nav';

function Messages() {
    const { id } = useParams();
    const { loading, userMessages } = useUserMessages(id);
    const nav = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
        scroll.scrollToTop();

    }, [loading])
    const markMessageAsRead = async (messageId) => {
        // Fetch the message from the database
        console.log('retun')
        // const messageRef = doc(db, 'classifed_chats', messageId);
        // const messageDoc = await getDoc(messageRef);

        // if (messageDoc.exists()) {
        //     const messageData = messageDoc.data();
        //     messageData.read = true;
        //     await updateDoc(messageRef, messageData);
        // }
    };

    if (loading) {
        return <div><LoadingChat /></div>;
    }

    return (
        <div>
            <Nav />
            <div className='mx-2'>

                <center><h5>INBOX</h5></center>
                {userMessages
                    .sort((a, b) => {
                        // Sort by the timestamp of the most recent message in each conversation
                        const timeA = a.messages.length > 0 ? a.messages[a.messages.length - 1].timestamp : 0;
                        const timeB = b.messages.length > 0 ? b.messages[b.messages.length - 1].timestamp : 0;
                        return timeB - timeA;
                    })
                    .map((message) => (
                        <div key={message.id} className='shadow2 rounded p-2 mt-4'
                            onClick={() => {markMessageAsRead(message.roomID); nav(`/user/chat-room/${message.senderID}/${message.recieverID}`)} }
                        >
                            <div  className='flex'>
                                <Avatar size="sm" />
                                &nbsp;<small>{message.senderID === id ? message.recieverName : message.senderName}</small>
                            </div>

                            {message.messages.length > 0 && (
                                <div className='mt-3 bg-success text-white p-2 rounded' >
                                    <Link to={`/user/chat-room/${message.senderID}/${message.recieverID}`} >
                                        <span>{message.messages[message.messages.length - 1].text.length > 25
                                            ? `${message.messages[message.messages.length - 1].text.slice(0, 25)}...`
                                            : message.messages[message.messages.length - 1].text
                                        }</span>
                                        <div className="tiny text-white">
                                            {formatDistanceToNow(new Date(message.messages[message.messages.length - 1].timestamp), { addSuffix: true })}
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                {userMessages?.length < 1 && (<center className='faint small mt-5'>No recent conversations</center>)}
            </div>
        </div>
    );
}

export default Messages;
