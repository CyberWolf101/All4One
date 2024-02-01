import React, { useEffect, useState } from 'react';
import Nav from '../components/partials/nav';
import { Avatar } from '@chakra-ui/react';
import { Camera, PersonSearch } from '@mui/icons-material';
import MildSpiner from '../components/partials/mildSpiner';
import { Link, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Fade } from 'react-reveal';
import { useGetAllChannels } from '../hook/useChannels';
import UserChannels from '../components/channels/userChannels';
import ChannelsViewPage from '../components/channels/channelsViewPage';

function ExploreChannels(props) {
    const { loading, channels, error, getAllChannels, } = useGetAllChannels();
    const { id } = useParams();
    const [viewChannels, setViewChannels] = useState(false)
    const [viewUserChannels, setViewUserChannels] = useState(false)
    const [userChannels, setUserChannels] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentChannel, setCurrentChannel] = useState({});

    useEffect(() => {
        if (!loading && channels) {
            const userChannelsMap = new Map();
            let currentUserChannelsCount = 0;

            channels.forEach((channel) => {
                if (channel.userId === id) {
                    currentUserChannelsCount++;
                    userChannelsMap.set(channel.userId, channel);
                }
            });

            const sortedUserChannels = [...userChannelsMap.values()].sort(
                (a, b) => b.createdAt - a.createdAt
            );

            setUserChannels({ channels: sortedUserChannels, count: currentUserChannelsCount });
        }
    }, [loading, channels, id]);

    // Filter channels based on search query
    const filteredchannels = channels.filter(
        (channel) => channel.userId !== id && channel.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <MildSpiner size='xl' />;

    return (
        <div>
            {
                !viewChannels && !viewUserChannels &&

                <div>
                    <Nav />
                    <div className='mx-1 light py-2'>
                        <div className='px-2 mb-2'>
                            {/* Search input for filtering channels by userName */}
                            <input
                                type='text'
                                className='form-control tiny'
                                placeholder='Search..'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className='mt-3 tiny faint ls ms-2'>channels</div>

                        {userChannels.count > 0 ? (
                            <div className='mt-3 bg-white mx-1 p-2 rounded flex_normal box-shadow'>
                                <div className='flex' onClick={() => { setCurrentChannel(userChannels.channels[0]); setViewChannels(false); setViewUserChannels(true) }}>
                                    <Avatar src={userChannels.channels[0].mediaUrl} />

                                    <div className='tiny mx-2 text-success ls'>
                                        My channels ({userChannels.count})
                                        <div>{userChannels.channels[0].createdAt && formatDistanceToNow(userChannels.channels[0].createdAt)} ago</div>
                                    </div>
                                </div>
                                <div>
                                    <Link to={`/create-channel/${id}`} className='btn btn-sm btn-outline-success '>
                                        <Camera fontSize='small' />
                                    </Link>
                                </div>
                            </div>
                        ) :
                            (<div className='mt-3 bg-white mx-1 p-2 rounded flex_normal box-shadow'>
                                <div className='flex'>
                                    <Avatar />

                                    <div className='tiny mx-2 text-success ls'>
                                        My channels ({userChannels.count})
                                        <div></div>
                                    </div>
                                </div>
                                <div>
                                    <Link to={`/create-channel/${id}`} className='btn btn-sm btn-outline-success '>
                                        <Camera fontSize='small' />
                                    </Link>
                                </div>
                            </div>)

                        }

                        <div className='mt-3 tiny faint ls ms-2'>Others</div>

                        {/* Map through filtered channels */}
                        {filteredchannels.map((channel) => (
                            <div
                                key={channel._id}
                                className='mt-3 bg-white mx-1 p-2 rounded flex_normal box-shadow'
                            >
                                <Fade bottom>
                                    <div className='flex' onClick={() => { setCurrentChannel(channel); setViewChannels(true); setViewUserChannels(false) }}>
                                        <Avatar src={channel.mediaUrl} />

                                        <div className='tiny mx-2 text-success ls'>
                                            {channel.userName}
                                            <div>{channel.createdAt && formatDistanceToNow(channel.createdAt)} ago</div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link
                                            className='btn btn-sm btn-outline-success'
                                            to={`/user/profile/${channel.userId}`}
                                        >
                                            <PersonSearch fontSize='small' />
                                        </Link>
                                    </div>
                                </Fade>
                            </div>
                        ))}
                    </div>
                </div>
            }

            {
                viewChannels &&
                <ChannelsViewPage channels={channels} currentChannel={currentChannel} setViewChannels={setViewChannels} setCurrentChannel={setCurrentChannel} id={id} />

            }
            {
                viewUserChannels &&
                <UserChannels channels={channels} currentChannel={currentChannel} setViewUserChannels={setViewUserChannels} setCurrentChannel={setCurrentChannel} id={id} />

            }

        </div>
    );
}

export default ExploreChannels
