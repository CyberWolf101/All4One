import React from 'react';
import { userContext } from '../../contexts/userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MildSpiner from '../partials/mildSpiner';
import { PersonAddOutlined, PersonRemoveOutlined, PersonSearchOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';
import { useToggleUserFollow, useUnfollowUser } from '../../hook/useFollow';
import { useState } from 'react';
import { useEffect } from 'react';

function FollowedUsers({ followingUsers, loading }) {
    const [userDetails, setuserDetails] = useContext(userContext)
    const nav = useNavigate()
    const [syncFollowed, setSyncFollowed] = useState([])
    const { isFollowing, userToFollow, followerUser, error, unfollowUser, loadingFollowing } = useUnfollowUser()


    useEffect(() => {
        if (followingUsers) {
            setSyncFollowed(followingUsers)
            console.log('reset')
        }
    }, [loading])

    const handleFollow = async (userId, followerId, userTofollow) => {
        try {
            console.log(userId, followerId)
            await unfollowUser(userId, followerId, userTofollow, setSyncFollowed); // Assuming you have the userId of the user you want to follow
            // Handle success or additional logic if needed
        } catch (error) {
            console.error('Error toggling user follow:', error);
            // Handle error if needed
        }
    };

    if (loading) return <MildSpiner size='xl' />

    return (
        <div>
            <div>
                {
                    syncFollowed?.map((user) => (
                        <div className={userDetails._id === user._id ? 'd-none' : "shadow2 my-3 rounded px-2 py-3 flex_normal"} key={user._id} >
                            <div className='flex'>
                                <div onClick={
                                    // () => nav(`/user/profile/${user._id}`)
                                    () => console.log('syncFollowed', syncFollowed)
                                }>
                                    <Avatar size='md' src={user.dpUrl} />
                                </div>
                                <div className='ms-2'>
                                    <div className='small'>{user.userName}</div>
                                    <div className='faint tiny'>{user.firstName + " " + user.lastName}</div>
                                </div>
                            </div>
                            <div className='me-1'>

                                {
                                    user.followers.some((follower) => follower.userId === userDetails._id) ?

                                        <button
                                            className='btn btn-outline-danger btn-sm no-hover'
                                            onClick={() => handleFollow(user._id, userDetails._id, user)}
                                            disabled={loadingFollowing}
                                        >
                                            {loadingFollowing ? <MildSpiner size='sm' /> : <PersonRemoveOutlined fontSize='small' />}
                                        </button> :

                                        <button
                                            className='btn btn-outline-success btn-sm no-hover '
                                            onClick={() => handleFollow(user._id, userDetails._id, user)}
                                            disabled={loadingFollowing}
                                        >

                                            {loadingFollowing ? <MildSpiner size='sm' /> : <PersonAddOutlined fontSize='small' />}
                                        </button>

                                }


                                <Link to={`/user/profile/${user._id}`}
                                    className='btn btn-success mx-1 btn-sm'
                                    disabled={loadingFollowing}
                                >
                                    {loadingFollowing ? <MildSpiner size='sm' /> : <PersonSearchOutlined fontSize='small' />}
                                </Link >




                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default FollowedUsers;