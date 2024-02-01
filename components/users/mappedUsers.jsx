import { Avatar, Button } from '@chakra-ui/react';
import { LockClockOutlined, PersonAdd, PersonAddOutlined, PersonRemove, PersonRemoveOutlined, PersonSearchOutlined, SearchOff, SearchOutlined, Timelapse } from '@mui/icons-material';
import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Fade from 'react-reveal';
import LoadingPage from '../partials/Loading';
import swal from 'sweetalert';
import LoadSearching from '../partials/loadSearching';
import MildSpiner from '../partials/mildSpiner';
import { useToggleUserFollow } from '../../hook/useFollow';
import { useContext } from 'react';
import { userContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MappedUsers({ users, recentSearch, setRecentSearch, setUsers, usersNoSearch }) {
    const [search, setSearch] = useState('')
    const [displayList, setDisplayList] = useState(false);
    // const [searchResults, setSearchResults] = useState()
    const [searching, setSearching] = useState(false)
    const { isFollowing, userToFollow, followerUser, error, toggleUserFollow, loadingFollowing } = useToggleUserFollow()
    const [userDetails, setuserDetails] = useContext(userContext)
    const nav = useNavigate()

  

    const filteredSearchedUsers = usersNoSearch.filter((user) => {
        const shopName = user.userName.toLowerCase();
        const email = user.email.toLowerCase();
        const firstName = user.firstName.toLowerCase();
        const lastName = user.lastName.toLowerCase();
        const searchUser = search.toLowerCase();

        // Check if the product name or any category matches the search query
        return shopName.includes(searchUser) || email.includes(searchUser) || firstName.includes(searchUser) || lastName.includes(searchUser)
    });

    const handleSearch = async (query) => {
        if(query.trim() !== ''){
            nav(`/searched-users/${query}`)
        }
    }

   
   
    const handleFollow = async (userId, followerId, userTofollow) => {
        try {
            console.log(userId, followerId)
            await toggleUserFollow(userId, followerId, userTofollow, setUsers); // Assuming you have the userId of the user you want to follow
            // Handle success or additional logic if needed
        } catch (error) {
            console.error('Error toggling user follow:', error);
            // Handle error if needed
        }
    };

    if (searching) return <MildSpiner size='xl' />
    
    return (
        <div>
            <div className="mb-4 flex">
                <input type="text"
                    placeholder='search users'
                    className='form-control add-input'
                    onFocus={() => setDisplayList(true)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className='add-btn btn btn-outline-success'
                    onClick={() => handleSearch(search)}
                >
                    <SearchOutlined />
                </button>
            </div>

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                {
                    displayList && (
                        <div className="search-suggestions">
                            <div className='py-2' onClick={() => setDisplayList(false)}>
                                <SearchOff />
                            </div>
                            <div>
                                {filteredSearchedUsers
                                    ?.slice(0, 4)
                                    ?.map((user, index) => (
                                        <Fade key={index}>
                                            <div
                                                onClick={() => { setSearch(user.userName); setDisplayList(false) }}
                                                className='my-2 bg-light straight '
                                            >
                                                <div className='flex' onClick={() => handleSearch(user.userName)}>
                                                    <div onClick={() => nav(`user-details/${user._id}`)}>
                                                        <Avatar size='xs' src={user.dpUrl} />
                                                    </div>
                                                    <div className='ms-1 ' >
                                                        <div className="mx-2 small fw-bold text-success">{user.userName}</div>
                                                        <div className="tiny faint">{user.firstName + " " + user.lastName}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fade>
                                    ))}
                            </div>
                            <div className="faint mt-3">
                                <b className='tiny'>Recent search</b>
                                {
                                    recentSearch?.slice(0, 4)?.map((recent, index) => (
                                        <div
                                            key={index}
                                            className='small my-2 bg-light'
                                            onClick={() => { handleSearch(recent); setDisplayList(false); setSearch(recent) }}>
                                            <Timelapse fontSize='small' /> {recent}
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    )}
            </div>

            <div>
                {
                    users?.map((user) => (
                        <div className={userDetails._id === user._id ? 'd-none':"shadow2 my-3 rounded px-2 py-3 flex_normal"} key={user._id} >
                            <div className='flex'>
                                <div onClick={() => nav(`/user/profile/${user._id}`)}>
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

export default MappedUsers;