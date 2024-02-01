import { ArrowCircleLeft, Edit } from '@mui/icons-material';
import React from 'react';
import { useState } from 'react';
import { Fade } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../contexts/userContext';
import { useContext } from 'react';
import { Avatar, Button, useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import Axios from 'axios';

function Dp({ setCurrentView, onClose }) {
    const [profilePicture, setProfilePicture] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userDetails, setuserDetails] = useContext(userContext)
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setProfilePicture(file)
        setImageUrl(file)
        const reader = new FileReader();

        reader.onload = async () => {
            setLoading(true)
            await setImageUrl(reader.result);
            setLoading(false)

        };

        reader.readAsDataURL(file);
    };


    const uploadProfilePicture = async () => {
        try {
            setLoading(true)
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
            setLoading(false)
            setCurrentView('')
            onClose()
            // v1703114549
            toast({
                title: 'Display picture updated',
                position: 'top',
                variant: 'subtle',
                status: 'success',
                duration: 1500,
                isClosable: true
            })

        } catch (error) {
            console.log(error);
            setLoading(false)

        }
    };


    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='bg-white rounded p-2'>
            <div>
                <Fade>
                    <div>

                        <div onClick={() => setCurrentView('')}
                            style={{ color: 'teal' }}
                            className='rounded-pill'
                        >
                            <ArrowCircleLeft />
                        </div>

                        <br />
                        <center>
                            <div className='position-relative'>
                                <Avatar size='lg' src={userDetails.dpUrl} />

                                <div className="edit-pic-btn">
                                    <div className='shadow2' onClick={() => handleButtonClick()}>
                                        <Edit fontSize='small' />
                                    </div>
                                </div>
                            </div>

                            {/* <input type="file" onChange={handleFileChange} /> */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <br />
                            <br />
                            <Button
                                colorScheme='teal'
                                onClick={uploadProfilePicture}
                                isDisabled={selectedFile === null}
                                isLoading={loading}
                            >
                                UPDATE
                            </Button>
                            <br />
                            <br />
                            {imageUrl && !loading && <img src={imageUrl} alt="Profile" style={{ height: '150px' }} />}
                            <br />
                            <br />
                        </center>
                    </div>
                </Fade>
            </div>

        </div>
    );
}

export default Dp;