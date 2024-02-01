import React, { useState } from 'react';
import { Fade } from 'react-reveal';
import { Checkbox, Spinner, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { UseSignup } from '../../hooks/useSignup';
import { setRef } from '@material-ui/core';
import { auth } from '../../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';


function Signup(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [sex, setSex] = useState('')
    // const [age, setAge] = useState('')
    const [bio, setBio] = useState("")
    const [dpUrl, setDpUrl] = useState("")
    const [password2, setPassword2] = useState("")
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const { signup, isLoading } = UseSignup()
    const nav = useNavigate()
    const toast = useToast()

    const handleSignup = async (password, email, sex, firstName, userName, lastName) => {
        if (email.trim().length < 8) {
            toast({
                title: "Please enter a valid email address!",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 3000,
                variant: 'subtle',

            });
            return;
        }

        if (firstName.trim().length < 2) {
            toast({
                title: "Error",
                description: "you must provide your first name",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;
        }
        if (lastName.trim().length < 2) {
            toast({
                title: "Error",
                description: "you must provide your our last name",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;
        }
        if (userName.trim().length < 2) {
            toast({
                title: "Error",
                description: "you must provide your a username",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;
        }
        if (!sex) {
            toast({
                title: "Select your gender",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;
        }
        if (password.trim().length < 6) {
            toast({
                title: "Invalid password",
                description: "password must contain atleast 6 characters",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'

            });
            return;

        }

        if (password !== password2) {
            toast({
                title: "Passwords do not match!",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 4000,
                variant: 'subtle'
            });
            return;
        }

        const success = await signup(password, email, sex, firstName, userName, lastName);
    }

    return (
        <div className=''>
            <Fade>
                <div className=' '>
                    <input type="email" className=' mt-3 form-control ' placeholder='email' required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="text" className=' mt-3 form-control ' placeholder='first name' required value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    <input type="text" className=' mt-3 form-control ' placeholder='last name' required value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                    <input type="text" className=' mt-3 form-control ' placeholder='user name' required value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                    {/* <input type="text" className=' mt-3 form-control ' placeholder='surname' required value={sex} onChange={(e) => { setSex(e.target.value) }} /> */}
                    <select
                        className='form-select mt-3'
                        value={sex}
                        onChange={(e) => { setSex(e.target.value) }}
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="password" className=' mt-3 form-control ' placeholder='password' required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="password" className=' mt-3 form-control ' placeholder='retype password' required value={password2} onChange={(e) => { setPassword2(e.target.value) }} />


                    {!isLoading && (
                        <button className="button btn btn-custom mt-3" onClick={() => handleSignup(password, email, sex, firstName, userName, lastName)}>
                            SIGN UP
                        </button>
                    )}
                    {isLoading && (
                        <div className="button mt-3" >
                            <Spinner
                                thickness='3px'
                                color='green.500'
                                emptyColor='gray.200'
                            />
                        </div>
                    )}

                </div>

            </Fade>
        </div>
    );
}

export default Signup;