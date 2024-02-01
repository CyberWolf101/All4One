import React from 'react';
import { useEditDetails } from '../../../hook/useEditDetails';
import { userContext } from '../../../contexts/userContext';
import { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ArrowCircleLeft } from '@mui/icons-material';
import swal from 'sweetalert';
import { Fade } from 'react-reveal';

function UserName({ setCurrentView }) {
    const { editDetails, loading } = useEditDetails()
    const [userDetails, setuserDetails] = useContext(userContext)
    const [userName, setUserName] = useState('')

    useEffect(() => {
        setUserName(userDetails.userName)
    }, [userDetails.userName])

    async function handleSubmit() {
        if (userName.trim().length > 18) {
            swal('You username cannot exceeed 18 characters!')
            return
        }
        await editDetails(userName, userDetails.firstName, userDetails.lastName, setCurrentView)
    }

    return (
        <div className='bg-white rounded p-2'>
            <Fade>
                <div className="grid3">
                    <div onClick={() => setCurrentView('')}
                        style={{ color: 'teal' }}
                        className='rounded-pill py-2'
                    >
                        <ArrowCircleLeft />
                    </div>

                    <div className='tiny text-teal straight text-uppercase'>
                        username
                    </div>
                </div>

                <input
                    type="text"
                    className='form-control'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <br />
                <Button
                    isLoading={loading}
                    colorScheme='teal'
                    isDisabled={userDetails.userName === userName}
                    onClick={handleSubmit}
                >
                    Update
                </Button>
            </Fade>


        </div>
    );
}

export default UserName;