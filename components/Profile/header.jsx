import React, { useContext, useEffect } from 'react';
import { userContext } from '../../contexts/userContext';
import { EmailOutlined, PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Avatar, useDisclosure } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfilePicture, useUserPosts } from '../../hook/usePosts';
import { useState } from 'react';
import Axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { useFetchUser } from '../../hook/useStats';
import { useToggleSingleUserFollow } from '../../hook/useFollow';
import MildSpiner from '../partials/mildSpiner';
import { Link } from 'react-router-dom';


function Header({ user, setUser }) {
    const [userDetails, setuserDetails] = useContext(userContext)
    const { id } = useParams()
    const nav = useNavigate()
    const [profilePicture, setProfilePicture] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [selectedFile, setSelectedFile] = useState(null);
    const { isFollowing, userToFollow, followerUser, error, toggleUserFollow, loadingFollowing } = useToggleSingleUserFollow()


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setProfilePicture(file)
    };

    async function handleFriend(userId, userTofollow) {
        if (userDetails._id === id) {
            nav(`/discover/${user._id}`)
        } else {
            await toggleUserFollow(userId, userDetails._id, userTofollow, setUser);
        }
    }

    // Function to handle the profile picture upload/update
    const uploadProfilePicture = async () => {
        try {

            const formdata = new FormData();

            formdata.append("profilePicture", profilePicture);

            const response = await Axios.post('http://localhost:4000/user/upload-profile-picture/' + userDetails._id, formdata);

            if (response.status !== 200) {
                throw new Error('Failed to upload profile picture:', response);
            }

            console.log(response);

            setImageUrl(response.data.imageUrl);
            console.log(response.data.imageUrl);
            setuserDetails({
                ...userDetails,
                dpUrl: response.data.imageUrl
            })
            localStorage.setItem('user', JSON.stringify({ ...userDetails, dpUrl: response.data.imageUrl }))

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>

            <div className='flex-column mt-3' >
                <div >
                    <Avatar size='xl' src={user.dpUrl} onClick={() => onOpen()} />
                </div>
                <div className='small mt-1'> @{user.userName}</div>
                <div className='faint tiny'>
                    {user.firstName}
                    {' '}
                    {user.lastName}
                </div>
            </div>
            <div className="straight mx-2 mt-1">
                {
                    // it is the owner of the profile
                    id === userDetails._id ?
                        <button className='btn btn-sm btn-outline-success mx-1' style={{ width: '50px', height: '33px' }}>
                            <div className=" straight" onClick={() => handleFriend(user._id, user)}>
                                <div style={{ fontSize: '16px' }}><PersonAddOutlined fontSize='inherit' /></div>
                            </div>
                        </button> : (
                            <div>
                                {
                                    // it not is the owner of the profile
                                    user?.followers?.some((follower) => follower.userId === userDetails._id) ?
                                        (

                                            <button
                                                className='btn btn-outline-danger btn-sm no-hover no-hover mx-1'
                                                disabled={loadingFollowing}
                                                onClick={() => handleFriend(user._id, user)}
                                                style={{ width: '50px', height: '33px' }}
                                            >
                                                <div style={{ fontSize: '16px' }}>
                                                    {loadingFollowing ? <MildSpiner size='sm' /> : <PersonRemoveOutlined fontSize='inherit' />}
                                                </div>
                                            </button>
                                        ) : (
                                            <button className='btn btn-sm btn-outline-success mx-1 no-hover'
                                                style={{ width: '50px', height: '33px' }}>
                                                <div className=" straight"
                                                    onClick={() => handleFriend(user._id, user)}
                                                >
                                                    <div style={{ fontSize: '16px' }}>
                                                        {loadingFollowing ? <MildSpiner size='sm' /> : <PersonAddOutlined fontSize='inherit' />}
                                                    </div>
                                                </div>
                                            </button>
                                        )

                                }
                            </div>
                        )

                }



                <Link 
                to={`/user/chat-room/${userDetails._id}/${user._id}/${user.userName}`}
                className='btn btn-sm btn-outline-success mx-1' style={{ width: '50px', height: '33px' }}>
                    <div style={{ fontSize: '16px' }}><EmailOutlined fontSize='inherit' /></div>
                </Link>
            </div>


            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '30px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>{userDetails.userName}</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>
                            <img src={userDetails.dpUrl} alt="..." />
                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default Header;