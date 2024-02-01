import React from 'react';
import { useFetchRecentChats } from '../hook/useChat';
import LoadingChat from '../components/partials/loadingChat';
import Nav from '../components/partials/nav';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '@chakra-ui/react';
import { EmailOutlined, NotificationAddOutlined, PictureInPictureAlt } from '@mui/icons-material';
import { Moments } from '../Assets/icons';

function Inbox(props) {
    const { id } = useParams();
    const { loading, error, recentChats } = useFetchRecentChats(id)
    const nav = useNavigate()

    if (loading) return <LoadingChat />

    return (
        <div >
            <Nav />
            <center><div className='ls text-success'>INBOX</div></center>
            <div className="straight my-3">
                <Link to={`/messages/${id}`}>
                    <div
                        style={{ width: '300px ', fontSize:'14px' }}
                        className='border border-success text-success straight flex-column py-4 rounded'
                    >
                        <div className='ls'>
                            CHATS
                        </div>
                        <EmailOutlined />
                    </div>

                </Link>
            </div>
            <div className="straight my-3">
                <Link to={`/messages/${id}`}>
                    <div
                        style={{ width: '300px ', fontSize:'14px' }}
                        className='border border-success text-success straight flex-column py-4 rounded'
                    >
                        <div className='ls'>
                            NOTIFICATIONS
                        </div>
                        <NotificationAddOutlined />
                    </div>

                </Link>
            </div>
            <div className="straight my-3">
                <Link to={`/moments/${id}`}>
                    <div
                        style={{ width: '300px ', fontSize:'14px' }}
                        className='border border-success text-success straight flex-column py-4 rounded'
                    >
                        <div className='ls'>
                            MOMENTS
                        </div>
                        <Moments size='21' />
                    </div>

                </Link>
            </div>
            <div className="straight my-3">
                <Link to={`/channels/${id}`}>
                    <div
                        style={{ width: '300px ', fontSize:'14px' }}
                        className='border border-success text-success straight flex-column py-4 rounded'
                    >
                        <div className='ls'>
                            CHANNELS
                        </div>
                        <PictureInPictureAlt />
                    </div>

                </Link>
            </div>
        </div>
    );
}

export default Inbox;