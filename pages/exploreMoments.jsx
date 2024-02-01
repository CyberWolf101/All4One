import React, { useEffect, useState } from 'react';
import Nav from '../components/partials/nav';
import { Avatar } from '@chakra-ui/react';
import { Camera, PersonSearch } from '@mui/icons-material';
import { useGetAllMoments } from '../hook/useMoments';
import MildSpiner from '../components/partials/mildSpiner';
import { Link, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Fade } from 'react-reveal';
import MomentsViewPage from '../components/moments/MomentsViewPage';
import UserMoments from '../components/moments/userMoments';

function ExploreMoments(props) {
    const { loading, moments, error, getAllMoments } = useGetAllMoments();
    const { id } = useParams();
    const [viewMoments, setViewMoments] = useState(false)
    const [viewUserMoments, setViewUserMoments] = useState(false)
    const [userMoments, setUserMoments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentMoment, setCurrentMoment] = useState({});

    useEffect(() => {
        // Update userMoments when moments or id changes
        if (!loading && moments) {
            const userMomentsMap = new Map();
            let currentUserMomentsCount = 0;

            // Organize moments by userId and store the last moment
            moments.forEach((moment) => {
                if (moment.userId === id) {
                    currentUserMomentsCount++;
                    userMomentsMap.set(moment.userId, moment);
                }
            });

            // Sort moments to display the last moment first
            const sortedUserMoments = [...userMomentsMap.values()].sort(
                (a, b) => b.createdAt - a.createdAt
            );

            setUserMoments({ moments: sortedUserMoments, count: currentUserMomentsCount });
        }
    }, [loading, moments, id]);

    // Filter moments based on search query
    const filteredMoments = moments.filter(
        (moment) => moment.userId !== id && moment.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <MildSpiner size='xl' />;

    return (
        <div>
            {
                !viewMoments && !viewUserMoments &&

                <div>
                    <Nav />
                    <div className='mx-1 light py-2'>
                        <div className='px-2 mb-2'>
                            {/* Search input for filtering moments by userName */}
                            <input
                                type='text'
                                className='form-control tiny'
                                placeholder='Search..'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className='mt-3 tiny faint ls ms-2'>Moments</div>

                        {userMoments.count > 0 ? (
                            <div className='mt-3 bg-white mx-1 p-2 rounded flex_normal box-shadow'>
                                {/* Display the current user's last moment */}
                                <div className='flex' onClick={() => { setCurrentMoment(userMoments.moments[0]); setViewMoments(false); setViewUserMoments(true) }}>
                                    <Avatar src={userMoments.moments[0].mediaUrl} />

                                    <div className='tiny mx-2 text-success ls'>
                                        My Moments ({userMoments.count})
                                        <div>{userMoments.moments[0].createdAt && formatDistanceToNow(userMoments.moments[0].createdAt)} ago</div>
                                    </div>
                                </div>
                                <div>
                                    <Link to={`/create-moment/${id}`} className='btn btn-sm btn-outline-success '>
                                        <Camera fontSize='small' />
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className='mt-3 bg-white mx-1 p-2 rounded flex_normal box-shadow'>
                                {/* Display the current user's last moment */}
                                <div className='flex'>
                                    <Avatar />

                                    <div className='tiny mx-2 text-success ls'>
                                        My Momments ({userMoments.count})
                                        <div></div>
                                    </div>
                                </div>
                                <div>
                                    <Link to={`/create-moment/${id}`} className='btn btn-sm btn-outline-success '>
                                        <Camera fontSize='small' />
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div className='mt-3 tiny faint ls ms-2'>Others</div>

                        {/* Map through filtered moments */}
                        {filteredMoments.map((moment) => (
                            <div
                                key={moment._id}
                                className='mt-3 bg-white mx-1 p-2 rounded flex_normal box-shadow'
                            >
                                <Fade bottom>
                                    <div className='flex' onClick={() => { setCurrentMoment(moment); setViewMoments(true); setViewUserMoments(false) }}>
                                        <Avatar src={moment.mediaUrl} />

                                        <div className='tiny mx-2 text-success ls'>
                                            {moment.userName}
                                            <div>{moment.createdAt && formatDistanceToNow(moment.createdAt)} ago</div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link
                                            className='btn btn-sm btn-outline-success'
                                            to={`/user/profile/${moment.userId}`}
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
                viewMoments &&
                <MomentsViewPage moments={moments} currentMoment={currentMoment} setViewMoments={setViewMoments} setCurrentMoment={setCurrentMoment} id={id} />

            }
            {
                viewUserMoments &&
                <UserMoments moments={moments} currentMoment={currentMoment} setViewUserMoments={setViewUserMoments} setCurrentMoment={setCurrentMoment} id={id} />

            }

        </div>
    );
}

export default ExploreMoments;
