import React, { useContext, useState } from 'react';
import { userContext } from '../../contexts/userContext';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import Axios from 'axios';
import swal from 'sweetalert';
import { duration } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Bio({ id, user }) {
    const [userDetails, setuserDetails] = useContext(userContext);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [currentBio, setCurrentBio] = useState('');
    const [loading, setLaoding] = useState(false)
    const maxBioLength = 80;
    const endPoint = 'http://localhost:4000/'
    const toast = useToast()

    useEffect(() => {
        setCurrentBio(userDetails.bio)
    }, [])
    const handleBioChange = (e) => {
        const newBio = e.target.value;

        // Perform character limit validation
        if (newBio.length <= maxBioLength) {
            setCurrentBio(newBio);
        }
    };

    const editBio = async () => {
        // const NewBio = currentBio
        try {
            setLaoding(true)
            const response = await Axios.put(`${endPoint}user/edit-bio/${userDetails._id}`, { bio: currentBio })
            if (response.status !== 200) {
                swal('An error occured')
                console.log(response)
                setLaoding(false)

            }
            if (response.status === 200) {
                toast({
                    title: 'Bio updated',
                    status: 'success',
                    duration: 1500,
                    position: 'top',
                    variant: 'subtle'
                })
                console.log(response)
                setuserDetails({ ...userDetails, bio: currentBio })
                localStorage.setItem('user', JSON.stringify({ ...userDetails, bio: currentBio }));
                setLaoding(false)
                onClose()

            }
        } catch (error) {
            console.log(error)
            swal('An error occured')
            setLaoding(false)
        }
    }

    return (
        <div>
            <div className='text-center px-1' style={{ fontSize: '11px', letterSpacing: '1px' }}>
                {userDetails.bio === '' && userDetails._id === id ? (
                    <div className='btn btn-sm btn-success' onClick={() => { onOpen(); setCurrentBio(userDetails?.bio) }}>
                        Edit bio 
                    </div>
                ) : (
                    user.bio
                )}

                {
                    userDetails._id === id && userDetails.bio !== '' && (
                        <div className='text-success'
                            style={{ fontSize: '15px' }}
                            onClick={() => onOpen()}>
                            <Edit fontSize='inherit' />
                        </div>
                    )
                }
            </div>

            {/* Edit bio modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent style={{ marginTop: '150px' }}>
                    <center className='modalHeader'>
                        <ModalHeader>
                            <h6>Edit bio</h6>
                        </ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className=''>
                        <center>
                            <div className="flex_normal mb-1">
                                <div></div>
                                <small className='tiny faint'>
                                    {currentBio?.length}/{maxBioLength}
                                </small>
                            </div>
                            <div className='faint small'>
                                <textarea
                                    type='text'
                                    value={currentBio}
                                    onChange={handleBioChange}
                                    className='form-control'
                                    placeholder='bio'
                                />
                            </div>
                            {currentBio?.length === maxBioLength && (
                                <small style={{ color: 'crimson', fontSize: '10px' }}>Maximum character limit reached ({maxBioLength} characters).</small>
                            )}
                            <br />
                            <Button
                                isLoading={loading}
                                isDisabled={currentBio?.length < 3}
                                colorScheme='green'
                                onClick={editBio}
                            >
                                Save
                            </Button>
                        </center>
                        <br />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Bio;
