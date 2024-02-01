import React from 'react';
import { useState } from 'react';
import { userContext } from '../../../contexts/userContext';
import { useContext } from 'react';
import { useEditDetails } from '../../../hook/useEditDetails';
import { Button, useFocusEffect } from '@chakra-ui/react';
import { Fade } from 'react-reveal';
import { ArrowCircleLeft } from '@mui/icons-material';
import { useEffect } from 'react';

function Name({ setCurrentView }) {
    const { editDetails, loading } = useEditDetails()
    const [userDetails, setuserDetails] = useContext(userContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    useEffect(() => {
        setFirstName(userDetails.firstName)
        setLastName(userDetails.lastName)
    }, [userDetails.firstName, userDetails.lastName])

    async function handleSubmit() {
        if (firstName.trim().length > 10) {
            swal('You first name cannot exceeed 10 characters!')
            return
        }
        if (lastName.trim().length > 10) {
            swal('You last name cannot exceeed 10 characters!')
            return
        }
        await editDetails(userDetails.userName, firstName, lastName, setCurrentView)
    }
    return (
        <div>
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
                            Name
                        </div>
                    </div>
                    <br />
                    <b className='text-black small'>First name:</b>
                    <input
                        type="text"
                        className='form-control'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <br />
                    <b className='text-black small'>Last name:</b>
                    <input
                        type="text"
                        className='form-control'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <br />
                    <Button
                        isLoading={loading}
                        colorScheme='teal'
                        isDisabled={userDetails.firstName === firstName && userDetails.lastName === lastName}
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </Fade>
                <br />


            </div>
        </div>
    );
}

export default Name;